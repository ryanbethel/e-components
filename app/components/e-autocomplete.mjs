import CustomElement from '@enhance/custom-element'
import AutoComplete from '../elements/e/autocomplete.mjs'

export default class AutoCompleteElement extends CustomElement {
  #initialized = false;
  #boundClose;
  #input;
  #matches;
  results = [];

  /**
   * Data source function for autocomplete.
   * @callback AutocompleteDataSource
   * @param {string} query - The current value of the autocomplete input, i.e. what the user is typing.
   * @param {number} max - The maximum number of results that will be shown.
   * @returns {Promise<{query: string, matches: []}>} - Passing back query allows autocomplete to determine if the matches are still relevant.
   */

  /**
   * Object with named autocomplete data source functions.
   * @type {Object.<string, AutocompleteDataSource>}
   */
  static sources = {};

  constructor() {
    super();
    this.#boundClose = this.close.bind(this)
  }

  connectedCallback() {
    if (!this.#initialized) {
      // this.#input = document.createElement('input');
      this.#input = this.querySelector('input');
      console.log(this.#input)
      this.#input.setAttribute('placeholder', this.getAttribute('placeholder') || '');
      this.#input.addEventListener('select', e => e.stopPropagation()); // Prevents text select event
      this.#input.addEventListener('keyup', e => this.search(e.currentTarget.value));

      this.#matches = document.createElement('div');
      this.#matches.classList.add('pos-absolute', 'bg-white', 'brd', 'brd-radius-sm');
      this.#matches.addEventListener('click', e => {
        const li = e.target.closest('li');
        this.select(e, li.dataset.value, li.dataset.id);
      });
      this.#matches.hidden = true;

      this.append(this.#input, this.#matches);
      this.#initialized = true;
    }

    // Closes matchesContainer when user clicks outside of it
    document.body.addEventListener('click', this.#boundClose);

    // Close matchesContainer on esc keyup
    document.addEventListener('keyup', this.#boundClose);
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this.#boundClose);
    document.removeEventListener('keyup', this.#boundClose);
  }

  close(e) {
    // Close with the Esc key
    if (e.type === 'keyup' && e.key === 'Escape') {
      this.clear();
    }
    // Close with off-target click
    else if (e.type === 'click' && !this.#matches.contains(e.currentTarget)) {
      this.clear(true);
    }
  }

  async search(query) {
    if (query) {
      const source = this.getAttribute('source');
      const max = Number(this.getAttribute('max'));
      let results = [];

      // Try function source...
      if (AutoComplete.sources[source]) {
        const result = await AutoComplete.sources[source](query, max);

        // Verify the original query matches current value since these are async calls
        if (result.query === this.#input.value) {
          results = result.matches.slice(0, max || result.matches.length);

          // Normalize string results as objects
          if (typeof results[0] === 'string') {
            results = results.map(value => ({ value }))
          }
        }
      }
      // Try <datalist> source...
      else if (document.getElementById(source)) {
        const lowerCaseQuery = query.toLowerCase();
        Array.from(document.getElementById(source).options).forEach(option => {
          // There must always be option.value and it's always set to id.
          // If there's option.textContent, textContent is value; otherwise option.value is id and value.
          const match = option.value?.toLowerCase().includes(lowerCaseQuery) || option.textContent?.toLowerCase().includes(lowerCaseQuery);
          if (match) {
            const id = option.value;
            const value = option.textContent || id;
            results.push({ value, id });
          }
        });
      }

      this.results = results;
      this.rerender(query);
    }
    else {
      this.clear();
    }
  }

  select(e, value, id) {
    e.stopPropagation();
    const source = this.getAttribute('source');
    this.#input.value = value;
    this.#input.focus();
    this.dispatchEvent(new CustomEvent('select', { detail: { source, value, id } }));
    this.clear();
  }

  clear(preventFocus) {
    this.results = [];
    this.rerender();
    if (!preventFocus) {
      this.#input.focus();
    }
  }

  rerender(hasQuery) {
    this.#matches.hidden = !hasQuery;
    this.#matches.innerHTML = this.results.length
      && `<ul type="none" >
    ${this.results.reduce((acc, result) => acc += `<li class="pad-sm pointer" data-id="${result.id}" data-value="\${result.value}">${result.value}</li>`, '')}
        </ul>`;
  }

  render({ html, state }) {
    return AutoComplete({ html, state })
  }
}

if (!customElements.get('e-autocomplete')) { customElements.define("e-autocomplete", AutoCompleteElement) };
