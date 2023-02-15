import { createPageMainHeader } from "./header.js";

function init() {
    const pageContent = document.querySelector('#page-content')
    pageContent.before(createPageMainHeader())


}
init()