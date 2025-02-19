let score = 0;
let currentCorrect = 0;  // Para almacenar la respuesta correcta actual

const questions = [
    {
        image: "Imagenes/Paris.jpg",
        text: '¿Cuál es la capital de Francia?',
        answers: ['Madrid', 'París', 'Roma', 'Berlín'],
        correct: 1
    },
    {
        image: 'Imagenes/Gabo.jpg',
        text: '¿Quién escribió "Cien años de soledad"?',
        answers: ['Gabriel García Márquez', 'Jorge Luis Borges', 'Pablo Neruda', 'Octavio Paz'],
        correct: 0
    },
    {
        image: 'Imagenes/Amazonas.jpg',
        text: '¿Cuál es el río más largo del mundo?',
        answers: ['Amazonas', 'Nilo', 'Yangtsé', 'Mississippi'],
        correct: 0
    }
    // Aquí puedes añadir más preguntas
];

// Cargar una pregunta aleatoria
function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    document.getElementById('question-image').src = question.image;
    document.getElementById('question-text').textContent = question.text;
    
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.textContent = question.answers[index];
        btn.classList.remove('correct', 'incorrect'); // Remover clases anteriores
        btn.disabled = false; // Habilitar botones nuevamente
    });

    currentCorrect = question.correct;  // Guardar la respuesta correcta actual
}

// Verificar si la respuesta seleccionada es correcta
function checkAnswer(selectedIndex) {
    const buttons = document.querySelectorAll('.answer-btn');
    if (selectedIndex === currentCorrect) {
        score += 20;
        document.getElementById('score').textContent = 'Puntos: ' + score;
        buttons[selectedIndex].classList.add('correct'); // Poner en verde
    } else {
        buttons[selectedIndex].classList.add('incorrect'); // Poner en rojo
        buttons[currentCorrect].classList.add('correct'); // Marcar la correcta en verde
    }

    // Deshabilitar todos los botones para evitar más clics
    buttons.forEach(btn => btn.disabled = true);

    // Pasar a la siguiente pregunta después de 1 segundo
    setTimeout(loadQuestion, 1000);
}

// Cargar la primera pregunta al inicio
window.onload = function() {
    loadQuestion();
};
