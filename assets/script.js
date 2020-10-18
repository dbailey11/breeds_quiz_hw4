

//creating quiz question arrays with inner objects for each question
let quizQuestions = [
    {
        question : "Which of the following is the most popular breed?",
        choiceA : "Rotterweilers",
        choiceB : "Yorkshire Terrier",
        choiceC : "Labradores",
        correct : "C"
    }, {
        question : "What is the cleverest breed?",
        choiceA : "Beagle",
        choiceB : "Border Collie",
        choiceC : "Pug",
        correct : "B"
    }, {
        question : "What is the smallest dog breed?",
        choiceA : "Chihuahua",
        choiceB : "Pekinese",
        choiceC : "Great Dane",
        correct : "A"
    },
]
// console.log(quizQuestions);


//declaring variables and constants
const lastQuestion = quizQuestions.length - 1; //index of questions
let runningQuestion = 0; //variable to keep track of running quesitons
var count = 0;
var qTime = 10; //timer per question
var Timer; //interval timer
var score = 0;

submitBtn = get("submitBtn");

//get function that will call elementIDs from HTML without all the code
function get(x) {
    return document.getElementById(x);
}

//render question function - to display quesiton in web page
function renderQuestion() {
    //calling and declaring element ID's
    question = get("question");
    choiceA = get("A");
    choiceB = get("B");
    choiceC = get("C");

    //displaying quesiton and choices
    //setting this variable allows for calling the code in an easier way instead of writing all the extra code
    let q = quizQuestions[runningQuestion]; 
    
    //displaying the quesiton and the choices
    question.innerHTML = "<p>"+ q.question +"</p>"; 
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;

}
// console.log("hello", renderQuestion);

//start quiz function
function startQuiz () {
    //declaring variable using get method and changing div styling
    get("start").style.display = "none";//hide start button for quiz to display
    get("quiz").style.display = "block";//edit quiz container style

    //executing the renderQuesiton/renderProgress/renderCounter function
    renderQuestion();
    renderProgress();
    renderCounter();

    Timer = setInterval(renderCounter, 1000); //calls renderCounter function every 1 sec
    
}
// console.log("hi", startQuiz);


//render progress function
//access the running quesiton, then change innerHTML of the right elements - question/choices
//use for loop to track correct/wrong user input
function renderProgress() {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        get("progress").innerHTML += "<div class= 'prog' id="+ qIndex +"></div>";
    }
}


// function myTimer() {
//     document.getElementById('timer').innerHTML = questionTime + "sec left";
//     questionTime--;
//     if (questionTime == -1) {
//         clearInterval(time);
//         alert("Time out!! :(");
//     }
// }

// //counter render function
function renderCounter () {
    if(count <= qTime) { //if user didn't exceed 10 seconds
        get("counter").innerHTML = count;
        count++
    } else { //user goes over the 10 seconds
        // count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion) {
            runningQuestion++
            renderQuestion();
        } else {
            //end quiz and show score
            clearInterval(Timer);
            scoreRender ();
        }
    }
}
// console.log("hi", renderCounter);

//check answer
function checkAnswer(answer) {
    if( answer == quizQuestions[runningQuestion].correct) {
        score++ //answer is correct and change progress to green
        answerIsCorrect();
    } else {
        //answer is wrong and change progress to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion) {
        runningQuestion++ //shows next question
        renderQuestion();
    } else {
        //end of quiz and show score
        clearInterval(Timer);
        scoreRender ();
    }
}

//correct answer
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//wrong answer
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render function
function scoreRender() {
    //declaring scoreContainer variable
    scoreDiv = get("scoreContainer");
    
    //changing style of divs
    scoreDiv.style.display = "block";
    quiz.style.display = "none";

    //calculate percent answered correctly
    const scorePerCent = Math.round(100 * score/quizQuestions.length);

    //display percent
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

//event listener to start quiz
start.addEventListener("click", startQuiz);

//function to show previous saved score
function renderPreviousScore() {
    userInitials = get("userInitials");
    userInput = get("userInput");

    userInput = localStorage.getItem("userInput");

    if(!userInput) {
        return;
    }

    userInput.textContent = userInput;

}
console.log('bye', renderPreviousScore);



submitBtn.addEventListener("click", function(event) {
    console.log("hi", event);
    userInput = get("userInput");

    if(userInput === "") {
        displayMessage("Don't want to save? OK!")
    } else {
        displayMessage("Your score has been saved!")
        
    }

    localStorage.setItem("userInput", userInput);
    renderPreviousScore();


});
// console.log("howdy", userInput);
