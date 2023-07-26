var startBtn = document.querySelector('#start-button');
var quiz = document.querySelector('#quiz-question');
var endScreen = document.querySelector('#quiz-end');
var question = document.querySelector('#question');
var answer1 = document.querySelector('#answer-1');
var answer2 = document.querySelector('#answer-2');
var answer3 = document.querySelector('#answer-3');
var answer4 = document.querySelector('#answer-4');
var ansChosen = "";
var questionList = ["Question 1", "Question 2", "Question 3", "Question 4"];
var answerList = [['Pick me', 'Not me', 'Or me', 'Def not me'],['Nada','pick me','try again', 'NOPE'],['sorry', 'Not me', 'THIS ONE', 'Def not me'],['Hello?', 'Not me', 'Or me', 'prob this one']];
var correctAnswers = ["a", "b", "c", "d"];
var questionNum = 0;
var time = document.querySelector('#timer');
var timeLeft = 20;
var finalScore = 0;
var quizDone = false;



quiz.style.display = 'none';
endScreen.style.display = 'none';



//removes the starting text and button on clicking the button to begin
startBtn.addEventListener('click', function(event){
    let quizStart = document.querySelector('#quiz-intro');
    quizStart.style.display = 'none';
    quiz.style.display = 'block';
    questionGen();
    setTime();
});


answer1.addEventListener('click', function(event){
    ansChosen = "a";
    console.log(ansChosen);
    checkAnswer();
  
});

answer2.addEventListener('click', function(event){
    ansChosen = "b";
    console.log(ansChosen);
    checkAnswer();
   
});

answer3.addEventListener('click', function(event){
    ansChosen = "c";
    console.log(ansChosen);
    checkAnswer();
    
});

answer4.addEventListener('click', function(event){
    ansChosen = "d";
    console.log(ansChosen);
    checkAnswer();
});

function checkAnswer(){
    if(ansChosen == correctAnswers[questionNum]){
        console.log('SCORE GOOD');
        timeLeft = timeLeft + 5;
        questionNum++
        questionGen();
        
    }else{
        console.log("SCORE BAD");
        timeLeft = timeLeft - 5;
        questionNum++
        questionGen();
    }
};


function questionGen(){
    
    if(questionNum < 4){ 
    checkComplete();
    question.innerHTML = questionList[questionNum];
    answer1.textContent = answerList[questionNum][0];
    answer2.textContent = answerList[questionNum][1];
    answer3.textContent = answerList[questionNum][2];
    answer4.textContent = answerList[questionNum][3]; 
}else{
    checkComplete();
    endQuiz();
}};

function checkComplete(){
    if(questionNum == 4 || timeLeft <= 0){
        //transition to END SCREEN
        quizDone = true;
        finalScore = timeLeft;
        console.log(finalScore);
        endQuiz();
    }
};

//Timer that counts down from the set timeLeft variable to 0
function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        time.innerHTML = "Time: " + timeLeft;

      if(timeLeft < 1) {
        clearInterval(timerInterval);
        checkComplete();
      }
    }, 1000);
  }
  

function endQuiz(){
    quiz.style.display = 'none';
    endScreen.style.display = 'block';
    time.style.display = 'none';
    console.log(finalScore);
};