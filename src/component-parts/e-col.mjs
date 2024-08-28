import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-col,
hf-col[indent] {
    box-sizing: border-box;
    flex: 0 0 auto;
}

hf-col {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;

    /* span sets the width of the column */
    &[span~="1"] {
        max-width: 8.33333333%;
    }

    &[span~="2"] {
        max-width: 16.66666667%;
    }

    &[span~="3"] {
        max-width: 25%;
    }

    &[span~="4"] {
        max-width: 33.33333333%;
    }

    &[span~="5"] {
        max-width: 41.66666667%;
    }

    &[span~="6"] {
        max-width: 50%;
    }

    &[span~="7"] {
        max-width: 58.33333333%;
    }

    &[span~="8"] {
        max-width: 66.66666667%;
    }

    &[span~="9"] {
        max-width: 75%;
    }

    &[span~="10"] {
        max-width: 83.33333333%;
    }

    &[span~="11"] {
        max-width: 91.66666667%;
    }

    &[span~="12"] {
        max-width: 100%;
    }

    /* indent is used to push columns inward */
    &[indent="1"] {
        margin-left: 8.33333333%;
    }

    &[indent="2"] {
        margin-left: 16.66666667%;
    }

    &[indent="3"] {
        margin-left: 25%;
    }

    &[indent="4"] {
        margin-left: 33.33333333%;
    }

    &[indent="5"] {
        margin-left: 41.66666667%;
    }

    &[indent="6"] {
        margin-left: 50%;
    }

    &[indent="7"] {
        margin-left: 58.33333333%;
    }

    &[indent="8"] {
        margin-left: 66.66666667%;
    }

    &[indent="9"] {
        margin-left: 75%;
    }

    &[indent="10"] {
        margin-left: 83.33333333%;
    }

    &[indent="11"] {
        margin-left: 91.66666667%;
    }

    &[indent="12"] {
        margin-left: 100%;
    }
}

/* Order is used to reorder columns at specific breakpoints */
@media only screen and (max-width: 768px) {
    hf-col[span~="md-1"] {
        max-width: 8.33333333%;
    }

    hf-col[span~="md-2"] {
        max-width: 16.66666667%;
    }

    hf-col[span~="md-3"] {
        max-width: 25%;
    }

    hf-col[span~="md-4"] {
        max-width: 33.33333333%;
    }

    hf-col[span~="md-5"] {
        max-width: 41.66666667%;
    }

    hf-col[span~="md-6"] {
        max-width: 50%;
    }

    hf-col[span~="md-7"] {
        max-width: 58.33333333%;
    }

    hf-col[span~="md-8"] {
        max-width: 66.66666667%;
    }

    hf-col[span~="md-9"] {
        max-width: 75%;
    }

    hf-col[span~="md-10"] {
        max-width: 83.33333333%;
    }

    hf-col[span~="md-11"] {
        max-width: 91.66666667%;
    }

    hf-col[span~="md-12"] {
        max-width: 100%;
    }
}

/* Must come after medium because cascading is used here */
@media only screen and (max-width: 576px) {
    hf-col[span~="sm-1"] {
        max-width: 8.33333333%;
    }

    hf-col[span~="sm-2"] {
        max-width: 16.66666667%;
    }

    hf-col[span~="sm-3"] {
        max-width: 25%;
    }

    hf-col[span~="sm-4"] {
        max-width: 33.33333333%;
    }

    hf-col[span~="sm-5"] {
        max-width: 41.66666667%;
    }

    hf-col[span~="sm-6"] {
        max-width: 50%;
    }

    hf-col[span~="sm-7"] {
        max-width: 58.33333333%;
    }

    hf-col[span~="sm-8"] {
        max-width: 66.66666667%;
    }

    hf-col[span~="sm-9"] {
        max-width: 75%;
    }

    hf-col[span~="sm-10"] {
        max-width: 83.33333333%;
    }

    hf-col[span~="sm-11"] {
        max-width: 91.66666667%;
    }

    hf-col[span~="sm-12"] {
        max-width: 100%;
    }
}
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-col', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-col', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
