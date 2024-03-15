export default function IsDashM({ html, state }) {
  return html`
    <style scope=global>
      [m-rule]{

        /* Horizontal rule */
        hr& {
          background-color: var(--m-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;

          /* Vertical bar/separator, requires explicit height parent, flex or grid parent */
          &[aria-orientation=vertical] {
            width: 1px;
            height: auto;
          }
        }
      }
    </style>
  `
}
