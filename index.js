const emotions = ["Adventurous", "Angry", "Disgusted", "Happy", "Sad", "Scared", "Sleepy"]
const emotionsList = document.getElementById("emotions-list")
const formDiv = document.getElementById("form-div")

const baseUrl = 'http://localhost:3000/'
const memesUrl = baseUrl + 'memes/'

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
    formEventListener(emotions)
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
    .then(memesData => {
        displayMemes(memesData)
    })
}
const memeDiv = document.getElementById("meme-div")

function displayMemes(emotion){

    emotion.forEach(meme => {
        const img = document.createElement("img")
        img.src = meme.imageUrl
        memeDiv.appendChild(img)
    
        const label = document.createElement("label")
        label.textContent = `Likes: ${meme.likes}`
        memeDiv.appendChild(label)
    
        const likesBtn = document.createElement("button")
        likesBtn.textContent = " ♥ "
        memeDiv.appendChild(likesBtn)

        likesBtn.addEventListener('click', () => increaseMemeLikes(meme, label))
    })
}

function increaseMemeLikes(meme, label) {
    //console.log(toy)

    fetch(memesUrl + `${meme.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({likes: meme.likes += 1})
        })
    .then(res => res.json())
    .then(patchedMemeData => {
        label.textContent = `Likes: ${meme.likes}`
    })
}

function addNewMemes(emotion,choice, imageUrl){
    fetch("http:localhost:3000/memes", {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            "feelingId": choice,
            "imageUrl": imageUrl,
            "likes": 0
        })
    })
    .then(res => res.json())
    .then(data => getMemes(data))
}

function formEventListener(emotion){
    formDiv.addEventListener("submit", (e)=>{
        const selectChoice = document.getElementById("select-choice").value
        const imgUrl = document.getElementById("img-url").value
        e.preventDefault()
        addNewMemes(emotion,selectChoice,imgUrl)
        formDiv.reset()
    })
}
