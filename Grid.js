const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 2

export default class Grid {
    #cells

    constructor(gridElement) {
        gridElement.style.setProperty("--size", GRID_SIZE)
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
        gridElement.style.setProperty("--grid-gap", `${CELL_GAP}vmin`)
        this.#cells = makeCells(gridElement).map((cellElement, index) => { 
            const x  = index % GRID_SIZE
            const y = Math.floor(index / GRID_SIZE)
            return new Cell(cellElement, x, y)
        })
    }

    get cells() {
        return this.#cells
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x]= cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
        }, [])
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell
            return cellGrid
        }, [])
    }

    get #openCells() {
        return this.#cells.filter(cell => cell.tile === null)
    }

    randomOpenCell() {        
        const randomIndex = Math.floor(Math.random() * this.#openCells.length)
        return this.#openCells[randomIndex]
    }
}

class Cell {
    #x
    #y
    #tile
    #cellElement
    #mergeTile
    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
        this.#tile = null
    }

    get tile() {
        return this.#tile
    }

    get x() {
        return this.#x
    }


    get y() {
        return this.#y
    }

    set tile(value) {
        this.#tile = value
        if (value === null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }

    get mergeTile() {
        return this.#mergeTile
    }

    set mergeTile(value) {
        this.#mergeTile = value
        if (value == null) return
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y
    }

    canAccept(tile) {
        return (this.tile == null ||
             (tile.value === this.tile.value && this.mergeTile == null))
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value
        this.mergeTile.remove()
        this.mergeTile = null
    }
}

function makeCells(grid) {
    const cells = []
    for (let i = 0; i < (GRID_SIZE * GRID_SIZE); i++) {
        const newCell = document.createElement("div")
        newCell.classList.add("cell")
        cells.push(newCell)
        grid.append(newCell)
    }
    return cells
}