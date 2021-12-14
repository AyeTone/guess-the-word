const guestedLetters = document.querySelector (".guessed-letters");
const button = document.querySelector(".guess")
const inputBox = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const attemptsLeftSpan = document.querySelector (".remaining span")
const attemptsLeft = document.querySelector(".remaining")
const playerMessage = document.querySelector(".message")
const resetButton = document.querySelector(".play-again")

const word = "magnolia"

const updateGenWord = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push ("●")
    }
    wordInProgress.innerText = placeholderLetters.join("")
}

updateGenWord(word)

button.addEventListener("click", function (e){
    e.preventDefault()
    const guess = inputBox.value
    console.log(guess)
})