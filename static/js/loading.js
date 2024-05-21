const blankPage = document.querySelector('.blank-page');
window.setTimeout(endLoaing, 3000);

function endLoaing() {
    console.log(blankPage);
    blankPage.classList.add('hider');
    blankPage.classList.remove('blank-page');
}