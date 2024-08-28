// Mixin specifically for reusing SFCs as Custom Elements in the browser
const CsrCustomElementMixin = (superclass) => class extends superclass {
  constructor(args) {
    super(args)
    this.expandSlots = this.expandSlots.bind(this)
    this.removeStyleTags = this.removeStyleTags.bind(this)
    this.removeScriptTags = this.removeScriptTags.bind(this)
    this.expandTemplate = this.expandTemplate.bind(this)
    this.scrubTemplate = this.scrubTemplate.bind(this)
    // Has this element been server side rendered
    this.enhanced = this.hasAttribute('enhanced')
    // Expands the Custom Element with the template content
    this.hasSlots = Boolean(this.template.content.querySelectorAll('slot')?.length)
    this.hasNamedSlots = Boolean(this.template.content.querySelectorAll('slot[name]:not([name=""])'))
    this.hasUnnamedSlot = Boolean(this.template.content.querySelectorAll('slot:not([name]), slot[name=""]'))
    this.scrubTemplate(this.template.content)
    this.checkSlotOnly = this.checkSlotOnly.bind(this)
    this.isSlotOnly = this.checkSlotOnly(this.template)

    this.instanceID = this.getAttribute('instance-id')

    if (!this.instanceID) { this.instanceID = this.generateID(7) }

    this.expandTemplate()
    if (!this.enhanced) { this.isClientEnhanced = true }

    //rerender for state change
    // this.rerender = this.rerender.bind(this)

    //Make an array of slotted ranges
    this.findSlottedRanges = this.findSlottedRanges.bind(this)
    if (this.enhanced) { this.slottedRanges = this.findSlottedRanges(this) }
  }

  checkSlotOnly(templateElement) {
    const templateContent = templateElement.content
    const childNodes = Array.from(templateContent.childNodes);

    const textNodes = childNodes.filter(node => node.nodeType === Node.TEXT_NODE);

    const elementNodes = childNodes.filter(node => node.nodeType === Node.ELEMENT_NODE);

    const hasOnlyAnUnnamedSlot = elementNodes.length === 1 && elementNodes[0].tagName === 'SLOT' && !elementNodes[0].hasAttribute('name');

    const isWhitespaceOnly = (node) => node.nodeType === Node.TEXT_NODE && !/\S/.test(node.textContent);

    const onlyWhitespaceAround = textNodes.every(isWhitespaceOnly);
    const onlyWhitespaceInside = Array.from(elementNodes[0].childNodes).every(isWhitespaceOnly);

    return hasOnlyAnUnnamedSlot && onlyWhitespaceAround && onlyWhitespaceInside;
  }

  scrubTemplate(el) {
    this.removeStyleTags(el)
    this.removeScriptTags(el)
    return el
  }

  findSlottedRanges(node, instanceID = this.instanceID) {
    const slots = {};
    let currentSlotName = '';
    let collecting = false;

    const traverse = (node) => {
      if (node.nodeType === Node.COMMENT_NODE) {
        const comment = node.nodeValue.trim();
        const startMatch = comment.match(/^slot start name="(.*?)" id="(.*?)"$/);
        const endMatch = comment.match(/^slot end name="(.*?)" id="(.*?)"$/);

        if (startMatch && startMatch[2] === instanceID) {
          // Slot start found
          currentSlotName = startMatch[1]
          slots[currentSlotName] = {
            startComment: node,
            content: [],
          };
          collecting = true;
        } else if (endMatch && endMatch[2] === instanceID && collecting) {
          // Slot end found
          slots[currentSlotName].endComment = node;
          slots[currentSlotName].innerRange = new Range();
          slots[currentSlotName].innerRange.setStartAfter(slots[currentSlotName].startComment)
          slots[currentSlotName].innerRange.setEndBefore(slots[currentSlotName].endComment)
          slots[currentSlotName].outerRange = new Range();
          slots[currentSlotName].outerRange.setStartBefore(slots[currentSlotName].startComment)
          slots[currentSlotName].outerRange.setEndAfter(slots[currentSlotName].endComment)
          collecting = false;
          return; // Stop traversal after finding the end comment
        }
      } else if (collecting) {
        slots[currentSlotName].content.push(node);
      }

      if (!collecting) {
        node.childNodes.forEach(childNode => traverse(childNode));
      }
    };

    traverse(node);

    return slots;
  }



  expandTemplate() {
    this.renderedState = this.render({ html: this.html, state: this.state })
    const renderedStateTemplate = document.createElement('template')
    renderedStateTemplate.innerHTML = this.renderedState


    // If the Custom Element was already expanded by SSR it will have the "enhanced" attribute so do not replaceChildren
    if (!this.enhanced && !this.hasSlots) {
      // this.replaceChildren(this.scrubTemplate(this.template.content.cloneNode(true)))
      this.replaceChildren(this.scrubTemplate(renderedStateTemplate.content.cloneNode(true)))
      // If this Custom Element was added dynamically with JavaScript then use the template contents to expand the element
    } else if (!this.enhanced && this.hasSlots && !this.isSlotOnly) {
      // this.innerHTML = this.expandSlots(this.innerHTML, this.template.innerHTML)
      this.innerHTML = this.expandSlots(this.innerHTML, this.scrubTemplate(renderedStateTemplate.content.cloneNode(true)).innerHTML)
    }
  }

  removeScriptTags(el) {
    // Removes script tags as they are already appended to the body by SSR
    // TODO: If only added dynamically in the browser we need to insert the script tag after running the script transform on it. As well as handle deduplication.
    el.querySelectorAll('script')
      .forEach((tag) => { el.removeChild(tag) })
  }

  removeStyleTags(el) {
    // Handle style tags
    if (this.enhanced) {
      // Removes style tags as they are already inserted into the head by SSR
      el.querySelectorAll('style')
        .forEach((tag) => { el.removeChild(tag) })
    } else {
      let tagName = this.tagName
      el.querySelectorAll('style')
        .forEach((tag) => {
          let sheet = this.styleTransform({ tag, tagName, scope: tag.getAttribute('scope') })
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
          el.removeChild(tag)
        })
    }
  }

  toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
  }

  styleTransform({ tag, tagName, scope }) {
    const styles = this.parseCSS(tag.textContent)

    if (scope === 'global') {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(tag.textContent)
      return sheet
    }

    const rules = styles.cssRules
    const sheet = new CSSStyleSheet();
    for (let rule of rules) {
      if (rule.conditionText) {
        let selectorText = ''
        for (let innerRule of rule.cssRules) {
          let selectors = innerRule.selectorText.split(',')
          selectorText = selectors.map(selector => {
            return innerRule.cssText.replace(innerRule.selectorText, this.transform(selector, tagName))
          }).join(',')
        }
        let type = this.getRuleType(rule)
        sheet.insertRule(`${type} ${rule.conditionText} { ${selectorText}}`, sheet.cssRules.length)
      } else {
        let selectors = rule.selectorText.split(',')
        let selectorText = selectors.map(selector => {
          return this.transform(selector, tagName)
        }).join(',')
        sheet.insertRule(rule.cssText.replace(rule.selectorText, selectorText), sheet.cssRules.length)
      }
    }
    return sheet
  }

  getRuleType(rule) {
    switch (rule.constructor) {
      case CSSContainerRule:
        return '@container'
      case CSSMediaRule:
        return '@media'
      case CSSSupportsRule:
        return '@supports'
      default:
        return null
    }
  }

  transform(input, tagName) {
    let out = input
    out = out.replace(/(::slotted)\(\s*(.+)\s*\)/, '$2')
      .replace(/(:host-context)\(\s*(.+)\s*\)/, '$2 __TAGNAME__')
      .replace(/(:host)\(\s*(.+)\s*\)/, '__TAGNAME__$2')
      .replace(
        /([[a-zA-Z0-9_-]*)(::part)\(\s*(.+)\s*\)/,
        '$1 [part*="$3"][part*="$1"]')
      .replace(':host', '__TAGNAME__')
    out = /__TAGNAME__/.test(out) ? out.replace(/(.*)__TAGNAME__(.*)/, `$1${tagName}$2`) : `${tagName} ${out}`
    return out
  }

  parseCSS(styleContent) {
    const doc = document.implementation.createHTMLDocument("")
    const styleElement = document.createElement("style")

    styleElement.textContent = styleContent
    doc.body.appendChild(styleElement)

    return styleElement.sheet
  }


  expandSlots(str, templateStr) {
    const fragment = document.createElement('div')
    fragment.innerHTML = str
    const template = document.createElement('template')
    template.innerHTML = templateStr
    fragment.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true)
    )

    if (true /*markSlots*/) {
      const slots = template.querySelectorAll('slot')
      slots.forEach(slot => {
        const slotName = slot.getAttribute('name') || '';
        const startComment = document.createComment(`slot start name=${slotName} slot-id=${this.instanceID}`);
        const endComment = document.createComment(`slot end name=${slotName} slot-id=${this.instanceID}`);
        slot.parentNode.insertBefore(startComment, slot);
        if (slot.nextSibling) {
          slot.parentNode.insertBefore(endComment, slot.nextSibling);
        } else {
          slot.parentNode.appendChild(endComment);
        }
      });
    }

    const children = Array.from(fragment.childNodes)
    let unnamedSlot = {}
    let namedSlots = {}

    children.forEach(child => {
      const slot = child.assignedSlot
      if (slot) {
        if (slot.name) {
          if (!namedSlots[slot.name]) namedSlots[slot.name] = { slotNode: slot, contentToSlot: [] }
          namedSlots[slot.name].contentToSlot.push(child)
        }
        else {
          if (!unnamedSlot["slotNode"]) unnamedSlot = { slotNode: slot, contentToSlot: [] }
          if (child['setAttribute']) {
            child.setAttribute('slot', '')
            unnamedSlot.contentToSlot.push(child)
          }
          else {
            const wrapperSpan = document.createElement('span')
            wrapperSpan.setAttribute('slot', '')
            wrapperSpan.appendChild(child)
            unnamedSlot.contentToSlot.push(wrapperSpan)
          }
        }
      }
    })

    // Named Slots
    Object.entries(namedSlots).forEach(([name, slot]) => {
      slot.slotNode.after(...namedSlots[name].contentToSlot)
      slot.slotNode.remove()
    })

    // Unnamed Slot
    unnamedSlot.slotNode?.after(...unnamedSlot.contentToSlot)
    unnamedSlot.slotNode?.remove()

    // Unused slots and default content
    const unfilledUnnamedSlots = Array.from(fragment.shadowRoot.querySelectorAll('slot:not([name])'))
    unfilledUnnamedSlots.forEach(slot => slot.remove())
    const unfilledSlots = Array.from(fragment.shadowRoot.querySelectorAll('slot[name]'))
    unfilledSlots.forEach(slot => {
      const as = slot.getAttribute('as') || 'span'
      const asElement = document.createElement(as)
      while (slot.childNodes.length > 0) {
        asElement.appendChild(slot.childNodes[0]);
      }
      slot.after(asElement)
      slot.remove()
    })

    return fragment.shadowRoot.innerHTML
  }



  generateID(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const randomArray = new Uint8Array(length);
    crypto.getRandomValues(randomArray);
    randomArray.forEach((number) => {
      result += chars[number % chars.length];
    });
    return result;
  }

}
export default CsrCustomElementMixin
