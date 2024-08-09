export default function Avatar({state,html}){

return html`<style>
  :host {
  --avatar-size: 100px;
  --avatar-shape: circle; /* Options: circle, square, rectangle */
  --avatar-bg-color: #f0f0f0;
  --avatar-text-color: #555;
  --avatar-font-size: 24px;
  --avatar-icon-size: 40px;
  --avatar-icon-color: #555;
  --avatar-bg-image: none; /* Optional: URL to a background image */

  display: inline-block;
  width: var(--avatar-size);
  height: var(--avatar-size);
  background-color: var(--avatar-bg-color);
  background-image: var(--avatar-bg-image);
  background-size: cover;
  background-position: center;
  border-radius: var(--avatar-shape);
  overflow: hidden;
  text-align: center;
  font-size: var(--avatar-font-size);
  color: var(--avatar-text-color);
  line-height: var(--avatar-size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}


:host[shape="circle"] {
  --avatar-shape: 50%;
}

:host[shape="square"] {
  --avatar-shape: 0;
}

:host[shape="rectangle"] {
  --avatar-shape: 10px; /* You can adjust the border-radius for rectangles */
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--avatar-shape);
}
/*:host::before {
  content: attr(data-fallback-text);
  font-size: var(--avatar-font-size);
  color: var(--avatar-text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}*/


</style>
<style scope="global">

e-avatar::before {
            text-align: center;
            width: 100%;
            height: 100%;
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            mask-type:alpha;
            background-color: currentColor;
            content: '';
            mask-image: url('data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22currentColor%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M230.92%2C212c-15.23-26.33-38.7-45.21-66.09-54.16a72%2C72%2C0%2C1%2C0-73.66%2C0C63.78%2C166.78%2C40.31%2C185.66%2C25.08%2C212a8%2C8%2C0%2C1%2C0%2C13.85%2C8c18.84-32.56%2C52.14-52%2C89.07-52s70.23%2C19.44%2C89.07%2C52a8%2C8%2C0%2C1%2C0%2C13.85-8ZM72%2C96a56%2C56%2C0%2C1%2C1%2C56%2C56A56.06%2C56.06%2C0%2C0%2C1%2C72%2C96Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');

          -webkit-font-smoothing: antialiased;
}
</style>


<img slot=logo src="https://picsum-no.photos/100" alt="logo">
`}