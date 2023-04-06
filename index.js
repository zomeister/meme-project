const emotions = ["Adventurous", "Angry", "Disgusted", "Happy", "Sad", "Scared", "Sleepy"]
const emotionsList = document.getElementById("emotions-list")
const formDiv = document.getElementById("form-div")
const baseUrl = 'http://localhost:3000/'
const memesUrl = baseUrl + 'memes/'

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
}


function emotionOptionEventListener(button) {
    button.addEventListener("click", (event) => {
        memeDiv.style.display = "block";
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
const img = document.getElementById("meme-image")
const label = document.getElementById("likes-label")
const likesBtn = document.getElementById("likes-btn")
const dislikeBtn = document.getElementById("dislike-btn")
const nextBtn = document.getElementById("next-btn")
const previousBtn = document.getElementById("previous-btn")


function displayMemes(emotion){

    let arr = []

    emotion.forEach(meme => {
/*<<<<<<< db2
        arr.push(meme)
    })

    img.src = arr[0].imageUrl

    label.textContent = `Likes: ${arr[0].likes}`

    let i = 0

    nextBtn.addEventListener("click", ()=>{
        if(arr.length - 1 > i){
            i++
            console.log(i)
            img.src = arr[i].imageUrl
            label.textContent = `Likes: ${arr[i].likes}`
        }
    })

    previousBtn.addEventListener("click", ()=>{
        if(i > 0){
            i--
            console.log(i)
            img.src = arr[i].imageUrl
            label.textContent = `Likes: ${arr[i].likes}`
        }
======= */
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

    dislikeBtn.addEventListener('click', () => {
        if(arr[i].likes > 0){
            decreaseMemeLikes(arr[i], label)
        }
    })

}

function addNewMemes(choice, imageUrl){
    fetch(memesUrl, {
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
}

const selectChoice = document.getElementById("select-choice")
const imgUrl = document.getElementById("img-url")

function formEventListener(){
    formDiv.addEventListener("submit", (e)=>{
        e.preventDefault()
        addNewMemes(selectChoice.value,imgUrl.value)
        formDiv.reset()
    })
}

function decreaseMemeLikes(meme, label) {

    fetch(memesUrl + `${meme.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify({likes: meme.likes -= 1})
        })
    .then(res => res.json())
    .then(patchedMemeData => {
        label.textContent = `Likes: ${meme.likes}`
    })
}

formEventListener()


