# E- Components for Enhance (inspired by [M-](https://m-docs.org))
This is a fork of the [MDash](https://m-docs.org) components for use with Enhance.
It is a work in progress.
Many changes to come.
Some components have been changed to take advantage of Enhance features.
For instance M- uses many element styles (i.e. button).
This version uses a custom element wrapper for many of those (i.e. `<e-button>`), but because Enhance expands the element you don't need to author the button inside e-button.

## Usage
To use the components first install the package:
```sh
npm i @ryanbethel/e-components
```

The components can be added to an Enhance project with the `element.mjs` file.
Add the following `/app/element.mjs` file to your app directory:

```javascript
// /app/elements.mjs
import { elements } from '@ryanbethel/e-components' 
export default elements
```

Individual elements can be used with `import {eButton} from '@ryanbethel/e-components/elements.js`. 
Components are available for clientside use with the [@enhance/custom-element](https://github.com/enhance-dev/custom-element) wrapper. 
These can be imported with `import {eButton} from '@ryanbethel/e-components/components.js`. 

## Docs/Examples
An example app showing all components is included in the project directory.
You can fork the repo and run `npm start` to see it. 
http://localhost:3333 is a page that includes most of the components used together.
http://localhost:3333/docs has a repl/playground of the compoents with usage examples.

## Global Assets
A small global style file is needed for all the components.

A simple way to include the global css is to add a `<e-theme></e-theme>` tag to every page.
This tag does not render anything it instead adds a style tag to the head.

Alternatively you can add it by putting the `e-global.css` in public folder and then in the head as follows. 

```javascript
// head.mjs
export default function Head() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Enhance Starter Project</title>
      <link rel="icon" href="/_public/favicon.svg">
      <link rel="stylesheet" href="/_public/e-global.css">
      <meta name="description" content="The HTML first full stack web framework.">
    </head>
`
}
```


