import BaseElement from '../../client-mixins/base-element.mjs'
// import CustomElementMixin from '../../client-mixins/custom-element-mixin.mjs'
import CustomElementMixin from './csr-custom-element-mixin.mjs'
import TemplateMixin from '../../client-mixins/template-mixin.mjs'

export default class CustomElement extends CustomElementMixin(TemplateMixin(BaseElement)) { }
