// import IdiomorphMixin from 'enhance-idiomorph-mixin'
// import CustomElement from '@enhance/custom-element'

import BaseElement from '@enhance/base-element'
import TemplateMixin from '@enhance/template-mixin'
import CustomElementMixin from "@enhance/custom-element-mixin"
// import morphdom from "morphdom"
import compiledElements from "../compiledElements.mjs"

import AccordionElement from "../../../components/e/accordion.mjs";
import AlertElement from "../../../components/e/alert.mjs";
import AutoCompleteElement from "../../../components/e/autocomplete.mjs";
import BadgeElement from "../../../components/e/badge.mjs";
import BlockquoteElement from "../../../components/e/blockquote.mjs";
import BoxElement from "../../../components/e/box.mjs";
import BreadcrumbElement from "../../../components/e/breadcrumb.mjs";
import ButtonElement from "../../../components/e/button.mjs";
import CodeElement from "../../../components/e/code.mjs";
import ColElement from "../../../components/e/col.mjs";
import ContainerElement from "../../../components/e/container.mjs";
import DetailsElement from "../../../components/e/details.mjs";
import DialogElement from "../../../components/e/dialog.mjs";
import DotElement from "../../../components/e/dot.mjs";
import IconElement from "../../../components/e/icon.mjs";
import InputGroupElement from "../../../components/e/input-group.mjs";
import KbdElement from "../../../components/e/kbd.mjs";
import LinkElement from "../../../components/e/link.mjs";
import LoaderElement from "../../../components/e/loader.mjs";
import MenuElement from "../../../components/e/menu.mjs";
import RowElement from "../../../components/e/row.mjs";
import SeparatorElement from "../../../components/e/seperator.mjs";
import SwitchElement from "../../../components/e/switch.mjs";
import TableElement from "../../../components/e/table.mjs";
import TabsElement from "../../../components/e/tabs.mjs";
import TagElement from "../../../components/e/tag.mjs";

const MorphDomMixin = (superclass) => class extends superclass {
  constructor(args) {
    super(args)
    this.process = this.process.bind(this)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.process()
    }
  }

  process() {
    const tmp = this.render({
      html: this.html,
      state: this.state
    })
    const updated = document.createElement('div')
    updated.innerHTML = tmp.trim()
    console.log('updated', tmp.trim(), '\n')
    const root = this.shadowRoot
      ? this.shadowRoot
      : this

    console.log('root', root.innerHTML, '\n')
    morphdom(
      root,
      updated,
      {
        childrenOnly: true
      }
    )
  }
}

class CustomElement extends CustomElementMixin(TemplateMixin(BaseElement)) { }

function registerTag(tag, rend) {

  // class Tag extends MorphDomMixin(CustomElement) {
  class Tag extends CustomElement {

    render(args) {
      return rend(args)
    }
  }


  if (!customElements.get(tag)) { customElements.define(tag, Tag) }

}

function registerAll() {
  const tags = [
    { tag: "e-alert", render: eAlert },
    { tag: "e-code", render: eCode },
    { tag: "e-list", render: eList },
    { tag: "e-seperator", render: eSeperator },

    { tag: "e-button", render: compiledElements['e-button'] },
    { tag: "e-link", render: compiledElements['e-link'] },
    { tag: "e-switch", render: compiledElements['e-switch'] },
    { tag: "e-accordion", render: compiledElements['e-accordion'] },
    { tag: "e-autocomplete", render: compiledElements['e-autocomplete'] },
    { tag: "e-badge", render: compiledElements['e-badge'] },
    { tag: "e-blockquote", render: compiledElements['e-blockquote'] },
    { tag: "e-box", render: compiledElements['e-box'] },
    { tag: "e-breadcrumb", render: compiledElements['e-breadcrumb'] },
    { tag: "e-col", render: compiledElements['e-col'] },
    { tag: "e-container", render: compiledElements['e-container'] },
    { tag: "e-details", render: compiledElements['e-details'] },
    { tag: "e-dialog", render: compiledElements['e-dialog'] },
    { tag: "e-dot", render: compiledElements['e-dot'] },
    { tag: "e-icon", render: compiledElements['e-icon'] },
    { tag: "e-input-group", render: compiledElements['e-input-group'] },
    { tag: "e-keyboard", render: compiledElements['e-keyboard'] },
    { tag: "e-loader", render: compiledElements['e-loader'] },
    { tag: "e-menu", render: compiledElements['e-menu'] },
    { tag: "e-row", render: compiledElements['e-row'] },
    { tag: "e-table", render: compiledElements['e-table'] },
    { tag: "e-tabs", render: compiledElements['e-tabs'] },
    { tag: "e-tag", render: compiledElements['e-tag'] },

    // { tag: "e-button", render: eButton },
    // { tag: "e-link", render: eLink },
    // { tag: "e-switch", render: eSwitch },
    // { tag: "e-accordion", render: eAccordion },
    // { tag: "e-autocomplete", render: eAutocomplete },
    // { tag: "e-badge", render: eBadge },
    // { tag: "e-blockquote", render: eBlockquote },
    // { tag: "e-box", render: eBox },
    // { tag: "e-breadcrumb", render: eBreadcrumb },
    // { tag: "e-col", render: eCol },
    // { tag: "e-container", render: eContainer },
    // { tag: "e-details", render: eDetails },
    // { tag: "e-dialog", render: eDialog },
    // { tag: "e-dot", render: eDot },
    // { tag: "e-icon", render: eIcon },
    // { tag: "e-input-group", render: eInputGroup },
    // { tag: "e-keyboard", render: eKeyboard },
    // { tag: "e-loader", render: eLoader },
    // { tag: "e-menu", render: eMenu },
    // { tag: "e-row", render: eRow },
    // { tag: "e-table", render: eTable },
    // { tag: "e-tabs", render: eTabs },
    // { tag: "e-tag", render: eTag },
  ]

  tags.forEach(i => registerTag(i.tag, i.render))

}

// export { IdiomorphMixin, CustomElement, MorphDomMixin }
export { registerAll, CustomElement, MorphDomMixin }
