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

        ${edash ?  `
        <link rel="stylesheet" href="/_public/e-global-custom-properties.css" />
        ` : `
        ${getStyles.linkTag()}
        `}
        <link rel="stylesheet" href="/_public/e-global-basic-reset.css" />
  <meta
    name="description"
    content="The HTML first full stack web framework."
  />
      </head >
    `;
}
