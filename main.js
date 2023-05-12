function changeCellColor(event) {
    event.target.style.backgroundColor = "darkRed";
}

function createCell() {
    const cell = document.createElement("div");
    cell.id = "cell";
    cell.addEventListener("click", changeCellColor);
    return cell;
}

function createGrid(size) {

    const grid = document.querySelector("#grid-container");
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const numOfCells = size * size;
    for (let i = 0; i < numOfCells; i++) {
        const newCell = createCell();
        grid.appendChild(newCell);
    }
}

function resetGrid() {
    const cells = document.querySelectorAll("#grid-container > div");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    })
}

function deletGrid() {
    const cells = document.querySelectorAll("#grid-container > div");
    cells.forEach((cell) => {
        cell.remove();
    })
}

createGrid(16);

function deleteMode() {
    const delBtn = document.querySelector("#btn-delete");
    const gridCells = document.querySelectorAll("#grid-container > div");

    if (delBtn.style.backgroundColor != "red") {
        gridCells.forEach((cell) => {
            cell.addEventListener("click", function () {
                this.style.backgroundColor = "white";
            });
        });
        delBtn.style.backgroundColor = "red";
        document.querySelector("#grid-container").style.cursor = "crosshair";
        return;
    }

    gridCells.forEach((cell) => {
        cell.addEventListener("click", function () {
            this.style.backgroundColor = "darkRed";
        });
    })

    delBtn.style.backgroundColor = "";
    document.querySelector("#grid-container").style.cursor = "";
}

// Add event listener for reset button
const resetBtn = document.querySelector("#btn-reset");
resetBtn.addEventListener("click", resetGrid);

//Add event listener to range slider
const range = document.querySelector("#range");
range.addEventListener("mouseup", function () {
    deletGrid();
    createGrid(this.value);
    document.querySelector("#range-value").textContent = `${this.value} x ${this.value}`;
});
