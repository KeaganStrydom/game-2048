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
    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
        this.#tile = null
    }

    get tile() {
        return this.#tile
    }

    set title(value) {
        this.#tile = value
        if (value === null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
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