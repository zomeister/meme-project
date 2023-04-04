const baseUrl = "http://localhost:3000/"
const feelingsUrl = baseUrl + "feelings/"

function fetchFeelings() {
    fetch(feelingsUrl)
    .then(res => res.json())
    .then(feelingsData => renderAllFeelings(feelingsData))
}

fetchFeelings();

function renderAllFeelings(feelingsData) {
    feelingsData.forEach(feeling => renderFeeling(feeling))
}


function renderFeeling(feeling) {
    
    const emotionlistNav = document.getElementById('emotions-list')
    const emotionButton = document.createElement('button')
    emotionlistNav.appendChild(emotionButton)

    emotionButton.id = feeling.id
    emotionButton.className = "hover-div"
    emotionButton.textContent = feeling.name
    // emotionButton.innerHTML = `<img src=${feeling.emoji}>`

    emotionButton.addEventListener('click', (e) => displayMemesByFeeling (feeling))
}

function displayMemesByFeeling(feeling) {
    
    const memeImages = document.getElementsByClassName('meme-images')
    const memeLikes = document.getElementsByClassName("control-label")

    let i = 0
    
    for (let meme of memeImages) {
        meme.src = feeling.memes[i++].imageUrl
    }

    i = 0

    for (let label of memeLikes) {
        label.textContent = feeling.memes[i++].likes + " Likes"
    }

    const likeButtons = document.getElementsByClassName('btn')

    for (const btn of likeButtons) {
        btn.value = "♥"
    }
}