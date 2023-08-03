var startBtn = document.querySelector('#start-button');
var quizStart = document.querySelector('#quiz-intro');
var quiz = document.querySelector('#quiz-question');
var endScreen = document.querySelector('#quiz-end');
var highscoreScrn = document.querySelector('#highscoreScrn');
var question = document.querySelector('#question');
var answer1 = document.querySelector('#answer-1');
var answer2 = document.querySelector('#answer-2');
var answer3 = document.querySelector('#answer-3');
var answer4 = document.querySelector('#answer-4');
var score = document.querySelector('#score');
var backBtn = document.querySelector('#returnBtn');
var initials = document.querySelector('#intials');
var highscoreBtn = document.querySelector('#highscoreBtn');
var homeBtn = document.querySelector('#homeBtn');
var scoreSubmitBtn = document.querySelector('#submitScores');
var ansChosen = "";
var questionList = ["String values must be stored within what?", "Commonly used data types DO NOT include which of the following?", "Which is the correct way to call the function 'testFunction' in Javascript?", "Which of the following methods can be used to display data using Javascript?"];
var answerList = [['Quotations', 'Brackets', 'Dashes', 'Parentheses'],['String','Array','Boolean', 'Integer'],['call function testFunction()', 'call testFunction', 'testFunction()', 'run testFunction()'],['document.print()', 'window.report()', 'info.return()', 'console.log()']];
var correctAnswers = ["a", "b", "c", "d"];
var questionNum = 0;
var time = document.querySelector('#timer');
var startingTime = 20;
var timeLeft = startingTime;
var finalScore = 0;
var quizDone = false;
var timerInterval = 0;
var highScoreEl = document.querySelector('#highscoreList');
var clearBtn = document.querySelector('#clearScores');
var rightOrWrong = document.querySelector('#rightOrWrong');






startUp();

function startUp(){
    time.innerHTML = "Time: " + timeLeft;
    time.style.display = 'block';
    homeBtn.innerHTML = 'RETURN';
    quiz.style.display = 'none';
    endScreen.style.display = 'none';
    highscoreScrn.style.display = 'none';
    quizStart.style.display = 'block';
    highscoreBtn.style.display = 'block';
    questionNum = 0;
    resetTimer();
};

//removes the starting text and button on clicking the button to begin
startBtn.addEventListener('click', function(event){
    quizStart.style.display = 'none';
    quiz.style.display = 'block';
    highscoreBtn.style.display = 'none';
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
        rightOrWrong.innerHTML = ('Correct!');
    }else{
        console.log("SCORE BAD");
        timeLeft = timeLeft - 5;
        questionNum++
        questionGen();
        rightOrWrong.innerHTML = ('False ☹!');
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
        if(timeLeft > 0){
        finalScore = timeLeft;
        console.log(finalScore);
       
        }else {
        timeLeft = 0;
        finalScore = timeLeft;
        console.log(finalScore);
        }
    quizDone = true;
    endQuiz();
    }
};

//Timer that counts down from the set timeLeft variable to 0
function setTime() {
    timeLeft = startingTime;
    timerInterval = setInterval(function(){
    if(timeLeft >= 1){
        timeLeft--;
        time.innerHTML = "Time: " + timeLeft;
    } else {
        clearInterval(timerInterval);
        timeLeft = 0;
        checkComplete();
    }
    }, 1000);
}

//displays the End of quiz Screen
function endQuiz(){
    quiz.style.display = 'none';
    endScreen.style.display = 'block';
    time.style.display = 'none';
    highscoreBtn.style.display = 'none';
    console.log(finalScore);
    score.innerHTML = finalScore;
    backBtn.innerHTML = "Return to Start";
    window.clearInterval(timerInterval);
    timeLeft = startingTime;
    clearBtn.style.display = 'block';
    clearBtn.innerHTML = 'Clear Scores';
    rightOrWrong.style.display = 'none';
};

backBtn.addEventListener('click', function(event){
    startUp();
    time.style.display = 'block';
})

highscoreBtn.addEventListener('click', function(event){
    event.preventDefault();
    quizStart.style.display = 'none';
    endScreen.style.display = 'none';
    highscoreScrn.style.display = 'block';
    highscoreBtn.style.display = 'none';
    time.style.display = 'none';
    homeBtn.style.display = 'block';
    homeBtn.style.display = 'block';
    resetTimer();
    generateScore();

})

homeBtn.addEventListener('click', function(event){

    startUp();

})

function resetTimer(){
    timeLeft = startingTime;
    time.innerHTML = "Time: " + timeLeft;
};



var highScoresPrevious = JSON.parse(localStorage.getItem('playerScore'));

var existingScores = JSON.parse(localStorage.getItem('studentScores'));

function storeScores(){
    
    if(existingScores == null) existingScores = [];

    var studentScore = {
        initials : initials.value.trim(),
        scoreAchieved : finalScore
    };

    //localStorage.setItem('playerScore', JSON.stringify(studentScore));
    existingScores.push(studentScore);
    localStorage.setItem('studentScores', JSON.stringify(existingScores));

};

scoreSubmitBtn.addEventListener('click', function(event){
    storeScores();
    highscoreScrn.style.display = 'block';
    endScreen.style.display = 'none';
    homeBtn.style.display = 'block';
    generateScore();
    var li = document.createElement('li');

})


function generateScore() {
    highScoreEl.innerHTML = '';
    var scoresList = [];
    scoresList = JSON.parse(localStorage.getItem("studentScores"));

    for (i=0 ;i < scoresList.length ;i++) {
        var li = document.createElement('li');
        li.innerHTML = (scoresList[i].initials + " " + scoresList[i].scoreAchieved);
        highScoreEl.appendChild(li);
    }
};

clearBtn.addEventListener('click', function(event){
    localStorage.clear();
    startUp();
})


