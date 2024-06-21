import fs from "fs";
import { join } from "path";
const __dirname = new URL(".", import.meta.url).pathname;

import eAlert from "./app/elements/e/alert.mjs";
import eSeperator from "./app/elements/e/seperator.mjs";
import eMenu from "./app/elements/e/menu.mjs";
import eResponsiveSidebar from "./app/elements/e/responsive-sidebar.mjs";
import eResponsiveHeader from "./app/elements/e/responsive-header.mjs";
import eTheme from "./app/elements/e/theme.mjs";

const mjsElements = {
  "e-alert": eAlert,
  "e-seperator": eSeperator,
  "e-menu": eMenu,
  "e-responsive-sidebar": eResponsiveSidebar,
  "e-responsive-header": eResponsiveHeader,
  "e-theme": eTheme,
};

const htmlFiles = [
  { tag: "e-accordion", path: "app/elements/e/accordion.html" },
  { tag: "e-badge", path: "app/elements/e/badge.html" },
  { tag: "e-button", path: "app/elements/e/button.html" },
  { tag: "e-blockquote", path: "app/elements/e/blockquote.html" },
  { tag: "e-box", path: "app/elements/e/box.html" },
  { tag: "e-breadcrumb", path: "app/elements/e/breadcrumb.html" },
  { tag: "e-code", path: "app/elements/e/code.html" },
  { tag: "e-col", path: "app/elements/e/col.html" },
  { tag: "e-container", path: "app/elements/e/container.html" },
  { tag: "e-details", path: "app/elements/e/details.html" },
  { tag: "e-dialog", path: "app/elements/e/dialog.html" },
  { tag: "e-dot", path: "app/elements/e/dot.html" },
  { tag: "e-input-group", path: "app/elements/e/input-group.html" },
  { tag: "e-keyboard", path: "app/elements/e/keyboard.html" },
  { tag: "e-loader", path: "app/elements/e/loader.html" },
  { tag: "e-row", path: "app/elements/e/row.html" },
  { tag: "e-switch", path: "app/elements/e/switch.html" },
  { tag: "e-table", path: "app/elements/e/table.html" },
  { tag: "e-tabs", path: "app/elements/e/tabs.html" },
  { tag: "e-tag", path: "app/elements/e/tag.html" },
  { tag: "e-list", path: "app/elements/e/list.html" },
  { tag: "e-link", path: "app/elements/e/link.html" },
  { tag: "e-code", path: "app/elements/e/code.html" },

];
// const elementWrapper = (htmlString) =>
//   function ({ html, state }) {
//     return html`${htmlString}`;
//   };
const elementWrapper = (htmlString) =>
  new Function(
    `return function ({ html, state }) { return html\`${htmlString}\`; }`,
  )();

let htmlElements = {};
htmlFiles.map(({ tag, path }) => {
  const htmlString = fs.readFileSync(join(__dirname, path), {
    encoding: "utf8",
  });
  htmlElements[tag] = elementWrapper(htmlString);
});

let elements = {
  ...htmlElements,
  ...mjsElements,
};

const eAccordion = htmlElements["e-accordion"];
const eBadge = htmlElements["e-badge"];
const eBlockquote = htmlElements["e-blockquote"];
const eBox = htmlElements["e-box"];
const eBreadcrumb = htmlElements["e-breadcrumb"];
const eButton = htmlElements["e-button"];
const eCode = htmlElements["e-code"];
const eCol = htmlElements["e-col"];
const eContainer = htmlElements["e-container"];
const eDetails = htmlElements["e-details"];
const eDialog = htmlElements["e-dialog"];
const eDot = htmlElements["e-dot"];
const eInputgroup = htmlElements["e-input-group"];
const eKeyboard = htmlElements["e-keyboard"];
const eLoader = htmlElements["e-loader"];
const eRow = htmlElements["e-row"];
const eSwitch = htmlElements["e-switch"];
const eTable = htmlElements["e-table"];
const eTabs = htmlElements["e-tabs"];
const eTag = htmlElements["e-tag"];
const eList = htmlElements["e-list"];
const eLink = htmlElements["e-link"];


export default elements;

export {
  eAlert,
  eButton,
  eCode,
  eLink,
  eSeperator,
  eSwitch,
  eAccordion,
  eBadge,
  eBlockquote,
  eBox,
  eBreadcrumb,
  eCol,
  eContainer,
  eDetails,
  eDialog,
  eDot,
  eInputgroup,
  eKeyboard,
  eLoader,
  eList,
  eMenu,
  eResponsiveHeader,
  eResponsiveSidebar,
  eRow,
  eTable,
  eTabs,
  eTag,

  eTheme,
};
