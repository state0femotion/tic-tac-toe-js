/* 
- lines are drawn 
- place 9 divs
- the symbols can only be placed in empty divs 
- When you hover, theres a shadow of the symbol that will be placed 
- When you click, the letter fills in
- switch symbols from X to O
- checking to see if someone won the game 
- checking for cats game 
- letting the winner know 
- restart game option
*/

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)


function startGame(){
    circleTurn = false 
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click' ,handleClick, {once : true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick , {once: true})
})
board.classList.add(X_CLASS)

function handleClick(e) {
    const cell = e.target
    console.log(circleTurn)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    const oppositeClass = !circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass(oppositeClass)
    }

    //placeMark
    //check for win
    //check for draw
    //switch turns
    console.log('clicked')
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass(oppositeClass) {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    board.classList.add(oppositeClass)
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => { 
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
