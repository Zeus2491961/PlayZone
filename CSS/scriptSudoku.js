document.addEventListener('DOMContentLoaded', function () {
    const btnResolver = document.getElementById("btnResolver");
    btnResolver.addEventListener('click', resolverJuego);

    const tablaSudoku = document.getElementById("tabla-sudoku");
    const medidaCuadricula = 9;

    // Definir el tablero inicial y el tablero correcto
    const tableroInicial = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const tableroCorrecto = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    for (let fila = 0; fila < medidaCuadricula; fila++) {
        const nuevaFila = document.createElement("tr");
        for (let col = 0; col < medidaCuadricula; col++) {
            const celda = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "celda";
            input.id = `celda-${fila}-${col}`;
            input.maxLength = 1;

            if (tableroInicial[fila][col] !== 0) {
                input.value = tableroInicial[fila][col];
                input.disabled = true; // No permitir cambios en el tablero inicial
            }

            celda.appendChild(input);
            nuevaFila.appendChild(celda);
        }
        tablaSudoku.appendChild(nuevaFila);
    }
});
async function resolverJuego(){
    const medidaCuadricula = 9;
    const listaSudoku = [];

    for (let fila = 0; fila < medidaCuadricula; fila++){
        listaSudoku[fila] = [];
        for(let col = 0; col < medidaCuadricula; col++){
            const celdaId = `celda-${fila}-${col}`;
            const celdaValor = document.getElementById(celdaId).value;
            listaSudoku[fila][col] = celdaValor !== ""? parseInt(celdaValor): 0;
        }
    }

    // Verificar si el tablero del usuario coincide con el tablero correcto
    if (verificarSolucion(listaSudoku)) {
        alert("¡Ganaste!");
    } else {
        alert("El tablero no está completo o es incorrecto.");
    }
}

// Función para verificar si el tablero del usuario coincide con el tablero correcto
function verificarSolucion(tablero){
    const tableroCorrecto = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {
            if (tablero[fila][col] !== tableroCorrecto[fila][col]) {
                return false;
            }
        }
    }
    return true;
}
