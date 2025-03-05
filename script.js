import Grid from "./Grid.js"

const gameBoard = document.getElementById("grid")
console.log(gameBoard)
const grid = new Grid(gameBoard)

console.log(grid.randomOpenCell())
grid.randomOpenCell().tile = new Tile(gameBoard)
grid.randomOpenCell().tile = new Tile(gameBoard)