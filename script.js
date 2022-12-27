const $snake = document.getElementById('snake')
const game = document.getElementById('game')
const snake = []
const start = document.getElementById('start')
const gameFocus =  document.getElementById('gameFocus') 
var amountX
var amountY
var gameSpeed
var richting = ''

// Interval constructor function
function Interval() {
    var running = false;
    this.start = function () {
        if (!this.isRunning())
            running = setInterval(moveSnake, 25+(10-gameSpeed)*75/9);
    };
    this.stop = function () {
        clearInterval(running);
        running = false;
    };
    this.isRunning = function () {
        return running !== false;
    };
}

// construct timer
timer = new Interval()


// createGame function
function createGame(){
    createScreen()
    createBorder()
    createSnake()
    setGoal()
    $snake.classList.add('hideCursor')
    pointValue=calculatePointValue(1)
    scoreMirror()
    scoreElem.style.display = 'initial'
}

function findUnit(){
    if (window.innerHeight > window.innerWidth) {
        return 'vw'
    } else {
        return 'vh'
    }
}

function createScreen() {
    for (let x=0; x < amountX; x++){
        for (let y=0; y < amountY; y++) {
            let pix = document.createElement('pix')
            pix.setAttribute('xy', `${x} ${y}`)
            pix.setAttribute('style', `left: ${80/amountX*x}${findUnit()}; top: ${80/amountY*y}${findUnit()}; width: ${80/amountX}${findUnit()}; height: ${80/amountY}${findUnit()};`)
            game.appendChild(pix)
        }
    }
    $snake.style.width = `80${findUnit()}`
    $snake.style.height = `80${findUnit()}`
}

function createBorder() {
    for (let x=0; x < amountX; x++){
        for (let y=0; y < amountY; y++) {
            if (y==0 || y==amountY-1 || x==0 || x==amountX-1){
                let coord = [x, y]
                select(coord).style.backgroundColor = 'white'
            }
        }
    }
}

function createSnake() {
    let startPosition = randomSpawn()
    snake.push(startPosition)
    select(snake[0]).style.backgroundColor = 'white'
}

function setGoal() {
    let goal = randomSpawn()
    if (select(goal).style.backgroundColor == 'white') {
        setGoal()
    } else {
        select(goal).style.backgroundColor = 'green'
    }
}

function select(coord){
    return document.querySelector(`[xy="${coord[0]} ${coord[1]}"]`)
}

function randomSpawn(){
    let x = Math.round(1+((amountX-3)*Math.random()))
    let y = Math.round(1+((amountY-3)*Math.random()))
    return [x, y]
}

// --- moveSnake function ---
let i=0
function moveSnake(){
    console.log(i)
    i++
    if (richting == 'left') {
        snake.push([snake[snake.length-1][0]-1, snake[snake.length-1][1]])
    } else if (richting == 'right') {
        snake.push([snake[snake.length-1][0]+1, snake[snake.length-1][1]])
    } else if (richting == 'up') {
        snake.push([snake[snake.length-1][0], snake[snake.length-1][1]-1])
    } else if (richting == 'down') {
        snake.push([snake[snake.length-1][0], snake[snake.length-1][1]+1])
    }
    if (select(snake[snake.length-1]).style.backgroundColor == 'white') {
        timer.stop()
        died()
        scoreElem.style.display = 'none'
        return console.log('stopped')
    }
    if (select(snake[snake.length-1]).style.backgroundColor == 'green') {
        setGoal()
        updateScore()
    } else {
        select(snake[0]).style.backgroundColor='initial'
        snake.splice(0, 1)
    }
    select(snake[snake.length-1]).style.backgroundColor='white'
}
// --- /moveSnake function ---

// --- --- $snake eventListeners --- ---
$snake.addEventListener('keydown', (e) => {
    if (startButton.style.display === 'none' && richting == '') {
        if (e.code === 'ArrowLeft'||e.code === 'ArrowRight'||e.code === 'ArrowUp'||e.code === 'ArrowDown') {
            timer.start()
            start.style.display = 'none'
        }
    }
    if (timer.isRunning()){
        if (e.code === 'ArrowLeft') {
            if (richting != 'right'){
                richting = 'left'
            }
        } else if (e.code === 'ArrowRight') {
            if (richting!= 'left'){
                richting = 'right'
            }
        } else if (e.code === 'ArrowUp') {
            if (richting != 'down'){
                richting = 'up'
            }
        } else if (e.code === 'ArrowDown') {
            if (richting != 'up'){
                richting = 'down'
            }
        }
    } 
    if (e.code === 'Escape') { // quitGame
        if (dead.style.display==='initial'){
            quitToMenu()
        } else if (checkQuit.style.display === 'initial'){
            cancel()
        } else {
            controlBox()
        }
    } else if (e.code === 'Enter' || e.code === 'KeyN') { // restart game when dead
        if (dead.style.display==='initial') {
            newGame()
        }
    } else if (e.code === 'KeyM'){
        if (dead.style.display==='initial') {
            quitToMenu()
        }
    }
})

// --- gameFocus ---
$snake.addEventListener('focusout', (e) => {
    if (timer.isRunning()) {
        gameFocus.style.display = 'initial'
        timer.stop()
    }
    if (start.style.display === 'initial') {
        start.style.opacity = '0%'
        gameFocus.style.display = 'initial'
    }
    $snake.classList.remove('hideCursor')
})

$snake.addEventListener('focusin', (e) => {
    if (gameFocus.style.display === 'initial'){
        if (start.style.display === 'none'){
            timer.start()
        } else {
            start.style.opacity = 'initial' 
        }
        gameFocus.style.display = 'none'  
        $snake.classList.add('hideCursor')
    }
})
// --- /gameFocus ---
// --- --- /$snake eventListener --- ---

// -------------- CHAPTER TWO --- Menu --------------------------------------------- //

const feedback = document.getElementById('feedback')
const size = document.getElementById('size')
const settings = document.getElementById('settings')
const quit = document.getElementById('return')
const checkQuit = document.getElementById('checkQuit')
const speed = document.getElementById('speed')
const speedBack = document.getElementById('speedBack')
const input = document.querySelectorAll('input')
const startButton = document.querySelector('#settings button')
const dead = document.getElementById('dead')
const restart = document.getElementById('restart')
const deadReturn = document.getElementById('deadReturn')
const current = document.getElementById('current')
const next = document.getElementById('next')
const scoreElem = document.getElementById('score')
const endScore = document.getElementById('endScore')
const endLength = document.getElementById('endLength')
var pointValue
var score = 0

// --- score ---
function landfillMultipier(x=1){
    let landFill = 99/(amountX*amountY-(amountX*2+amountY*2-4))*x+1
    return Math.pow(landFill, 1.1)+Math.pow(landFill, (landFill*0.02))-1
}

function snakelengthMultiplier(x){
    return Math.pow(x, 1.1)+Math.pow(x, (x*0.0025))-1
}

function smallMapMultiplier(x){
    return 9/Math.pow(x, (x*(1/133)))+1
}

function speedMuiltiplier(x){
    return 1+19/9*(x-1)
}

function calculatePointValue(x){
    return Math.round(landfillMultipier(x)*snakelengthMultiplier(x)*speedMuiltiplier(gameSpeed)*smallMapMultiplier(amountX))
}

function updateScore(){
    let x = snake.length
    score += pointValue
    pointValue = calculatePointValue(snake.length)
    scoreMirror()
}

function scoreMirror(){
    current.innerHTML=score
    next.innerHTML=pointValue
}
// --- /score ---

feedback.innerHTML=`${size.value} x ${size.value}`
speedBack.innerHTML=speed.value

size.addEventListener('change', (e) => {
    feedback.innerHTML=`${size.value} x ${size.value}`
})

speed.addEventListener('change', (e) => {
    speedBack.innerHTML=speed.value
})

// quitToMenu function
function quitToMenu() {
    quitGame()
    returnToMenu()
    checkQuit.style.display = 'none'
    dead.style.display='none'
}

// start button
settings.addEventListener('submit', (e) => {
    e.preventDefault()
    amountX = size.value
    amountY = size.value
    gameSpeed = speed.value
    createGame()
    let hideStuff = (function() {
        settings.classList.add('pos1')
        input.forEach((e) =>{
            e.style.display = 'none'
        })
        startButton.style.display = 'none'
    })()
    start.style.display = 'initial'
    quit.style.display = 'initial'
    $snake.focus()
})

// --- controlBox ---

// cancel function
function cancel() {
    timer.start()
    checkQuit.style.display = 'none'
    $snake.focus()
    $snake.classList.add('hideCursor')
}
function controlBox(){
    if (richting == '') {
        quitToMenu()
    } else {
        timer.stop()
        checkQuit.style.display = 'initial'
        checkQuit.focus()
        checkQuit.addEventListener('keypress', (e) => {
            if (e.code === 'KeyY' || e.code === 'Enter') {
                quitToMenu()
            } else if (e.code === 'KeyN') {
                cancel()
            }
        })
        document.getElementById('yesQuit').addEventListener('click', () => {
            quitToMenu()
        })
        document.getElementById('noQuit').addEventListener('click', () => {
            cancel()
        })
    }
}
// --- /controlBox ---

// quitGame function
function quitGame() {
    document.querySelectorAll('[xy]').forEach((e) => {
        e.remove()
    })
    snake.splice(0, snake.length)
    richting = ''
    score = 0
}

// returnToMenu function
function returnToMenu(){
    settings.style.display = 'block'
    quit.style.display = 'none'
    start.style.display = 'none'
    scoreElem.style.display = 'none'
    $snake.classList.remove('hideCursor')
    let unHideStuff = (function() {
        settings.classList.remove('pos1')
        input.forEach((e) =>{
            e.style.display = 'initial'
        })
        startButton.style.display = 'initial'
    })()
    startButton.focus()
}

quit.addEventListener('click', controlBox)

// you Died!
function died() {
    dead.style.display='initial'
    $snake.classList.remove('hideCursor')
    endScore.innerHTML = score
    endLength.innerHTML = snake.length
}

// newGame function
function newGame(){
    quitGame()
    createGame()
    start.style.display = 'initial'
    dead.style.display='none'
    $snake.focus()
}
restart.addEventListener('click', newGame)

// deadReturn button listener
deadReturn.addEventListener('click', quitToMenu)
