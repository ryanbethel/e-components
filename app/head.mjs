import { getStyles } from '@paramour/arc-plugin-paramour-css'
export default function Head({ req }) {
  const edash = req.query.hasOwnProperty('edash')


  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Enhance Starter Project</title>
        <link rel="icon" href="/_public/favicon.svg" />

        ${edash ? `
        <link rel="stylesheet" href="/_public/hf-global-custom-properties.css" />
        ` : `
        ${getStyles.linkTag()}
        `}
        <link rel="stylesheet" href="/_public/hf-global-basic-reset.css" />
  <meta
    name="description"
    content="The HTML first full stack web framework."
  />

      <script>
        const darkLightTheme = window.localStorage.getItem('dark-light-theme');
        if (darkLightTheme === 'dark') { 
          document.documentElement.classList.add('dark-mode'); 
          document.documentElement.classList.remove('light-mode')
        } 
        if (darkLightTheme === 'light') { 
          document.documentElement.classList.add('light-mode')
          document.documentElement.classList.remove('dark-mode'); 
        } 
        </script>
      </head >
    `;
}
