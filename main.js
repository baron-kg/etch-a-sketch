function createCell() {
    const div = document.createElement("div");
    div.id = "cell";
    return div;
}

function createGrid(x, y) {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const newCell = createCell();
            document.querySelector("#grid-container").appendChild(newCell);
        }
    }
}

// Create grid
createGrid(16, 16);

// Change cell color
function changeCellColor(event) {
    event.target.style.backgroundColor = "darkRed";
}

// Add event listeners for hover on all cells
const gridCells = document.querySelectorAll("#grid-container > div");
gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", changeCellColor);
})