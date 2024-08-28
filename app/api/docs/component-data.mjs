const components = [
  {
    name: "Accordion",
    path: "accordion",
    exampleUsage: `<hf-accordion>
    <details>
        <summary>Summary</summary>
        <p>Details about this thing</p>
    </details>
    <details>
      <summary>Summary</summary>
      <p>Details about this thing</p>
    </details>
</hf-accordion>


` },
  {
    name: "Responsive Header",
    path: "responsivhf-header",
    exampleUsage: `
<hf-responsivhf-header style="--header-background-color:var(--hf-color-gray-9); --header-color:var(--hf-color-gray-1);">
  <img slot=logo src="https://picsum.photos/24" alt="logo">
  <p slot=domain>Example.com</p>
  <div slot=nav-items>
    <hf-link><a aria-current=page href="/blog" >Blog</a></hf-link>
    <hf-link><a href="/login" >Login</a></hf-link>
  </div>
</hf-responsive-header>
` },
  {
    name: "Responsive Sidebar",
    path: "responsive-sidebar",
    exampleUsage: `
<hf-responsive-sidebar style="--header-background-color:var(--hf-color-gray-9); --header-color:var(--hf-color-gray-1);">
  <img slot=logo src="https://picsum.photos/24" alt="logo">
  <p slot=domain>brand.com</p>
  <div slot=nav-items>
    <hf-link><a aria-current=page href="/blog" >Blog</a></hf-link>
    <hf-link><a href="/login" >Login</a></hf-link>
  </div>
  <hf-list slot=sidebar>
    <ol>
      <li><hf-link><a href="/" >Stuff</a></hf-link></li>
      <li><hf-link><a href="/" >Other Stuff</a></hf-link></li>
    </ol>
  </hf-list>
  <hf-box slot=main>Main Content</hf-box>
</hf-responsive-sidebar>

` },
  {
    name: "Alert",
    path: "alert",
    exampleUsage: `
<hf-alert>Neutral message</hf-alert>
<hf-alert type="info">Informational message</hf-alert>
<hf-alert type="success">Positive message</hf-alert>
<hf-alert type="warn">Cautionary message</hf-alert>
<hf-alert type="error" dismissible="false">Error message with no dismiss button</hf-alert>`},
  {
    name: "Autocomplete",
    path: "autocomplete",
    exampleUsage: `
  <hf-autocomplete source="fruit" placeholder="Slowly type 'apl' to see the behavior">
  <hf-input-group>
    <label>Search</label>
    <input type=text />
    <datalist id="fruit">
      <option value="apple"></option>
      <option value="banana"></option>
      <option value="cherry"></option>
      <option value="peach"></option>
    </datalist>
  </hf-input-group>
</hf-autocomplete>`},
  {
    name: "Badge",
    path: "badge",
    exampleUsage: `
<hf-badge count="1"></hf-badge>
<hf-badge>New</hf-badge>`},
  {
    name: "Box",
    path: "box",
    exampleUsage: `
<hf-box>Primary content</hf-box>
<hf-box ord="secondary">Secondary content</hf-box>
<p>Content outside a Box is considered neutral</p>`},
  {
    name: "Blockquote",
    path: "blockquote",
    exampleUsage: `
<hf-blockquote>
  <blockquote>Someone said something.</blockquote>
</hf-blockquote>
`},
  {
    name: "Breadcrumb", path: "breadcrumb", exampleUsage: `
  <hf-breadcrumb>
  <nav>
    <hf-link><a href="#">Home</a></hf-link>
    <hf-link><a href="#">Shoes</a></hf-link>
    <span aria-current="page">Women</span>
  </nav>
</hf-breadcrumb>
<hf-seperator></hf-seperator>
<hf-breadcrumb>
    <nav>
        <hf-link><a href="#home">Home</a></hf-link>
        <hf-link><a href="#shoes">Shoes</a></hf-link>
        <hf-crumb>
            <hf-menu>
                <span role="link" slot="trigger">Womens ↓</span>
                <div slot="items">
                    <hf-link><a href="#womens-casual">👞 Casual</a></hf-link>
                    <hf-link><a href="#womens-sporty">👟 Sporty</a></hf-link>
                    <hf-link><a href="#womens-formal">👠 Formal</a></hf-link>
                </div>
            </hf-menu>
        </hf-crumb>
        <span>Sport</span>
    </nav>
</hf-breadcrumb>
` },
  {
    name: "Button", path: "button", exampleUsage: `
  <p> Ordinal name</p>
<hf-button ord=primary ><button >Primary</button></hf-button>
<hf-button ord=secondary ><button >Secondary</button></hf-button>
<hf-button ord=tertiary ><button >Tertiary</button></hf-button>
<p>Disabled state</p>
<hf-button ord=primary ><button disabled>Disabled</button></hf-button>
<p>Link as button</p>
<hf-button ord=primary><a role="button" href="/button">Link</a></hf-button>
<p>Remove type</p>
<hf-button><button type="remove"></button></hf-button>
<p>Button group</p>
<div role="group">
    <hf-button ord="secondary"><button  aria-pressed="true">One</button></hf-button>
    <hf-button ord="secondary"><button >Two</button></hf-button>
    <hf-button ord="secondary"><button >Three</button></hf-button>
</div>
`},
  {
    name: "Checkbox", path: "checkbox", exampleUsage: `
  <hf-input-group>
    <legend>Languages</legend>
    <input id="html" type="checkbox" name="speed" value="html" checked>
    <label for="html">HTML</label>
    <input id="css" type="checkbox" name="speed" value="css">
    <label for="css">CSS</label>
    <input id="js" type="checkbox" name="speed" value="js">
    <label for="js">JavaScript</label>
</hf-input-group>
`},
  {
    name: "Container", path: "container", exampleUsage: `
<hf-container>Container is centered in its parent, has responsive padding, and its content will be contained according to <code>maxwidth</code>.</hf-container>
`},
  {
    name: "Details", path: 'details', exampleUsage: `
<hf-details>
  <details>
    <summary>Click to see details</summary>
    <p>The deets.</p>
  </details>
</hf-details>
`},
  {
    name: "Dialog", path: 'dialog', exampleUsage: `
<hf-dialog>
  <dialog>
    <h2>Title</h2>
    <p>Put anything you want in here.</p>
    <p>(press <kbd>Esc</kbd> to close)</p>
  </dialog>
</hf-dialog>
<hf-button ord=primary><button onclick="document.querySelector('dialog').showModal()" >Open Dialog</button></hf-button>
`},
  {
    name: "Dot",
    path: "dot",
    exampleUsage: `<hf-dot type="info">Information</hf-dot>
<hf-dot type="success">Success</hf-dot>
<hf-dot type="warn">Warning</hf-dot>
<hf-dot type="error">Error</hf-dot>
<hf-dot>Unknown</hf-dot>`},
  {
    name: "Form", path: 'form', exampleUsage: `
<form>
    <hf-input-group>
        <label>Email</label>
        <input type="email">
    </hf-input-group>
    <hf-input-group>
        <label>Password</label>
        <input type="password">
        <small>Must be at least 8 characters</small>
    </hf-input-group>
    <hf-input-group>
        <label>Address</label>
        <input placeholder="Street">
        <input placeholder="Zip" autocomplete="postal-code">
    </hf-input-group>
    <hf-button ord="primary"><button type="submit">Save</button></hf-button>
</form>
`},
  {
    name: "Grid", path: 'grid', exampleUsage: `
<hf-row>
    <hf-col>
      <hf-box>This row's columns...</hf-box>
    </hf-col>
    <hf-col>
      <hf-box>...will auto-span.</hf-box>
    </hf-col>
</hf-row>
<hf-row>
    <hf-col span="4">
      <hf-box>These two columns...</hf-box>
    </hf-col>
    <hf-col span="8">
      <hf-box>...span an explicit number of columns (4 and 8).</hf-box>
    </hf-col>
</hf-row>
<hf-row center >
  <hf-col span="4">
    <hf-box>Centered Row</hf-box>
  </hf-col>
</hf-row>
`},
  {
    name: "Input", path: 'input', exampleUsage: `
<hf-input-group>
    <label>Label</label>
    <input type="text" placeholder="Placeholder">
</hf-input-group>
`},
  {
    name: "Keyboard", path: 'keyboard', exampleUsage: `
<p>Press <hf-keyboard>⇧⌘T</hf-keyboard> to close window</p>
<hf-keyboard>
    <hf-keyboard>Ctrl</hf-keyboard> + <hf-keyboard>N</hf-keyboard>
</hf-keyboard>
`},
  {
    name: "Link", path: 'link', exampleUsage: `
<hf-link><a href="#">Real link</a></hf-link>,
<hf-link><span role="link">Fake link</span></hf-link>
`},
  {
    name: "Loader", path: 'loader', exampleUsage: `
<hf-loader loading></hf-loader>
<hf-loader loading>Searching...</hf-loader>
`},
  {
    name: "Menu", path: 'menu', exampleUsage: `
<hf-menu>
    <hf-button  ord="primary" slot="trigger"><button >Basic Links</button></hf-button>
    <div slot="items">
        <hf-link><a>Products</a></hf-link>
        <hf-link><a>Services</a></hf-link>
        <hf-link><a>Customer support</a></hf-link>
    </div>
</hf-menu>
<hf-menu>
    <hf-button  ord="primary" slot="trigger"><button>Custom Content and Width</button></hf-button>
    <div slot="items" class="pad-sm" style="min-width: 200px">
        <div class="inline-flex align-items-center">
            <img src="https://picsum.photos/50" height="51" class="brd-radius-full">
            <div>
                <div class="txt-nowrap">Homer J. Simpson</div>
                <div class="txt-gray-6">Safety Inspector</div>
            </div>
        </div>
        <hr class="mar-t-sm mar-b-sm">
        <div class="flex flx-col gap-xs">
            <a>Profile</a>
            <a>Sign out</a>
        </div>
    </div>
</hf-menu>
`},
  {
    name: "Radio", path: 'radio', exampleUsage: `
<hf-input-group>
    <legend>Speed</legend>
    <input type="radio" name="speed" value="slow" id="speed_slow" checked>
    <label for="speed_slow">Slow</label>
    <input type="radio" name="speed" value="med" id="speed_med">
    <label for="speed_med">Medium</label>
    <input type="radio" name="speed" value="fast" id="speed_fast">
    <label for="speed_fast">Fast</label>
</hf-input-group>
`},
  {
    name: "Range", path: 'range', exampleUsage: `
<hf-input-group>
    <label>Price</label>
    <input type="range">
</hf-input-group>
`},
  {
    name: "Select", path: 'select', exampleUsage: `
<hf-input-group>
    <label>Select one</label>
    <select>
      <option value="water">Water</option>
      <option value="coke">Coke</option>
      <option value="lemonade">Lemonade</option>
    </select>
</hf-input-group>
<hf-input-group>
    <label>Select many</label>
    <select name="pets" multiple size="8">
      <optgroup label="Appetizers">
        <option value="chips">Chips & salsa</option>
        <option value="cheese">Cheese platter</option>
      </optgroup>
      <optgroup label="Main course">
        <option value="duck">Duck confit</option>
        <option value="ribeye">8oz aged ribeye</option>
      </optgroup>
      <optgroup label="Dessert">
        <option value="cake">Cake</option>
        <option value="ice-cream">Ice-cream</option>
      </optgroup>
    </select>
</hf-input-group>
`},
  {
    name: "Separator", path: "seperator", exampleUsage: `
<p>Content</p>
<hf-seperator></hf-seperator>
<p>Content</p>
<div class="flex gap-xs">
    <div>Content</div>
    <hf-seperator vertical></hf-seperator>
    <div>Content</div>
    <hf-seperator vertical></hf-seperator>
    <div>Content</div>
</div>
` },
  {
    name: "Switch", path: 'switch', exampleUsage: `
<hf-switch></hf-switch>
<hf-switch><input type="checkbox" is="switch" checked></hf-switch>
`},
  {
    name: "Table", path: 'table', exampleUsage: `
<hf-table>
<table striped>
    <thead>
        <tr>
            <th>Product</th>
            <th aria-sort="ascending">
                <button aria-pressed="true">Price</button>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Socks</td>
            <td>$9.99</td>
        </tr>
        <tr>
            <td>Shorts</td>
            <td>$19.99</td>
        </tr>
        <tr>
            <td>Sweater</td>
            <td>$29.99</td>
        </tr>
        <tr>
            <td>Shoes</td>
            <td>$49.99</td>
        </tr>
    </tbody>
</table>
</hf-table>
`},
  {
    name: "Tabs", path: 'tabs', exampleUsage: `
<hf-tabs role="tablist" scrollable>
  <button role="tab" aria-selected="true">Selected</button>
  <button role="tab">Not Selected</button>
  <button role="tab" disabled>Disabled</button>
  <a href="/" role="tab">Link</a>
</hf-tabs>
<p class="txt-xs txt-gray-5">See <hf-link><a href="#select-tab">selecting tabs</a></hf-link> to learn how to select a tab</p>
`},
  {
    name: "Tag", path: 'tag', exampleUsage: `
<hf-tag>non-smoking</hf-tag>
<hf-tag>WiFi</hf-tag>
<hf-tag>pool</hf-tag>
<hf-tag>
    free breakfast
    <hf-button><button type="remove"></button></hf-button>
</hf-tag>
`},
  {
    name: "Textarea", path: 'textarea', exampleUsage: `
<hf-input-group>
  <label>Leave a comment</label>
  <textarea> </textarea> 
</hf-input-group>
`},
  {
    name: "Code", path: "code", exampleUsage: `
<hf-code><pre>Text</pre></hf-code>
<hf-code><code>Inline<code></hf-code>` },
  {
    name: "Headings", path: 'headings', exampleUsage: `
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
`},
  {
    name: "Lists", path: 'lists', exampleUsage: `
<hf-list>
  <ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ul>
</hf-list>
<hf-list>
  <ol>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ol>
</hf-list>
<hf-list type="none">
  <ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
  </ul>
</hf-list>
<hf-list type="content">
  <ul>
    <li class="pad-sm">Foo</li>
    <li class="pad-sm">Bar</li>
    <li class="pad-sm">Baz</li>
  </ul>
</hf-list>
<hf-list>
  <dl>
    <dt class="pad-sm">Foo</dt>
    <dt class="pad-sm">Bar</dt>
    <dt class="pad-sm">Baz</dt>
  </dl>
</hf-list>
`},
  {
    name: "Text", path: 'text', exampleUsage: `
<p>This is a paragraph with some <span class="fnt-bold">bold text</span> and some <span class="fnt-italic">italic text</span>. More text variations can be done using the <hf-link><a href="/utility-classes">utility classes</a></hf-link>.</p>
<hf-blockquote>
  <blockquote>
    <p>This is something somebody said.</p>
  </blockquote>
</hf-blockquote>
<small>This is for small print, side-comments, disclaimers, etc.</small>
`},
]

export default components
