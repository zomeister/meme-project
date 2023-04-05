const emotions = ["Adventurous", "Angry", "Disgusted", "Happy", "Sad", "Scared", "Sleepy"]
const emotionsList = document.getElementById("emotions-list")

createEmotionsList(emotions)

function createEmotionsList(emotions) {
    emotions.forEach(emotion => {
        const button = document.createElement("button")
        // const image = document.createElement("img")
        // image.src = emotion.imageUrl
        // image.id = emotion.feelingId + "-image"
        button.id = emotion + "-button"
        button.textContent = emotion

        // button.append(image)
        button.classList.add("emotion-option")
        emotionsList.append(button)
        emotionOptionEventListener(button)
    })
}


function emotionOptionEventListener(button) {
    button.addEventListener("click", (event) => {
        memeDiv.textContent =""
        getMemes(button.innerText)
        event.preventDefault()
    })
}

function getMemes(emotion) {
    const emotionUrl = `http:localhost:3000/memes?feelingId=${emotion}`
    fetch(emotionUrl)
    .then(res=>res.json())
    .then(memesData => memesData.forEach(meme => {
        displayMemes(meme)
    }))
}
const memeDiv = document.getElementById("meme-div")

function displayMemes(emotion){

    const img = document.createElement("img")
    img.src = emotion.imageUrl
    memeDiv.appendChild(img)

    const label = document.createElement("label")
    label.textContent = `Likes: ${emotion.likes}`
    memeDiv.appendChild(label)

    const likesBtn = document.createElement("button")
    likesBtn.textContent = " ♥ "
    memeDiv.appendChild(likesBtn)
}