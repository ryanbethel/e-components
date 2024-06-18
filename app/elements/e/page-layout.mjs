export default function Layout({ html, state }) {

  return html`
<style>
  .right-sidebar {
   grid-area: right-sidebar;
   display: none;
  }
  .wrapper {
   min-height: 100vh;
   display: grid;
   grid-template-areas:
     'header'
     'left-sidebar'
     'main'
     'footer';
   grid-template-rows: min-content min-content 1fr min-content;
  }
  @media (min-width: 26rem) {
   .wrapper {
      grid-template:
       'header             header' min-content
       'left-sidebar       main  ' 1fr
       'footer             footer' min-content
       / minmax(auto, var(--layout-max-sidebar-width, 16rem))
         minmax(var(--layout-min-content-width, 16rem), 1fr);
   }
  }
  @media (min-width: 80rem) {
   .wrapper {
     grid-template:
      'header             header             header' min-content
      'left-sidebar       main               right-sidebar' 1fr
      'footer             footer             footer' min-content
      / minmax(auto, var(--layout-max-sidebar-width, 16rem))
        minmax(var(--layout-min-content-width, 16rem), 1fr)
        minmax(auto, var(--layout-max-sidebar-width, 16rem));
    }
    .right-sidebar {
      grid-area: right-sidebar;
      display: block;
    }
  }
</style>
 <slot name="header"></slot>
 <slot name="left-sidebar"></slot>
 <slot name="main"></slot>
 <slot name="right-sidebar"></slot>
 <slot name="footer"></slot>
`
}
