function Question(questionText){
    this.questionText = questionText;
}

function Answers(answerText){
    this.answerText = answerText;
}

function QuestionAnswerPair(question, correctAnswer, answerChoice){

    this.question = question;
    this.correctAnswer = correctAnswer;
    this.answerChoice = answerChoice;
    
    this.isACorrectAnswer = function(userAswer){
        if(this.correctAnswer.answerText === userAswer){
            return true;
        }
        else{
            return false;
        }
    }
}


function Quiz(qaPairArray){

    this.pageIndex = 0;
    this.score = 0;
    this.qaPairArray = qaPairArray;

    this.load = function(){    
        this.displayQuizPage();
        this.attachingListeners();
    }

    this.attachingListeners = function(){

        let currentObject = this;

        for(let i = 0; i < 4; i++){

            document.getElementById("btn" + i).onclick = function(event){
                
                let userProvidedAnswer = event.currentTarget.innerText;
                let qaPairObject = currentObject.qaPairArray[currentObject.pageIndex];
                let outcome = qaPairObject.isACorrectAnswer(userProvidedAnswer);

                if(outcome){
                    currentObject.incrementScore();
                }

                currentObject.next();
            }
        }
    }

    this.incrementScore = function(){
        this.score++;
    }

    this.next = function (){
        if(this.isLastQAPair()){
            this.displaFinalScore();
        }
        else{
            this.pageIndex++;
            this.displayNextQAPairPage();
        }
    }

    this.isLastQAPair = function(){
        if(this.pageIndex === (this.qaPairArray.length - 1)){
            return true;
        }
        else{
            return false;
        }
    }

    this.displayNextQAPairPage = function(){
        this.displayQuizPage();
        this.attachingListeners();
    }

    this.displayQuizPage = function(){
        let qaPair = this.qaPairArray[this.pageIndex];

        document.getElementById("question").innerText = qaPair.question.questionText;

        for(var i = 0; i < qaPair.answerChoice.length; i++){
            document.getElementById("choice" + i).innerText = qaPair.answerChoice[i].answerText;
        }

        this.displayProgressSection();
    }

    this.displayProgressSection = function(){
        document.getElementById("progress").innerText = `Question ${this.pageIndex+1} of ${this.qaPairArray.length}`;
    }

    this.displaFinalScore = function(){

        let percentage = (this.score / this.qaPairArray.length) * 100;

        document.getElementById("quiz").innerHTML = `
        <h1>Result</h1>
        <p id='question'> Your scored ${this.score} out of ${this.qaPairArray.length}. <br> Mark Percentage is ${percentage}% </p>

        <button id="restartBtn">Retest</button>
        `; 
        
        let currentObject = this;

        document.getElementById("restartBtn").onclick = function(){
            currentObject.retest();
        }

        this.retest = function(){
            document.getElementById("quiz").innerHTML =
            `<h1>Javascript Quiz</h1>
            <hr style="margin-bottom: 20px">
 
            <p id="question"></p>
 
            <div class="buttons">
                <button id="btn0"><span id="choice0"></span></button>
                <button id="btn1"><span id="choice1"></span></button>
                <button id="btn2"><span id="choice2"></span></button>
                <button id="btn3"><span id="choice3"></span></button>
            </div>
 
            <hr style="margin-top: 50px">
            <footer>
                <p id="progress">Question x of y</p>
            </footer>`;
            
            this.pageIndex = 0;
            this.score = 0;
            this.load();
        }
    }
}

let q1 = new Question("JavaScript supports");
let q2 = new Question("Which language is used for styling web pages?");
let q3 = new Question("Which is not a JavaScript Framework?");
let q4 = new Question("Which is used for Connect To Database?");
let q5 = new Question("JavaScript is a");

let a1 = new Answers("Functions");
let a2 = new Answers("CSS");
let a3 = new Answers("Django");
let a4 = new Answers("PHP");
let a5 = new Answers("Programming Language");

let qaPair1 = new QuestionAnswerPair(q1, a1, [a1, new Answers("XHTML"), new Answers("CSS"), new Answers("HTML") ]);
let qaPair2 = new QuestionAnswerPair(q2, a2, [new Answers("HTML "), new Answers("JQuery"), a2, new Answers("XML") ]);
let qaPair3 = new QuestionAnswerPair(q3, a3, [new Answers("Python Script"), new Answers("JQuery"), a3, new Answers("NodeJs") ]);
let qaPair4 = new QuestionAnswerPair(q4, a4, [a4, new Answers("HTML"), new Answers("JS"), new Answers("All") ]);
let qaPair5 = new QuestionAnswerPair(q5, a5, [new Answers("Language"), a5, new Answers("Development "), new Answers("All") ]);

let quiz = new Quiz([qaPair1, qaPair2, qaPair3, qaPair4, qaPair5]);
quiz.load();