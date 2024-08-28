const RerenderMixin = (superclass) => class extends superclass {
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
    const newReneredState = this.render({
      html: this.html,
      state: this.state
    })
    const oldRenderedState = this.renderedState || ''
    if (newReneredState !== oldRenderedState) {
      const renderedStateTemplate = document.createElement('template')
      renderedStateTemplate.innerHTML = this.newRenderedState
      if (!this.hasSlots) {
        this.replaceChildren(this.scrubTemplate(renderedStateTemplate.content.cloneNode(true)))
      } else if (this.hasSlots && !this.isSlotOnly) {
        // First Put back the slotted content????
        this.innerHTML = this.expandSlots(this.innerHTML, this.scrubTemplate(renderedStateTemplate.content.cloneNode(true)).innerHTML)
      }
    }
  }
}
export default RerenderMixin
