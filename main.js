function setRandomCellColor(cell) {
    let maxValue = 256;
    let valueR = Math.floor(Math.random() * maxValue);
    let valueG = Math.floor(Math.random() * maxValue);
    let valueB = Math.floor(Math.random() * maxValue);
    cell.style.backgroundColor = `rgb(${valueR}, ${valueG}, ${valueB})`;
}

function changeCellColor(cell, color) {
    cell.style.backgroundColor = color;
}

function createCell() {
    const cell = document.createElement("div");
    cell.id = "cell";
    cell.addEventListener("click", function () {
        changeCellColor(this, "black");
    });
    return cell;
}

function createNewGrid(size) {
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
    const gidCells = document.querySelectorAll("#grid-container > div");
    gidCells.forEach(function (cell) {
        changeCellColor(cell, "white");
    })
}

createNewGrid(16);

function deleteMode() {
    const deleteButton = document.querySelector("#btn-delete");
    const gridCells = document.querySelectorAll("#grid-container > div");
    gridCells.forEach((cell) => { cell.removeEventListener("click", changeCellColor) });

    // Enable delete mode
    if (deleteButton.className != "button-toggled") {
        deleteButton.className = "button-toggled";
        document.querySelector("#grid-container").style.cursor = "crosshair";
        gridCells.forEach((cell) => {
            cell.addEventListener("click", function () {
                changeCellColor(this, "white");
            });
        });
        return 0;
    }
    
    // Keep rainbow mode active if it is enabled
    const rainbowButton = document.querySelector("#btn-rainbow"); 
    if (rainbowButton.className === "button-toggled" && deleteButton.className === "button-toggled") {
        deleteButton.className = "button";
        gridCells.forEach((cell) => cell.removeEventListener("click", setRandomCellColor));
        gridCells.forEach((cell) => cell.addEventListener("click", function () {
            setRandomCellColor(this);
        }));
        return 0;
    }

    // Disable delete mode
    deleteButton.className = "button";
    document.querySelector("#grid-container").style.cursor = "";
    gridCells.forEach((cell) => {
        cell.addEventListener("click", function () {
            changeCellColor(this, "black");
        });
    })
}

function rainbowMode() {
    const rainbowButton = document.querySelector("#btn-rainbow");
    const gridCells = document.querySelectorAll("#grid-container > div");

    // Enable rainbow mode
    if (rainbowButton.className != "button-toggled") {
        rainbowButton.className = "button-toggled";

        gridCells.forEach(function (cell) {
            cell.removeEventListener("click", changeCellColor);
            cell.addEventListener("click", function () {
                setRandomCellColor(this);
            })
        });
        return 0;
    }

    // Keep delete mode enabled if it is toggled
    const deleteButton = document.querySelector("btn-delete");
    if (deleteButton.className === "button-toggled" && rainbowButton.className === "buttnon-toggled") {
        rainbowButton.className = "button";
        gridCells.forEach((cell) => cell.removeEventListener("click", setRandomCellColor));
        gridCells.forEach((cell) => cell.addEventListener("click", function () {
            deleteMode(this);
        }));
        return 0;
    }

    // Disable rainbow mode
    rainbowButton.className = "button";
    gridCells.forEach(function (cell) {
        cell.removeEventListener("click", setRandomCellColor);
        cell.addEventListener("click", function () {
            changeCellColor(this, "black");
        })
    });
}

// Add event listener for reset button
const resetButton = document.querySelector("#btn-reset");
resetButton.addEventListener("click", resetGrid);

// Add event listener for rainbow button
const rainbowButton = document.querySelector("#btn-rainbow");
rainbowButton.addEventListener("click", rainbowMode);

// Add event listener to range slider
const rangeSlider = document.querySelector(".range");
rangeSlider.addEventListener("mouseup", function () {
    const cells = document.querySelectorAll("#grid-container > div");
    cells.forEach((cell) => { cell.remove(); })

    createNewGrid(this.value);
    document.querySelector("#range-value").textContent = `${this.value} x ${this.value}`;
});

// Add listener for delete mode button
const deleteButton = document.querySelector("#btn-delete");
deleteButton.addEventListener("click", deleteMode);