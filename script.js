import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard = document.getElementById("grid")
const grid = new Grid(gameBoard)

grid.randomOpenCell().tile = new Tile(gameBoard)
grid.randomOpenCell().tile = new Tile(gameBoard)

function setupInput() {
    window.addEventListener("keydown", handleInput, {once: true})
}

function handleInput(event) {
    switch (event.key) {
        case "ArrowUp":
            moveUp()
        case "ArrowDown":
            moveDown()
        case "ArrowLeft":
            moveLeft()
        case "ArrowRight":
            moveRight()
        default: 
            setupInput() // can except user input.
            return
    }
}

function moveUp() {

}