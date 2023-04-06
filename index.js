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
}


function emotionOptionEventListener(button) {
    button.addEventListener("click", (event) => {
        memeDiv.style.display = "block"
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

    const img = document.createElement("img")
    img.style.width = "300px"
    img.style.height = "350px"
    const label = document.createElement("label")

    const likesBtn = document.createElement("button")
    likesBtn.textContent = "💓"
    const dislikeBtn = document.createElement("button")
    dislikeBtn.textContent = "💔"

    const nextBtn = document.createElement('button')
    nextBtn.id = "next-button"
    nextBtn.textContent = "NEXT"

    const previousBtn = document.createElement("button")
    nextBtn.id = "previous-button"
    previousBtn.textContent = "Previous"

    img.src = emotion[0].imageUrl
    memeDiv.appendChild(img)
    memeDiv.appendChild(previousBtn)

    label.textContent = `Likes: ${emotion[0].likes}`
    memeDiv.appendChild(label)

    memeDiv.appendChild(likesBtn)
    memeDiv.appendChild(dislikeBtn)
    memeDiv.appendChild(nextBtn)

    let i = 0

    nextBtn.addEventListener("click", ()=>{
        if(emotion.length - 1 > i){
            i++
            img.src = emotion[i].imageUrl
            label.textContent = `Likes: ${emotion[i].likes}`
        }
    })

    previousBtn.addEventListener("click", ()=>{
        if(i > 0){
            i--
            img.src = emotion[i].imageUrl
            label.textContent = `Likes: ${emotion[i].likes}`
        }
    })

    dislikeBtn.addEventListener('click', () => {
        if(emotion[i].likes > 0){
            decreaseMemeLikes(emotion[i], label)
        }
    })

    likesBtn.addEventListener('click', () => increaseMemeLikes(emotion[i], label))
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
    .then(r=>r.json())
    .then(data => getMemes(data))
}

const selectChoice = document.getElementById("select-choice")
const imgUrl = document.getElementById("img-url")

function formEventListener(){
    formDiv.addEventListener("submit", (e)=>{
        e.preventDefault()
        addNewMemes(selectChoice.value,imgUrl.value)
        memeDiv.style.display = "none"
        formDiv.reset()
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