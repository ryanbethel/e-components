// Mixin specifically for reusing SFCs as Custom Elements in the browser
const CustomElementMixin = (superclass) => class extends superclass {
  constructor() {
    super()
    this.expandSlots = this.expandSlots.bind(this)
    this.removeStyleTags = this.removeStyleTags.bind(this)
    this.removeScriptTags = this.removeScriptTags.bind(this)
    this.expandTemplate = this.expandTemplate.bind(this)
    this.scrubTemplate = this.scrubTemplate.bind(this)
    // Has this element been server side rendered
    this.enhanced = this.hasAttribute('enhanced')
    // Expands the Custom Element with the template content
    this.hasSlots = Boolean(this.template.content.querySelectorAll('slot')?.length)
    this.scrubTemplate(this.template.content)
    this.expandTemplate()
  }

  scrubTemplate(el) {
    this.removeStyleTags(el)
    this.removeScriptTags(el)
    return el
  }

  expandTemplate() {
    // If the Custom Element was already expanded by SSR it will have the "enhanced" attribute so do not replaceChildren
    if (!this.enhanced && !this.hasSlots) {
      this.replaceChildren(this.scrubTemplate(this.template.content.cloneNode(true)))
    // If this Custom Element was added dynamically with JavaScript then use the template contents to expand the element
    } else if (!this.enhanced && this.hasSlots) {
      this.innerHTML = this.expandSlots(this.innerHTML, this.template.innerHTML)
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

}
export default CustomElementMixin
