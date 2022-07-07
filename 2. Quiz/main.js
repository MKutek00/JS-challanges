const questionDB = [{
    title: "Kto jest prezydentem RP?",
    a: "Andrzej Duda",
    b: "Matesz Morawiecki",
    c: "Jarosław Kaczyński",
    d: "Donald Tusk",
    correct: "c"
},
{
    title: "Kiedy dostane pierwsza prace?",
    a: "Jutro",
    b: "Nigdy",
    c: "Za tydzień",
    d: "Za rok",
    correct: "b"
}
]

const quizState = {
    questionNumber : 0,
    points : 0,
}

const quizTitle = document.querySelector(".quiz-title");
const answerA = document.querySelector("#a~label");
const answerB = document.querySelector("#b~label");
const answerC = document.querySelector("#c~label");
const answerD = document.querySelector("#d~label");
const sumbitButton = document.querySelector(".quiz-submit");
const answerInputs = document.querySelectorAll("input");

const endGameScreen = () =>{
    document.querySelector(".result").classList.remove("hide");
    document.querySelector("ul").classList.add("hide");
    quizTitle.textContent = " GRATULACJE !";
    document.querySelector("#points").textContent = quizState.points;
    document.querySelector("#max-points").textContent = questionDB.length;
}

const loadQuestion = () =>{
    if(quizState.questionNumber >= questionDB.length){
        endGameScreen();
    }

    answerInputs.forEach(input =>{
        input.checked = false;
    })

    quizTitle.textContent = questionDB[quizState.questionNumber].title;
    answerA.textContent = questionDB[quizState.questionNumber].a;
    answerB.textContent = questionDB[quizState.questionNumber].b;
    answerC.textContent = questionDB[quizState.questionNumber].c;
    answerD.textContent = questionDB[quizState.questionNumber].d;

}

loadQuestion();
const selectAnswer = () =>{
    let answer = '';
    answerInputs.forEach(input =>{
        if(input.checked){
            answer = input.id;
        }
    })
    return answer;
}

const checkAnswer = (playerChoise) =>{
    if(playerChoise === questionDB[quizState.questionNumber].correct){
        quizState.points++;
        quizState.questionNumber++
    }else{
        quizState.questionNumber++;
    }
}

const checkAnswerAndNewQuestion = () =>{
    let playerChoise = selectAnswer();
    if(playerChoise === ''){
        alert("Musisz wybrać jakąś odpowiedź");
        return;
    }
    checkAnswer(playerChoise);
    loadQuestion();
}

sumbitButton.addEventListener("click", checkAnswerAndNewQuestion);
