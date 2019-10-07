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


////////////////////defining our dom elements and function variables
let start = $("#start");
let gameDisplay = $("#game-content");
let questionDiv = $("#questionDiv");
let timerDiv = $("#timerDiv");
let postDiv = $("#postDiv");
let choiceRow = $('#choices-row')
let choice1 = $("#choice1");
let choice2 = $("#choice2");
let choice3 = $("#choice3");
let choice4 = $("#choice4");
let scoreBoard = $("#scoreboard");
let numCorrect = $("#numCorrect");
let numWrong = $("#numWrong");
let timer = 31;
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
        question: "What percent our Solar System's mass does the Sun hold?",
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
    {
        question: "About how old is our Universe expected to be?",
        choice1: "~13.8 billion years",
        choice2: "~600,000 years",
        choice3: "~19.6 million years",
        choice4: "~230 billion years",
        answer: "1",
        answerGif: "assets/image/ans_3.gif"
    },
    {
        question: "How much of our Universe is made up of material that we can ACTUALLY see?",
        choice1: "~80%",
        choice2: "less than ~2%",
        choice3: "less than ~5%",
        choice4: "55%",
        answer: "3",
        answerGif: "assets/image/ans_3.gif"
    },
];


//////////////////call the questions to be displayed
actualLastQuestion = qArr.length - 1;
currentQuestion = 0;
//let q = qArr[currentQuestion];



function showQuestion() {
    //let q = qArr[currentQuestion];
    console.log("showQuestion function is called.");





    questionDiv.html(qArr[currentQuestion].question);
    choice1.html(qArr[currentQuestion].choice1);
    choice2.html(qArr[currentQuestion].choice2);
    choice3.html(qArr[currentQuestion].choice3);
    choice4.html(qArr[currentQuestion].choice4);
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
    if (qArr[currentQuestion] === qArr[actualLastQuestion]) {
        timerDiv.hide();
        postDiv.show();
        postDiv.click(endgame);


    } else if (answer == qArr[currentQuestion].answer) { ////stop timer
        stop();
        ////hide previous game display elements
        questionDiv.fadeTo("slow", .25);
        choiceRow.fadeTo("slow", .25);
        timerDiv.hide();
        ////show correct message
        postDiv.show("slow").html("<p> Correct. Click to Proceed</p>");
        postDiv.click(nextQuestion);
        //increase score
        scoreCorrect++;
        console.log(scoreCorrect + " correct answers.");
        ////add 1 to currentquestion counter so next question is picked 
        currentQuestion++;
        console.log(currentQuestion + " is the current index of our Questions array.");
        console.log(qArr[currentQuestion]);


    } else {
        stop();
        ////increase wrong
        currentQuestion++;
        scoreWrong++;
        timerDiv.hide();
        questionDiv.fadeTo("slow", .25);
        choiceRow.fadeTo("slow", .25);
        console.log(scoreWrong + " wrong answers.")
        postDiv.show("slow").html("You are wrong.  Click to Proceed.");
        postDiv.click(nextQuestion);

    }
}
/////////////////start the game

//hide the start button
function startGame() {
    start.fadeOut("slow");
    gameDisplay.show("slow");

    //function to show question
    showQuestion();
}


////////////////next question 

function nextQuestion() {
    postDiv.hide("fast");
    questionDiv.fadeTo("fast", 1);
    choiceRow.fadeTo("fast", 1);
    timerDiv.show("fast");

    showQuestion();
}
////////////////timer functions taken from timer>>interval activity



function run() {
    clearInterval(intervalId);
    intervalId = setInterval(countdown, 1000);
    timer = 31;
}
//  The decrement function.
function countdown() {


    if (timer > 0) {
        //  Decrease number by one.
        timer--;

        //  Show the number in the #show-number tag.
        $("#timerDiv").html("<h2>" + timer + "</h2>");


        //  Once number hits zero...
        if (timer === 0) {

            //  ...run the stop function.
            stop();
            questionDiv.fadeTo("fast", .25);
            choiceRow.fadeTo("fast", .25);
            $("#postDiv").show("slow").html("You ran out of time. Click to continue");
            postDiv.click(nextQuestion);



        }
    }
}
//  The stop function
function stop() {
    clearInterval(intervalId);

}

//////////////////endgame
function endgame() {
    console.log('Endgame fired');
    stop();

    questionDiv.hide();
    choiceRow.hide();
    timerDiv.hide();
    $("#scoreboard").show();
    //scoreBoard.show("slow");
    numCorrect.html("Correct answers: " + scoreCorrect);
    numWrong.html("Incorrect answers: " + scoreWrong);
}