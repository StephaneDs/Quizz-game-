let questionQuizz = [
  {
    question: "Which country has for capital Suva",
    options: ["Vanuatu", "Fidji", "Tonga", "Papua New Guinea"],
    answer: 1,
  },
  {
    question: "Which European country has 158 verses to its national anthem?",
    options: ["Uzbekistan", "Mexico", "Madrid", "Greece"],
    answer: 3,
  },
  {
    question:
      "If you dug a hole through the center of the earth starting from Spain, which country would you end up in?",
    options: ["New-Zealand", "South-Africa", "India", "Perou", "Panama"],
    answer: 0,
  },
  {
    question: "Which information is true about a senior web dev",
    options: [
      "He can code without touching the keyboard",
      "can't go to bed before watching the meteo",
      " can bond with his laptop",
      "spend time debuging the mess of junior web dev",
    ],
    answer: 3,
  },
  {
    question:
      "what year was realesed the first javaScript, and what was the original name",
    options: ["1994-Panadol", "1995-Mocha", "1997- Swile", "1993-Netscape"],
    answer: 3,
  },

  {
    question: "who played Charlie in Charlie and the Chocolate Factory",
    options: ["Oliver Stone", "Tim Burton", "johny Dep", "Freddie Highmore"],
    answer: 3,
  },
  {
    question: "What is unique about a whale's heart",
    options: [
      "the color blue",
      "can slow down to just 2 beats per minute",
      "pumping 50l per minute",
      "go higher than 100 beats per minute",
    ],
    answer: 1,
  },
  {
    question: "Who cracked the enigma code",
    options: ["Arthur Scherbius", "Alan Turing", "Churchill", "Elon Musk"],
    answer: 1,
  },
  {
    question: "Every node in the DOM represents what?",
    options: ["a link", "a section", "a view", "html element"],
    answer: 3,
  },
  {
    question: "What method allows us to add an attribute to a DOM element?",
    options: [
      "element.getAttribute()",
      "element.createAttribute()",
      "element.setAttribute()",
      "element.makeAttribute()",
    ],
    answer: 2,
  },
]
const answerContainer = document.querySelector(".flex-container")
let backgroundElement = document.querySelector(".background")
let restartButton = document.querySelector("#finish-button")
let gameElement = document.querySelector("#game")
let question = document.querySelector("#question")
let startScreen = document.querySelector("#start-screen")
let startButton = document.querySelector(".start-button")
let possibleAnswers = document.querySelectorAll(".choice-text")
const choices = document.querySelectorAll(".choice-container")
const popup = document.querySelector(".popup")
let qNumber = 0
let points = 0
const progressBar = document.getElementById("progressBar")
let scoreDisplaySpan = document.querySelector("#score-container span")
let pictureEndQuiz = null
let scoreMessage = [
  {
    title: "Are you lost?",
    image: "https://c.tenor.com/5R1whvx7pOkAAAAC/lost-johntravolta.gif",
  },

  {
    title: "You are almost there!",
    image:
      "https://c.tenor.com/rHoMGmD3jhMAAAAC/leonardo-dicaprio-leo-dicaprio.gif",
  },
  {
    title: "impressive, you must be a web dev...",
    image: "https://media0.giphy.com/media/wACPZdg6nX52o/giphy.gif",
  },
]
let finalResult = 0

function displayFinalResult() {
  let message = ""
  if (points >= 16) {
    message = scoreMessage[2]
  } else if (points < 15 && points >= 5) {
    message = scoreMessage[1]
  } else {
    message = scoreMessage[0]
  }

  return message
  // display the message in textContent of some element

  // show matching gif
}
function resetFunction() {
  qNumber++
  showCurrentQuestion()
  //   points = 0
  popup.classList.add("hidden")
  popup.innerHTML = ""
  progressBar.value = 15
  createInterval()
}

let progressBarInterval = null

function createInterval() {
  if (progressBarInterval) {
    clearInterval(progressBarInterval)
  }

  let timeleft = 60
  progressBarInterval = setInterval(function () {
    progressBar.value = Number(progressBar.value) - 1
    if (timeleft <= 0 || progressBar.value == 0) {
      clearInterval(progressBarInterval)
      //   displayPopup()
      //alert("time's up")
      setTimeout(() => {
        resetFunction()
      }, 1000)
    }
    timeleft -= 1
  }, 2000)
}

function displayPopup() {
  // stop the progress b
  clearInterval(progressBarInterval)
  // hidding answers section at the end of the quiz
  answerContainer.classList.add("hidden")

  const displayedMessage = displayFinalResult()

  // add a title
  const h2 = popup.querySelector("h2")
  h2.textContent = displayedMessage.title
  // add an image
  const imgGiff = popup.querySelector("img")
  imgGiff.src = displayedMessage.image
  // add score
  const displayScore = popup.querySelector("p")
  displayScore.textContent = `your score is ${points}`

  // show pop up
  popup.classList.remove("hidden")
}

function showCurrentQuestion() {
  if (qNumber >= questionQuizz.length) {
    // we have reached the end of the questions
    displayPopup()
    return
  }
  progressBar.value = 15
  question.textContent = questionQuizz[qNumber].question
  possibleAnswers.forEach((element, index) => {
    element.textContent = questionQuizz[qNumber].options[index]
  })
}

choices.forEach((el) => {
  el.addEventListener("click", clickButton)
})

function clickButton(event) {
  const clickedElement = event.target

  // the event target might be the container or the paragraph for the answer
  // or the paragraph for the letter, so we need some more logic
  let choiceContainer
  if (clickedElement.classList.contains("choice-container")) {
    choiceContainer = clickedElement
  } else {
    choiceContainer = clickedElement.parentElement
  }

  const userClickedAnswer =
    choiceContainer.querySelector(".choice-text").textContent
  console.log(userClickedAnswer, "user clicked")
  const currentQuestion = questionQuizz[qNumber]
  const answer = currentQuestion.options[currentQuestion.answer]
  console.log(answer, "is answer")

  let color
  if (userClickedAnswer === answer) {
    // if userClicked and answer match, then user gets a  point
    color = "green"
    points += 2
    scoreDisplaySpan.textContent = points
  } else {
    // else they don't get the point
    color = "red"
    console.log("you are wrong")
  }

  choiceContainer.classList.add(color)
  setTimeout(() => {
    choiceContainer.classList.remove(color)
  }, 200)

  qNumber += 1
  setTimeout(showCurrentQuestion, 200)
  // either way, go to next question
  //   if (qNumber < questionQuizz.length) {
  //   } else {
  //   }
}
function startGame() {
  startScreen.classList.add("hidden")
  gameElement.classList.remove("hidden")

  backgroundElement.classList.remove("initialBackground")
  backgroundElement.classList.add("questionsBackground")

  answerContainer.classList.remove("hidden")

  createInterval()
  showCurrentQuestion()
}

function resetToStartScreen() {
  startScreen.classList.remove("hidden")
  gameElement.classList.add("hidden")
  popup.classList.add("hidden")
  backgroundElement.classList.remove("questionsBackground")
  backgroundElement.classList.add("initialBackground")
}

// start game when clicking the start button
startButton.addEventListener("click", startGame)
restartButton.addEventListener("click", () => {
  resetToStartScreen()
  qNumber = 0
  points = 0
  scoreDisplaySpan.textContent = points
})
