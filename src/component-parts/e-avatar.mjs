import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope=global>
  e-avatar {
  --avatar-size: 2.5rem;
  --avatar-radius: 50%;

  display: inline-block;
  width: var(--avatar-size);
  height: var(--avatar-size);
  background-color: var(--e-color-info); 
  background-size: cover;
  background-position: center;
  border-radius: var(--avatar-radius);
  overflow: hidden;
  text-align: center;
  font-size: var(--e-font-size-md);
  color: var(--e-color-info-text);
  line-height: var(--avatar-size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}


e-avatar[shape="circle"] { --avatar-radius: 50%; }
e-avatar[shape="square"] { 
  --avatar-radius: var(--e-border-radius-lg, 10px);
}

e-avatar[size="small"] {
  --avatar-size: 1.5rem;
}
e-avatar[size="medium"] {
  --avatar-size: 2.5rem;
}
e-avatar[size="large"] {
  --avatar-size: 5rem;
}
e-avatar[size="xlarge"] {
  --avatar-size: 10rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--avatar-radius);
}

/* Fallback Text */
e-avatar[text]::before {
  content: attr(text);
  font-size: calc(var(--avatar-size) * .4);
  font-weight: 700;
  color: var(--e-color-info-text);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75%;
  width: 75%;
}

/* Fallback SVG */
e-avatar:not([text])::before {
            text-align: center;
            width: 75%;
            height: 75%;
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            mask-type:alpha;
            background-color: currentColor;
            content: '';
            mask-image: url('data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22currentColor%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M230.92%2C212c-15.23-26.33-38.7-45.21-66.09-54.16a72%2C72%2C0%2C1%2C0-73.66%2C0C63.78%2C166.78%2C40.31%2C185.66%2C25.08%2C212a8%2C8%2C0%2C1%2C0%2C13.85%2C8c18.84-32.56%2C52.14-52%2C89.07-52s70.23%2C19.44%2C89.07%2C52a8%2C8%2C0%2C1%2C0%2C13.85-8ZM72%2C96a56%2C56%2C0%2C1%2C1%2C56%2C56A56.06%2C56.06%2C0%2C0%2C1%2C72%2C96Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');

}
</style>
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
${styleString}
${markupString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-avatar', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-avatar',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 