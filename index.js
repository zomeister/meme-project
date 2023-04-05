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
    const label = document.createElement("label")

    const likesBtn = document.createElement("button")
    likesBtn.textContent = "💓"
    const dislikeBtn = document.createElement("button")
    dislikeBtn.textContent = "💔"


    let arr = []

    emotion.forEach(meme => {
        arr.push(meme)
    })

//creating next and previous buttons

    const nextBtn = document.createElement('button')
    nextBtn.id = "next-button"
    nextBtn.textContent = "NEXT"

    const previousBtn = document.createElement("button")
    nextBtn.id = "previous-button"
    previousBtn.textContent = "Previous"


 //placeholder image after clicking on button
    img.src = arr[0].imageUrl
    memeDiv.appendChild(img)
    memeDiv.appendChild(previousBtn)

    label.textContent = `Likes: ${arr[0].likes}`
    memeDiv.appendChild(label)
    
    memeDiv.appendChild(likesBtn)
    memeDiv.appendChild(dislikeBtn)
    memeDiv.appendChild(nextBtn)

//next button
    let i = 0

    nextBtn.addEventListener("click", ()=>{
        i++
        img.src = arr[i].imageUrl
        label.textContent = `Likes: ${arr[i].likes}`
    })

    previousBtn.addEventListener("click", ()=>{
        i--
        img.src = arr[i].imageUrl
        label.textContent = `Likes: ${arr[i].likes}`
    })

    console.log(arr[i])

    dislikeBtn.addEventListener('click', () => decreaseMemeLikes(arr[i], label))

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
    .then(res => res.json())
    .then(data => getMemes(data))
}

function formEventListener(){
    formDiv.addEventListener("submit", (e)=>{
        const selectChoice = document.getElementById("select-choice").value
        const imgUrl = document.getElementById("img-url").value
        memeDiv.textContent =""
        e.preventDefault()
        addNewMemes(selectChoice,imgUrl)
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


