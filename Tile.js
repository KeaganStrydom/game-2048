export default class Tile {
    #x
    #y
    #value 
    #tileElement
    constructor(gameBoard, value = Math.random() > .5 ? 2:4) {
        this.#tileElement = document.createElement("div")
        this.#tileElement.classList.add("tile")
        gameBoard.append(this.#tileElement)
        this.value = value
    }

    set value(val) {
        this.#value = val
        this.#tileElement.textContent = val
        const exponent = Math.log2(val);
        const bgLightness = 100 - (exponent * 9);
        this.#tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`)
        const txtLightness = bgLightness <= 50 ? 90 : 10;
        this.#tileElement.style.setProperty("--txt-lightness", `${txtLightness}%`)
    }

    set x(value) {
       this.#x = value
       this.#tileElement.style.setProperty("--x", value)
    }

    set y(value) {
        this.#x = value
        this.#tileElement.style.setProperty("--y", value)
     }
}