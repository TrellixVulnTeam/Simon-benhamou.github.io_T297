function spinnerPageStart() {
    const div = document.getElementById("spinner-page")
    div.classList.add("spinner-page")
    div.innerHTML +='<div class="spinner-grow text-primary"></div>'
}
function spinnerPageEnd() {
    const div = document.getElementById("spinner-page")
    div.classList.remove("spinner-page")
    div.firstChild.remove();
}