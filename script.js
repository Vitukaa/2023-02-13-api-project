import { createPageMainHeader } from "./header.js";

function init() {
    const pageContent = document.querySelector('#page-content')
    const pageContentWrapper = document.querySelector('.page-content-wrapper')
    pageContentWrapper.before(createPageMainHeader())


}
init()