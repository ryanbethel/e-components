# E- Components for Enhance (inspired by [M-](https://m-docs.org))
This is a fork of the [MDash](https://m-docs.org) components for use with Enhance.
It is a work in progress.
Many changes to come.
Some components have been changed to take advantage of Enhance features.
For instance M- uses many element styles (i.e. button).
This version uses a custom element wrapper for many of those (i.e. `<hf-button>`), but because Enhance expands the element you don't need to author the button inside hf-button.

## Opinions
- Use attributes to handle state. Enhance includes application state in the form of `state.store`, but this should be reserved for applications. These components do not expect or use the store. This makes them more flexible in other environments where only Enhance SSR is used (including Enahance SSR WASM).
- Customization and configuration of these components is done primarily with custom properties. 


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

A simple way to include the global css is to add a `<hf-theme></hf-theme>` tag to every page.
This tag does not render anything it instead adds a style tag to the head.

Alternatively you can add it by putting the `hf-global.css` in public folder and then in the head as follows. 

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
      <link rel="stylesheet" href="/_public/hf-global.css">
      <meta name="description" content="The HTML first full stack web framework.">
    </head>
`
}
```

## Acknolegements
- M-Dash
- Phosphor Icons


## Color Themes (Light and Dark Mode)
The components are built with theming in mind. 
By choosing appropriate colors and adjusting custom properties a working light and dark can be applied. 
The following recommendations show options for choosing a theme based on OS default or user selection.
This preference can be persisted through local storage. 

The primary way that components adapt to a light and dark them is by use of the scale of Gray (or other nutral) color.
The user configuration requires custom property values for the neutral color from `--hf-color-gray-0` to `--hf-color-gray-10`.
For light mode this range should be set with light on the low end and dark on the high end.
For dark mode the range is reversed. 
Other changes to the primary color and other supporting colors may need to be made depending on the theme.

```css
  /* Light Theme */
  --hf-color-gray-0:  hsl(0, 0%, 95%);
  --hf-color-gray-1:  hsl(0, 0%, 90%);
  --hf-color-gray-2:  hsl(0, 0%, 80%);
  --hf-color-gray-3:  hsl(0, 0%, 70%);
  --hf-color-gray-4:  hsl(0, 0%, 60%);
  --hf-color-gray-5: hsl(0, 0%, 50%);
  --hf-color-gray-6: hsl(0, 0%, 40%);
  --hf-color-gray-7: hsl(0, 0%, 30%);
  --hf-color-gray-8: hsl(0, 0%, 20%);
  --hf-color-gray-9: hsl(0, 0%, 10%);
  --hf-color-gray-10: hsl(0, 0%, 7%); 


  /* Dark Theme */
  --hf-color-gray-0: hsl(0, 0%, 7%); 
  --hf-color-gray-1: hsl(0, 0%, 10%);
  --hf-color-gray-2: hsl(0, 0%, 20%);
  --hf-color-gray-3: hsl(0, 0%, 30%);
  --hf-color-gray-4: hsl(0, 0%, 40%);
  --hf-color-gray-5: hsl(0, 0%, 50%);
  --hf-color-gray-6:  hsl(0, 0%, 60%);
  --hf-color-gray-7:  hsl(0, 0%, 70%);
  --hf-color-gray-8:  hsl(0, 0%, 80%);
  --hf-color-gray-9:  hsl(0, 0%, 90%);
  --hf-color-gray-10:  hsl(0, 0%, 95%);
```

These custom properties can be applied at an application level in many possible ways. 
The following is a suggested approach that allows for operating system defaults to be used and overridden by if desired.

To persist the users preference while avoiding a flash of the wrong color theme as the site is initially loaded requires some effort.
This example persists the user preference in local storage.
Because it uses JavaScript it is a progressive enhancement.
If JavaScript fails to load the fallback default theme is still a working theme.

To avoid the flash of the wrong theme the following script should be in the docuemnt head, or somewhere before any of the body begins to load. 
This checks local storage for a theme preference and applies a class to the document (`<html>`) element.
This local storage preference is set by the theme picker show further down. 
This script is intentionally minimal to make sure if a preference is stored it is used before any content is shown. 

```html
<script>
  const darkLightTheme = window.localStorage.getItem('dark-light-theme');
  if (darkLightTheme === 'dark') { document.documentElement.classList.add('dark-mode'); } 
</script>
```


```css
/* If theme class is set for Dark it has high priority by the specificity */
:root.dark-mode:not(#id-for-high-specificity) {
      /* Dark Theme */
      --hf-color-gray-0:  hsl(0, 0%, 7%);
}

/* If no theme class is set on the document the theme toggle 
   can be used to set theme or leave the theme as auto       */
:root:has(input[name=color-scheme][value=dark]:checked) {
  #color-scheme::after{ 
    content:'Dark Mode';
  }
      /* Dark Theme */
      --hf-color-gray-0: hsl(0, 0%, 7%); 
}
:root:has(input[name=color-scheme][value=light]:checked) {
  #color-scheme::after{ 
    content:'Light Mode';
  }
  /* Light Theme */
  --hf-color-gray-0:  hsl(0, 0%, 95%);
}
/* If the theme switcher auto is set it no specific theme 
   values are set allowing the default values to take over */
:root:has(input[name=color-scheme][value=auto]:checked) {
  #color-scheme::after{ 
    content:'Auto Mode';
  }
}

/* Default theme values are set for when nothing is chosen */
:root {
  /* Colors */
  color-scheme: light dark;

  /* Default Light Theme */
  --hf-color-gray-0:  hsl(0, 0%, 95%);
}

/* A media query handles the OS default theme if set */
  @media ( prefers-color-scheme: dark ) {
    :root {
      /* Dark Theme */
      --hf-color-gray-0: hsl(0, 0%, 7%); 
    }
  }

```
