
/*
Title = Titulo da quiz (String)
Alternativas = Lista de opções (Array)
Correta = Posição na Array das alternativas a opção correta (Number)
*/

const quiz = [
    { title: "Quanto é 1+1?", alternativas: ["1","2","3","4"], correta: 1 },
    { title: "Qual é o resultado de: 4 + x = 16", alternativas: ["12","16","6","22"], correta: 0 },
    { title: "Quem descobriu o Brasil?", alternativas: ["Pedro Alvares C.", "Karl Marx", "Nicola Tesla", "Santos Dumont"], correta: 0 }
];

let quizQuestions = quiz.slice();
let answers = [];

function startQuiz() {
    document.querySelector("#start").classList.add("disabled");

    const title = document.querySelector("#titleTop");
    const quizContainer = document.querySelector("#quiz");
    const sendAnswer = document.createElement("a");

    title.textContent = "Pergunta: ";

    quizQuestions = quiz.slice();
    answers = [];

    sendAnswer.id = "send";
    sendAnswer.classList.add("btn", "btn-info");
    sendAnswer.setAttribute("role", "button");
    sendAnswer.innerHTML = '<img class="icon" src="./src/assets/send-fill.svg" alt="send"> Enviar resposta';

    let inicio = Date.now();

    const generateQuiz = () => {
        const question = quizQuestions[Math.floor(quizQuestions.length * Math.random())];
        const div = document.createElement("div");

        if(question) {
        //  === Elementos do quiz ===
            const titleQuiz = document.createElement("h5");
            titleQuiz.classList.add("text-center")
            titleQuiz.textContent = question.title;

            const alternativesQuiz = document.createElement("div");
            alternativesQuiz.classList.add("btn-group-toggle", "btn-group-vertical", "w-100");
            alternativesQuiz.setAttribute("data-toggle", "buttons");

            question.alternativas.forEach((alternativa, index) => {
                const alternative = document.createElement("label");

                alternative.classList.add("btn", "btn-info")
                alternative.setAttribute("alternative", alternativa)
                alternative.innerHTML = `<input type="radio" name="options" id="option${index+1}" autocomplete="off"> ${alternativa}`;

                alternativesQuiz.appendChild(alternative);
            });

            div.classList.add("quiz-question");
            div.append(titleQuiz,alternativesQuiz,sendAnswer);
            quizContainer.innerHTML = "";
            quizContainer.appendChild(div);
            inicio = Date.now();
        } else {
            document.querySelector("#start").classList.remove("disabled");
            if(document.querySelector(".quiz-question")) document.querySelector("#quiz").removeChild(document.querySelector(".quiz-question"));

            const table = document.createElement("table");
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");

            title.textContent = "Todas perguntas respondidas!"
            table.classList.add("table", "table-dark");

            thead.innerHTML = 
            '<tr>' +
            '    <th scope="col">Pergunta</th>' +
            '    <th scope="col">Tempo de resposta</th>' +
            '    <th scope="col">Acertou</th>' +
            '</tr>';
 
            answers.forEach(answer => {
                const tr = document.createElement("tr");

                tr.innerHTML =
                `    <th scope="col">${answer.title.length > 25 ? `${answer.title.slice(0,25)}...` : answer.title}</th>` +
                `    <th scope="col">${answer.time}s</th>` +
                `    <th scope="col"><img class="icon" src="./src/assets/${answer.correct ? "check-circle-fill" : "x-circle-fill"}.svg" alt="send"></th>`
                
                tbody.append(tr);
            });
            table.append(thead, tbody);

            document.querySelector("#quiz").appendChild(table)
        }     

        return question;
    };

    let question = generateQuiz();

    document.querySelector("#send").addEventListener("click", function() {
        const selectedAnswerElement = document.querySelector(".active");
        if(!selectedAnswerElement) return alert("Você precisa selecionar uma resposta.");

        const answer = question.alternativas.indexOf(selectedAnswerElement.getAttribute("alternative"));
        document.querySelector("#send").classList.add("disabled");
        selectedAnswerElement.classList.remove("btn-info");
        quizQuestions.splice(quizQuestions.indexOf(question), 1);
        question.time = parseInt((Date.now() - inicio) / 1000)

        if(answer == question.correta) {
            selectedAnswerElement.classList.add("btn-success");
            question.correct = true;
            answers.push(question);      
        } else {
            selectedAnswerElement.classList.add("btn-danger");
            question.correct = false;
            answers.push(question);
        }
        setTimeout(() => {
            question = generateQuiz();
            document.querySelector("#send").classList.remove("disabled");
        }, 5000);
    });
};
