function fetchMemes() {
    fetch ('http://localhost:3000/memes')
    .then (res => res.json())
    .then (console.log)
}

fetchMemes();

// function renderMeme(emotion) {
//     return
// }

// function getMeme(emotion) {
//     return
// }

// function addLike() {
//     return
// }

// function removeLike() {
//     return
// }

