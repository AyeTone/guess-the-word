const guessedLettersElement = document.querySelector (".guessed-letters");
const button = document.querySelector(".guess")
const inputBox = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const attemptsLeftSpan = document.querySelector (".remaining span")
const attemptsLeft = document.querySelector(".remaining")
const playerMessage = document.querySelector(".message")
const resetButton = document.querySelector(".play-again")

let word = "magnolia"
const guessedLetters = []
let remainingGuesses = 8

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await response.text()
    const wordArray = words.split("\n")
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim()
    placeholder(word)
}

getWord ()

const placeholder = function (word) {
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
        guessesLeft (guess)
        showGuessedLetter()
    }
    correctGuess (guessedLetters)
}

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

const showGuessedLetter = function () {
    guessedLettersElement.innerHTML = ""
    for (const letter of guessedLetters) {
        const li = document.createElement("li")
        li.innerText = letter
        guessedLettersElement.append(li)
    }
}

const correctGuess = function (guests) {
    const wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
    const revealWord = []
    for (const letter of wordArray) {
        if (guests.includes(letter)) {
            revealWord.push (letter.toUpperCase())
        } else {
            revealWord.push("●");
        }
        wordInProgress.innerText = revealWord.join("")
    }
    playerWin ()

}


const guessesLeft = function (guess) {
  const wordUpper = word.toUpperCase()
  if (!wordUpper.includes(guess)) {
      playerMessage.innerText = `WRONG! There is no ${guess} in the word.`
      remainingGuesses -= 1
  }  else {
      playerMessage.innerText = `Nice... ${guess} was one. Now get another.`
  }

  if (remainingGuesses === 0) {
      playerMessage.innerHTML = `Whomp WHOooMP. No more guesses. The word was <span class="highlight">${word}</span>.`
  } else if (remainingGuesses === 1) {
      attemptsLeftSpan.innerText = `${remainingGuesses} guess`
  } else {
      attemptsLeftSpan.innerText = `${remainingGuesses} guesses`
  }

}

const playerWin = function () {
    if (word.toUpperCase () === wordInProgress.innerText) {
        playerMessage.classList.add("win")
        playerMessage.innerHTML =  `<p class="highlight"> You guessed the correct word. Congrats!</p>`
    }
}
