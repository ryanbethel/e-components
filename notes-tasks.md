# Goals
- Outputs:
  - Elements where HTML preferred for portability
  - Elements should be dependency free if possible so wasm ssr works better
  - PE script is vanilla for simplicity (i.e. no deps)
  - Style tags use self scoped styles by prepending the tag name so that these style tags can be added to the head even if enhance is not used. 

  - Client 
  - API uses tag names and attributes 
  - Attributes used in CSS to style against and JS for interactivity
  - Attributes used in templating as a last resort (i.e. should not change structure of component based on attributes)
    - This requires more code in attribute changed callbacks to update with changed attributes. 
    - If the structure is significantly different based on attribute it is better to have a separate tag (i.e. v-rule and h-rule)
    - Templating of state in style and script should especially be avoided so that script and style can be placed independently without enhance.


- Clientside
  - Most components should be able to be client rendered (both with children present or us createElement then add contents)
  - Some components that are clearly SSR only do not need this feature (like responsive headers or page layouts)
  - For easy CSR api should prefer unnamed slot only (i.e. `<slot></slot>`) or simple wrapped slot (i.e. `<blockquote><slot></slot></blockquote>`)
  - Named slots with complex structure are better for SSR only usage
  - Fully rendered contents can be CSRed with createElement easily. 

- State (Attributes and Store)
  - Components use only Attribute state
  - Store is reserved for application to make components more portable
  - Attribute state should mostly be used in styling and JS
    - Styling with attribute selectors (i.e. `[shape=circle]`) or content (i.e. `content: attr(first-name);`)
    - Using attributes to template into the styles (i.e. `@media (max-width:${breakpoint}`) should only be used for SSR only components. 
    - Attributes can be used by PE scripts to trigger behavior etc. Again, using attribute state to template into the scripts should be avoided when possible. 



## Render types
Components can have several types of self render. By grouping these together we can identify shortcuts to rendering.
- Simplest (and most common) they might rely on all children to be added. These have a single unnamed slot `<slot></slot>`. They do not require any rerendering logic.
  - A subset of these are where there is a single wrapping element inside around the slot (i.e. `<my-blockquote><blockquote><slot></slot></blockquote></my-blockquote>`).
  These can be rendered by checking for that wrapping element and adding it.
- The opposite are leaf nodes where the content is fully rendered. They do not accept children. Their render function determines the whole content. 
  - These come in two sub-types. The first where the child content is static (i.e. `<h-rule><hr></h-rule>`). 
  For these the content can be server side rendered or client side rendered. The only logic needed is to check if children are present and render the content if not. 
  This can be done in the `connectedCallback` for csr.
  - The other subset of these is where the rendered content is dependant on state (either attributes or application state). These need to respond when the state updates and make those changes to the markup.
- The last type is the kitchen sink components. 


## Thoughts on component API
- Components should communcate generically by attributes down and events up.
- interactivity should be self contained 
- Within an application there can be a layer of reactivity over the top with data store and subscriptions. 


## Reslotting Clientside
- After initialization create an array of slotted content to use for reslotting on rerender
- Before reslotting check to make sure all nodes are still connected as decendents using node.contains(). If they are not contained remove them from the list.
- The problem is nodes that have already been expanded might not have the enhanced attribute yet
- Should add and `enhanced=client` when expanded on the client.
- when slotting (client side or serverside) add a slot-id attribute so that when SSR content comes down and initializes the slots property can be populated with slotted content for reslotting.
- If slotted content is removed it is handled on rerender by checking to see if that node is still in the tree.
- If slotted content is added inside already slotted nodes that is already in that node.
- If new content is manually reslotted by inserting in the slotted location it may be lost on rerender, unless it is registered as slotted content. 
- When rerendering new content can be reslotted using a method to insert it. 
- Some hook for reconnecting querySelected nodes or eventListeners should be provided.

This reslotting is only applicable when slots are present. 
Full rerender on state change should be opted into by passing options to the mixin. For leaf nodes full rerender is fine. For Higher nodes like layout rerender should not be done. 

Unnamed slot with text nodes
- this reslotting will fail to reslot text nodes in unnamed slots that are server rendered because there is no way to mark the text node in the dom to get it re associated with that node.
- It might be possible to specify a range instead of a node to mark slotted text nodes. This would require some special handling to mark that range in SSR.

Light Reslotting
- Consider adding a `<lt-slot>` or something to stand in as slots for light dom. This might appease people who object to using slots in the light dom.


## Misc Ideas
- Only do surgical DOM updates within a component. Don't pierce inside another component to change its guts. 
- Don't add event listners that listen to internal elements in a component. 

## Marking Slots
```HTML
<div>
  <!-- slot start id=x5g -->
    Text<p>stuff stuff</p>more text
  <!-- slot-id=x5g -->
</div>
```

```HTML
<div>
  <!-- slot start id=x5g -->
  <slot></slot>
  <!-- slot-id=x5g -->
</div>
```

```HTML
<div>
  <p>stuff</p>
  <slot-mark></slot-mark>
  <slot></slot>
  <slot-mark></slot-mark>
  some text
</div>
```

```HTML
<div slot-id=xyz >
  <p>stuff</p>
  <slot></slot>
  some text
</div>
```
```HTML
<div slot-id=xyz >
  <p>stuff</p>
  <slot></slot>
  some text
</div>
```
