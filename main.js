function createGridRow (x, y) {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const div = document.createElement("div");
            document.querySelector("#grid-container").appendChild(div);
        }
    }
}

createGridRow(16, 16);