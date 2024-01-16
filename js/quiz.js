// Modelo
        class Question {
            constructor(question, options, correctOptionIndex) {
                this.question = question;
                this.options = options;
                this.correctOptionIndex = correctOptionIndex;
            }

            isCorrect(optionIndex) {
                return this.correctOptionIndex === optionIndex;
            }
        }

        // Crear instancias de la clase Question
        const question1 = new Question(
            "¿Cuál es el lenguaje de marcado principal para construir páginas web?",
            ["HTML", "CSS", "JavaScript", "Python"],
            0
        );

        const question2 = new Question(
            "¿Cuál de las siguientes no es una librería de JavaScript?",
            ["React", "jQuery", "Bootstrap", "Django"],
            3
        );
        const question3 = new Question(
            "¿Qué significa el acrónimo 'API' en desarrollo de software?",
            ["Aplicación de Programación Interactiva", "Interfaz de Programación de Aplicaciones", "Arquitectura de Programación Integrada", "Acceso a Plataforma de Integración"],
            1
        );
        
        const question4 = new Question(
            "¿Cuál de los siguientes es un sistema de control de versiones distribuido?",
            ["Git", "SVN (Subversion)", "Mercurial", "CVS (Concurrent Versions System)"],
            0
        );

        // Definir el modelo de la aplicación
        const quizModel = {
            currentQuestionIndex: 0,
            score: 0,
            questions: [question1, question2, question3, question4]
        };

        // Vista
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const resultElement = document.getElementById('result');

        // Función para actualizar la vista
        function updateView() {
            const currentQuestion = quizModel.questions[quizModel.currentQuestionIndex];
        
            if (quizModel.currentQuestionIndex < quizModel.questions.length) {
                // Mostrar la pregunta y opciones
                document.getElementById('question').textContent = currentQuestion.question;
                document.getElementById('options').innerHTML = "";
        
                currentQuestion.options.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('option');
                    optionElement.textContent = option;
        
                    // Agregar un event listener para manejar la selección de opciones
                    optionElement.addEventListener('click', () => handleOptionClick(index));
        
                    document.getElementById('options').appendChild(optionElement);
                });
        
                // Mostrar el resultado actual
                document.getElementById('result').textContent = `Pregunta ${quizModel.currentQuestionIndex + 1} de ${quizModel.questions.length} - Puntuación: ${quizModel.score}`;
            } else {
                // Limpiar la pantalla y mostrar solo el mensaje final
                document.getElementById('question').style.display = 'none';
                document.getElementById('options').style.display = 'none';
                document.getElementById('controls').style.display = 'none';
        
                // Mostrar el resultado final
                document.getElementById('result').textContent = `Fin del quiz! Puntuación final: ${quizModel.score} de ${quizModel.questions.length}`;
        
                // Mostrar pantalla final
                document.getElementById('final-screen').style.display = 'block';
                document.getElementById('final-score').textContent = `${quizModel.score} de ${quizModel.questions.length}`;
            }
        }
        
        function handleOptionClick(optionIndex) {
            const currentQuestion = quizModel.questions[quizModel.currentQuestionIndex];
        
            // Verificar si la opción seleccionada es correcta
            if (currentQuestion.isCorrect(optionIndex)) {
                quizModel.score++;
                document.getElementById('result').textContent = "¡Correcto!";
            } else {
                document.getElementById('result').textContent = "Incorrecto. La respuesta correcta es: " + currentQuestion.options[currentQuestion.correctOptionIndex];
            }
        
            // Pasar a la siguiente pregunta o mostrar el resultado final
            quizModel.currentQuestionIndex++;
        
            if (quizModel.currentQuestionIndex < quizModel.questions.length) {
                updateView();
            } else {
                // Llamar a updateView para mostrar el resultado final
                updateView();
            }
        }
        
		function nextQuestion() {
            if (quizModel.currentQuestionIndex < quizModel.questions.length - 1) {
                quizModel.currentQuestionIndex++;
                updateView();
            }
        }

        function prevQuestion() {
            if (quizModel.currentQuestionIndex > 0) {
                quizModel.currentQuestionIndex--;
                updateView();
            }
        }

        function restartQuiz() {
            // Restablecer el modelo del quiz
            quizModel.currentQuestionIndex = 0;
            quizModel.score = 0;
        
            // Mostrar preguntas y controles
            document.getElementById('question').style.display = 'block';
            document.getElementById('options').style.display = 'block';
            document.getElementById('controls').style.display = 'flex';
        
            // Ocultar pantalla final
            document.getElementById('final-screen').style.display = 'none';
        
            // Actualizar la vista
            updateView();
        }

        // Inicializar la vista
        updateView();