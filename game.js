const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'You are in a cabin and it is pitch black. You have one match on you. Which do you light first, the newspaper, the lamp, the candle, or the fire?',
        choice1: 'candle',
        choice2: 'fire',
        choice3: 'newspaper',
        choice4: 'match',
        answer: 4,

    },
    {
        question: 'Mike is a butcher. He is 5’10” tall. What does he weigh?',
        choice1: '200 lbs.',
        choice2: 'Dumbells',
        choice3: 'Meat',
        choice4: '62.5 kg',
        answer: 3,

    },
    {
        question: 'A farmer has 17 sheep and all but nine died. How many are left?',
        choice1: '9',
        choice2: 'None',
        choice3: '17',
        choice4: '8',
        answer: 1,

    },
    {
        question: 'In a year, there are 12 months. Seven months have 31 days. How many months have 28 days?',
        choice1: '1',
        choice2: 'None',
        choice3: '12',
        choice4: '6',
        answer: 3,

    },

    {
        question: 'This belongs to you, but everyone else uses it more.',
        choice1: 'Your Name',
        choice2: 'Your Money',
        choice3: 'Your Skills',
        choice4: 'Your House',
        answer: 1,

    },

    {
        question: 'What is full of holes but can still hold water?',
        choice1: 'The Earth',
        choice2: 'Sponge',
        choice3: 'A Watering Can',
        choice4: 'A human',
        answer: 2,

    },

    {
        question: 'Give me food, and I will live; give me water, and I will die. What am I?',
        choice1: 'A baby',
        choice2: 'Fire',
        choice3: 'Demon',
        choice4: 'A Dog',
        answer: 2,

    },

    {
        question: 'What can you hold without ever touching or using your hands?',
        choice1: 'Nothing',
        choice2: 'Air',
        choice3: 'Breath',
        choice4: 'Title',
        answer: 3,

    },

    {
        question: 'When you have me, you immediately feel like sharing me. But, if you do share me, you do not have me.',
        choice1: 'Money',
        choice2: 'Name',
        choice3: 'Secret',
        choice4: 'Knowledge',
        answer: 3,

    },

    {
        question: 'A man is looking at a photograph of someone. His friend asks who it is. The man replies, “Brothers and sisters, I have none. But that man’s father is my father’s son.” Who was in the photograph?',
        choice1: 'His Son',
        choice2: 'His Father',
        choice3: 'Himself',
        choice4: 'His Grandfather',
        answer: 1,

    },

    {
        question: 'When young, I am sweet in the sun.When middle-aged, I make you gay.When old, I am valued more than ever.',
        choice1: 'A Human',
        choice2: 'Wine',
        choice3: 'Fruits',
        choice4: 'Money',
        answer: 2,

    },

    {
        question: 'What has a mouth, but cannot eat; moves, but has no legs; and has a bank, but cannot put money in it?',
        choice1: 'Worms',
        choice2: 'Rivers',
        choice3: 'Bacteria',
        choice4: 'Air',
        answer: 2,

    },

    {
        question: 'What 5-letter word becomes shorter when you add two letters to it?',
        choice1: 'Small',
        choice2: 'Queue',
        choice3: 'Lines',
        choice4: 'Short',
        answer: 4,

    },

    {
        question: 'What is black when you get it, red when you use it, and white when you are all through with it?',
        choice1: 'Charcoal',
        choice2: 'Blood',
        choice3: 'Fire',
        choice4: 'Pencil',
        answer: 1,

    },

    {
        question: 'I have no eyes, no legs, or ears, and I help move the earth. What am I?',
        choice1: 'Gravity',
        choice2: 'Earthworm',
        choice3: 'Snake',
        choice4: 'Slug',
        answer: 2,

    },

    {
        question: 'What flies without wings?',
        choice1: 'Kite',
        choice2: 'Planes',
        choice3: 'Time',
        choice4: 'Humans',
        answer: 3,

    },

    {
        question: 'The more it dries, the wetter it gets. What is it?',
        choice1: 'Sponge',
        choice2: 'Beach',
        choice3: 'Towel',
        choice4: 'Rice',
        answer: 3,

    },

    {
        question: 'What can travel around the world while staying in a corner?',
        choice1: 'Courier',
        choice2: 'Stamp',
        choice3: 'Airplane',
        choice4: 'Map',
        answer: 2,

    },

    {
        question: 'Where will you find roads without vehicles, forests without trees, and cities without houses?',
        choice1: 'Map',
        choice2: 'Apocalypse',
        choice3: 'Other Planets',
        choice4: 'Google',
        answer: 1,

    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = ()=> {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
         'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
