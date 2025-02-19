document.addEventListener("DOMContentLoaded", function() {
    const gridLetters = [
        ['A', 'A', 'T', 'S', 'I', 'T', 'A', 'M', 'A'],
        ['S', 'D', 'I', 'A', 'M', 'A', 'N', 'T', 'E'],
        ['E', 'O', 'L', 'A', 'P', 'O', 'X', 'A', 'G'],
        ['U', 'R', 'E', 'A', 'O', 'T', 'E', 'L', 'R'],
        ['Q', 'C', 'I', 'T', 'R', 'I', 'N', 'O', 'A'],
        ['R', 'O', 'A', 'U', 'I', 'E', 'O', 'N', 'N'],
        ['U', 'N', 'B', 'N', 'F', 'A', 'M', 'E', 'A'],
        ['T', 'I', 'A', 'G', 'A', 'T', 'A', 'S', 'T'],
        ['A', 'X', 'I', 'S', 'Z', 'J', 'A', 'D', 'E'],
    ];

    const correctSelections = [
        {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 5},
        {row: 0, col: 6}, {row: 0, col: 7}, {row: 0, col: 8}, {row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2},
        {row: 1, col: 3}, {row: 1, col: 4}, {row: 1, col: 5}, {row: 1, col: 6}, {row: 1, col: 7}, {row: 1, col: 8},
        {row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2}, {row: 2, col: 3}, {row: 2, col: 4}, {row: 2, col: 5},
        {row: 2, col: 8}, {row: 3, col: 0}, {row: 3, col: 3}, {row: 3, col: 4}, {row: 3, col: 8}, {row: 4, col: 0},
        {row: 4, col: 1}, {row: 4, col: 2}, {row: 4, col: 3}, {row: 4, col: 4}, {row: 4, col: 5}, {row: 4, col: 6},
        {row: 4, col: 7}, {row: 4, col: 8}, {row: 5, col: 0}, {row: 5, col: 1}, {row: 5, col: 3}, {row: 5, col: 4},
        {row: 5, col: 5}, {row: 5, col: 8}, {row: 6, col: 0}, {row: 6, col: 1}, {row: 6, col: 2}, {row: 6, col: 4},
        {row: 6, col: 6}, {row: 6, col: 8}, {row: 7, col: 0}, {row: 7, col: 1}, {row: 7, col: 2}, {row: 7, col: 3},
        {row: 7, col: 4}, {row: 7, col: 5}, {row: 7, col: 6}, {row: 7, col: 7}, {row: 7, col: 8}, {row: 8, col: 1},
        {row: 8, col: 4}, {row: 8, col: 5}, {row: 8, col: 6}, {row: 8, col: 7}, {row: 8, col: 8},
    ];

    const tbody = document.querySelector(".grid tbody");

    // Generar la cuadrícula de letras
    gridLetters.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");
        row.forEach((letter, colIndex) => {
            const td = document.createElement("td");
            td.textContent = letter;
            td.dataset.row = rowIndex;
            td.dataset.col = colIndex;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    // Manejar la selección de casillas
    let selectedCells = [];

    tbody.addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName === "TD") {
            const row = parseInt(target.dataset.row);
            const col = parseInt(target.dataset.col);

            // Alternar selección de celda
            target.classList.toggle("selected");

            const isSelected = target.classList.contains("selected");

            if (isSelected) {
                selectedCells.push({ row, col });
            } else {
                selectedCells = selectedCells.filter(cell => cell.row !== row || cell.col !== col);
            }

            // Verificar si se seleccionaron todas las posiciones correctas
            const allCorrect = correctSelections.every(correctCell =>
                selectedCells.some(selectedCell => selectedCell.row === correctCell.row && selectedCell.col === correctCell.col)
            );

            if (allCorrect && selectedCells.length === correctSelections.length) {
                document.getElementById("message").textContent = "¡Ganaste!";
            } else {
                document.getElementById("message").textContent = "";
            }
        }
    });

    // Funcionalidad para cambiar color de palabras en la lista al hacer clic
    const wordItems = document.querySelectorAll(".word-item");

    wordItems.forEach(item => {
        item.addEventListener("click", function() {
            item.classList.toggle("clicked");
        });
    });
});
