import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-avatar {
  --avatar-size: 2.5rem;
  --avatar-radius: 50%;

  display: inline-block;
  width: var(--avatar-size);
  height: var(--avatar-size);
  background-color: var(--hf-color-info); 
  background-size: cover;
  background-position: center;
  border-radius: var(--avatar-radius);
  overflow: hidden;
  text-align: center;
  font-size: var(--hf-font-size-md);
  color: var(--hf-color-info-text);
  line-height: var(--avatar-size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}


hf-avatar[shape="circle"] { --avatar-radius: 50%; }
hf-avatar[shape="square"] { 
  --avatar-radius: var(--hf-border-radius-lg, 10px);
}

hf-avatar[size="small"] {
  --avatar-size: 1.5rem;
}
hf-avatar[size="medium"] {
  --avatar-size: 2.5rem;
}
hf-avatar[size="large"] {
  --avatar-size: 5rem;
}
hf-avatar[size="xlarge"] {
  --avatar-size: 10rem;
}

hf-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--avatar-radius);
}

/* Fallback Text */
hf-avatar[text]::before {
  content: attr(text);
  font-size: calc(var(--avatar-size) * .4);
  font-weight: 700;
  color: var(--hf-color-info-text);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75%;
  width: 75%;
}

/* Fallback SVG */
hf-avatar:not([text])::before {
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
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-avatar', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-avatar', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
