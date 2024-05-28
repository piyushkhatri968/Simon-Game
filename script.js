let para = document.querySelector("p")
let high_score = document.querySelector("b")
let btns = ["green", "red", "orange", "yellow"]
let start_btn = document.querySelector("#start_btn")

let gameSeq = []
let userSeq = []

let started = false
let level = 0
let highScore = 0;

//2. as the game start then it will run
const levelUp = () => {
    userSeq = []
    level++;
    para.innerText = `Level: ${level}`

    let randomIdx = Math.floor(Math.random() * 4)
    let randomColor = btns[randomIdx]
    let randombtn = document.querySelector(`.${randomColor}`)
    gameSeq.push(randomColor)
    console.log(gameSeq)
    btnFlash(randombtn)
}

//3. it will flash the button upon click
const btnFlash = (randombtn) => {
    randombtn.classList.add("flash")
    setTimeout(() => {
        randombtn.classList.remove("flash")
    }, 200);
}

// start game function
const start_game = () => {
    start_btn.classList.add("hidden")
    started = true
    levelUp()

}

// to start the game on START button

start_btn.addEventListener("click", () => {
    if (!started) {
        start_game()
    }
})

const buttonPress = (event) => {
    let btn = event.target;
    btnFlash(btn)
    userSeq.push(btn.classList[0])
    console.log(userSeq)
    checkSeq(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn")
for (btn of allbtns) {
    btn.addEventListener("click", buttonPress)
}

const checkSeq = (idx) => {
    //idx will target the top value
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000)
        }
    }
    else {
        reset()
    }
}

// will reset the game
const reset = () => {
    document.body.style.backgroundColor = "red"
    setTimeout(() => {
        document.body.style.backgroundColor = "white"
    }, 200);

    if (level > highScore) {
        highScore = level
    }

    start_btn.classList.remove("hidden")

    para.innerHTML = `Game Over! Your score was <b>${level}</b> start again`

    high_score.innerHTML = `${highScore}`
    started = false
    level = 0
    gameSeq = []
    userSeq = []


}