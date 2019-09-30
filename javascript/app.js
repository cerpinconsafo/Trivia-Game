//trivia-game
//create a function to start the game from a start button
/////the main ui of the game should be hidden and only appear once start is pressed
//create a function that accesses the correct question/answer set from an array 
/////keep track of the current q/a object
/////display a timer for each individual question(20sec)
//////////if correct answer, show congrats message and success img/gif
//////////if time runs out, or wrong answer, show correct answer with a failure img/gif
/////////pause for 3 seconds, then grab next q/a set
//after all questions have been attempted or answered, display a final score screen
/////
/////provide a reset button that does not refresh the page
//******************************************//
//************update 093019*****************//
//*********failing over the weekend and trial and error, my questions div loads, reacts to onclick of answer, but does not have a working timer or advance to the next question*************//
//************************************************ */
/////


////////////////////defining our dom elementas and function variables
let start = $("#start");
let gameDisplay = $("#game-content");
let questionDiv = $("#questionDiv");
let timerDiv = $("#timerDiv");
let postDiv = $("#postDiv");
let choice1 = $("#choice1");
let choice2 = $("#choice2");
let choice3 = $("#choice3");
let choice4 = $("#choice4");
let numCorrect = $("#numCorrect");
let numWrong = $("#numWrong");
let timer = 20;
let count = 0;
let scoreCorrect = 0;
let scoreWrong = 0;
let intervalId;
let hasRun = false;


///////////////////here are my array of question objects
qArr = [{
        question: "There is a unique type of black hole at the center of our Milky Way Galaxy. What is the name of this type of black hole? ",
        choice1: "Ultra",
        choice2: "Massive",
        choice3: "Infinity",
        choice4: "Super Massive",
        answer: "4",
        answerGif: "https://media.giphy.com/media/OANp03XvXEV9u/giphy.gif"
    },
    {
        question: "What percent our solar system's mass does the Sun hold?",
        choice1: "55%",
        choice2: "99.8%",
        choice3: "75.8%",
        choice4: "89.9%",
        answer: "2",
        answerGif: "assets/image/ans_2.gif"
    },
    {
        question: "How much time does it take for a single photon to reach the Earth from the Sun?",
        choice1: "8 minutes",
        choice2: "2 hours and 36 minutes",
        choice3: "50 seconds",
        choice4: "30 minutes",
        answer: "1",
        answerGif: "assets/image/ans_3.gif"
    },
    {
        question: "How many black holes are there in our Milky Way Galaxy?",
        choice1: "1",
        choice2: "~10 million",
        choice3: "~100",
        choice4: "~1 million",
        answer: "2",
        answerGif: "assets/image/ans_3.gif"
    },
];


//////////////////call the questions to be displayed
actualLastQuestion = qArr.length - 1;
currentQuestion = 0;
let q = qArr[currentQuestion];


function showQuestion() {
    console.log("showQuestion function is called.");
    console.log(q);
    postDiv.hide();
    gameDisplay.show("slow");


    questionDiv.html(q.question);
    choice1.html(q.choice1);
    choice2.html(q.choice2);
    choice3.html(q.choice3);
    choice4.html(q.choice4);
    // console.log(q.question);
    // console.log(q.choice1);
    // console.log(q.choice2);
    // console.log(q.choice3);
    // console.log(q.choice4);
    // console.log(q.answer);
    //run timer function

    run();
    countdown();
    // timerDiv.html(timer + " seconds remain");

    //if statement for correct answer

}

//check answer
function checkAnswer(answer) {
    if (answer == q.answer) {

        ////correct answer
        postDiv.html("You are correct.");

        //increase score
        scoreCorrect++;
        console.log(scoreCorrect + " correct answers.");

        ////add 1 to currentquestion counter so next question is picked 
        currentQuestion++;
        console.log(currentQuestion + " is the current index of our Questions array.");
        console.log(q);
        stop();
        showQuestion();




    } else {
        ////increase wrong
        scoreWrong++;
        console.log(scoreWrong + " wrong answers.")
        postDiv.html("You are wrong.");
        currentQuestion++;
        stop();
        showQuestion();

        //     }
        //     if (currentQuestion)

    }
}
/////////////////start the game

//hide the start button
function startGame() {
    start.hide("slow");

    //function to show question
    showQuestion();
}

////////////////timer functions taken from timer>>interval activity


function run() {
    if (hasRun) {
        intervalId = setInterval(countdown, 1000);
        hasRun = true;

    }
}

function countdown() {
    if (timer > 0) {
        timer--;
        timerDiv.html("<h2>" + timer + " seconds remain.</h2>");
    }

    if (timer === 0) {

        stop();
        questionDiv.hide();
        choice1.hide();
        choice2.hide();
        choice3.hide();
        choice4.hide();
        postDiv.show();
        postDiv.html("<h1> You have crossed the event horizon. </h1>");




    }
}




function stop() {

    clearInterval(intervalId);
    hasRun = false;
}