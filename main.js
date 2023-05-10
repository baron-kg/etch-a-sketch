function createCell() {
    const div = document.createElement("div");
    div.id = "cell";
    return div;
}

function createGrid(numOfCells) {
    for (let i = 0; i < numOfCells; i++) {
        const newCell = createCell();
        document.querySelector("#grid-container").appendChild(newCell);
    }
}

function resetGrid() {
    const cells = document.querySelectorAll("#grid-container > div");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "darkGreen";
    })
}

// Create grid
createGrid(256);

// Change cell color
function changeCellColor(event) {
    event.target.style.backgroundColor = "darkRed";
}

// Add event listeners for hover on all cells
const gridCells = document.querySelectorAll("#grid-container > div");
gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", changeCellColor);
})

// Add event listener for reset button
const resetBtn = document.querySelector("#btn-reset");
resetBtn.addEventListener("click", resetGrid);