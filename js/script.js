const guestedLettersElement = document.querySelector (".guessed-letters");
const button = document.querySelector(".guess")
const inputBox = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const attemptsLeftSpan = document.querySelector (".remaining span")
const attemptsLeft = document.querySelector(".remaining")
const playerMessage = document.querySelector(".message")
const resetButton = document.querySelector(".play-again")

const word = "magnolia"
const guessedLetters = []

const updateGenWord = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push ("●")
    }
    wordInProgress.innerText = placeholderLetters.join("")
}

const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/ 
    if (input.length === 0) {
        playerMessage.innerText = "Please enter a letter."
    } else if (input.length > 1) {
        playerMessage.innerText = "Please enter a single letter."
    } else if (!input.match(acceptedLetter)) {
        playerMessage.innerText = "Please enter a letter from A to Z."
    } else {
        return input
    }
}

const makeGuess = function (guess) {
    guess = guess.toUpperCase ()
    if (guessedLetters.includes(guess)) {
        playerMessage.innerText = "You have already guessed this letter. Try Again."
    } else {
        guessedLetters.push (guess)
        console.log(guessedLetters)
    }
}

updateGenWord(word)

button.addEventListener("click", function (e){
    e.preventDefault()
    const guess = inputBox.value
    playerMessage.innerText = ""
    playerInput(guess)
    const validGuess = playerInput(guess)
    if (validGuess) {
        makeGuess(guess)
    }
    inputBox.value = ""
})