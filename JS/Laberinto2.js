const personaje = document.getElementById('personaje');
const laberinto = document.getElementById('laberinto');
const paredes = document.querySelectorAll('.pared');
let moveStep = 2;
let movingInterval;

// Función para detectar colisión
function detectarColision(x, y) {
    for (let pared of paredes) {
        let paredRect = pared.getBoundingClientRect();
        let personajeRect = {
            left: x + laberinto.offsetLeft,
            top: y + laberinto.offsetTop,
            right: x + laberinto.offsetLeft + personaje.offsetWidth,
            bottom: y + laberinto.offsetTop + personaje.offsetHeight
        };

        if (!(personajeRect.right < paredRect.left || 
              personajeRect.left > paredRect.right || 
              personajeRect.bottom < paredRect.top || 
              personajeRect.top > paredRect.bottom)) {
            return true; // Hay colisión
        }
    }
    return false; // No hay colisión
}

// Movimiento con el mouse
personaje.addEventListener('mousedown', function(event) {
    event.preventDefault();
    
    const moverPersonaje = (event) => {
        let x = event.clientX - laberinto.offsetLeft - personaje.offsetWidth / 2;
        let y = event.clientY - laberinto.offsetTop - personaje.offsetHeight / 2;

        // Limitar los movimientos dentro del laberinto y verificar colisiones
        x = Math.max(0, Math.min(x, laberinto.clientWidth - personaje.offsetWidth));
        y = Math.max(0, Math.min(y, laberinto.clientHeight - personaje.offsetHeight));

        if (!detectarColision(x, y)) {
            personaje.style.left = x + 'px';
            personaje.style.top = y + 'px';
        }
    };

    document.addEventListener('mousemove', moverPersonaje);

    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', moverPersonaje);
    }, { once: true });
});

// Movimiento continuo con las flechas del teclado
document.addEventListener('keydown', function(event) {
    if (movingInterval) return; // Evita múltiples intervalos

    movingInterval = setInterval(() => {
        let x = personaje.offsetLeft;
        let y = personaje.offsetTop;

        switch(event.key) {
            case 'ArrowUp':
                y -= moveStep;
                break;
            case 'ArrowDown':
                y += moveStep;
                break;
            case 'ArrowLeft':
                x -= moveStep;
                break;
            case 'ArrowRight':
                x += moveStep;
                break;
        }

        // Limitar los movimientos dentro del laberinto y verificar colisiones
        x = Math.max(0, Math.min(x, laberinto.clientWidth - personaje.offsetWidth));
        y = Math.max(0, Math.min(y, laberinto.clientHeight - personaje.offsetHeight));

        if (!detectarColision(x, y)) {
            personaje.style.left = x + 'px';
            personaje.style.top = y + 'px';
        }
    }, 10); // Intervalo para movimiento continuo
});

document.addEventListener('keyup', function() {
    clearInterval(movingInterval);
    movingInterval = null;
});
