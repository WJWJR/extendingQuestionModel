function Question(text, answer) {
    this.text = text;
    this.answer = answer;
    //this.choices = choices;
}

//This is my MultiChoice Constructor
function MultipleChoiceQuestion(text, answer, choices) {
    Question.call(this, text, answer);
    this.choices = choices;
    //console.log(MultiChoiceQuestion);
}

function ShortAnswerQuestion(text, answer) {
    Question.call(this, text, answer);
}

//this statement creates clone of the Question.prototype which allow the sharedDisplay to work.
MultipleChoiceQuestion.prototype = Object.create(Question.prototype)

//Then I will need to
MultipleChoiceQuestion.prototype.choices = function() {
    this.question = this.question + this.answer + this.choices;
}

//This giveback prototype answers both the Multiple Choice and Short Answers.
Question.prototype.giveFeedback = function (answerWasCorrect, answerSpace) {
  if (answerWasCorrect) {
      answerSpace.textContent = "Damn! Your Smart...";
  } else {
      answerSpace.textContent = "Maybe you might want to attend the Iron Yard!, Im Just saying";
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
/*Below is the condensed version of the origal isCorrect/display*/


MultipleChoiceQuestion.prototype.isCorrect = function(event) {
    let li = event.target;
    let answerSpace = li.parentElement.nextElementSibling;
    let answerWasCorrect = li.textContent === this.answer;
    this.giveFeedback(answerWasCorrect, answerSpace);
    console.log(li.textContent, this.answer);
}
ShortAnswerQuestion.prototype.isCorrect = function(event) {
    let submit = event.target;
    let shortAnswerWe = submit.previousElementSibling;
    let shortAnswerWeInput = shortAnswerWe.value;
    let answerSpace = submit.nextElementSibling;
    let answerWasCorrect = shortAnswerWeInput.toLowerCase() == this.answer.toLowerCase();
    this.giveFeedback(answerWasCorrect, answerSpace);
    console.log(shortAnswerWeInput, this.answer);
}

MultipleChoiceQuestion.prototype.display = function() {
//    let source = document.querySelector(‘#question’).innerHTML;
    this.sharedDisplay('#question', '#quiz article.multiChoice:last-of-type ul');
//    let template = Handlebars.compile(source);
//    let htmlForOne = template(this);
  //  document.querySelector(‘#quiz’).insertAdjacentHTML(‘beforeend’, htmlForOne);
    //document.querySelector(‘#quiz article.multiChoice:last-of-type ul’).addEventListener(‘click’, this.isCorrect.bind(this));
    // this.sharedDisplay(‘#quiz article.multiChoice:last-of-type ul’);
    console.log(document.querySelector("#quiz article.multiChoice ul"));
}

Question.prototype.sharedDisplay = function (selector1, selector2) {
  let source = document.querySelector(selector1).innerHTML;
  let template = Handlebars.compile(source);
  let html = template(this);
  document.querySelector('#quiz').insertAdjacentHTML('beforeend', html);
  let type = document.querySelector(selector2).addEventListener('click', this.isCorrect.bind(this));
}
ShortAnswerQuestion.prototype.display = function() {
    //let source = document.querySelector(‘#shortAnsArticle’).innerHTML;
    this.sharedDisplay('#shortAnsArticle', '#quiz .shortAnswer:last-of-type button.submitButton');
    //let template = Handlebars.compile(source);
    //let htmlForSomethingElse = template(this);
    //document.querySelector(‘#quiz’).insertAdjacentHTML(‘beforeend’, htmlForSomethingElse);
    //document.querySelector(‘#quiz .shortAnswer:last-of-type button.submitButton’).addEventListener(‘click’, this.isCorrect.bind(this));
    // this.sharedDisplay(‘#quiz .shortAnswer:last-of-type button.submitButton’);
    // sharedDisplay(selector1,selector2);
}


//The Fetch to API Below

//Fetch Api Request!! Multiple Choice
fetch("https://opentdb.com/api.php?amount=5&category=28&difficulty=medium&type=multiple")
  .then(response => response.json())
  //.then(jsonData => console.log(jsonData));
  .then(object => object.results)
  //.then(apiDataOnPage)
  .then(apiArr => apiArr.map(apiForMultiDataOnPage))
  .then(apiArr => apiArr.forEach(question => question.display()))
  //.then(jsonData => console.log(jsonData));

//Fetch Api Request!! True/False
  fetch("https://opentdb.com/api.php?amount=5&category=28&difficulty=medium&type=boolean")
    .then(response => response.json())
    //.then(jsonData => console.log(jsonData));
    .then(object => object.results)
    //.then(apiDataOnPage)
    .then(apiArr => apiArr.map(apiForMultiDataOnPage))
    .then(apiArr => apiArr.forEach(question => question.display()))


function apiForMultiDataOnPage(object) {
  //console.log(object)
  return new MultipleChoiceQuestion(object.question,object.correct_answer, object.incorrect_answers)
  //console.log(question);
}


/////////////////////////////////////////////////////////////////////////////////////////////////

/*
uncondensed version - old code.

this.isCorrect = function(event) {
    let li = event.target;
    let answerSpace = li.parentElement.nextElementSibling;
    if (li.textContent === this.answer) {
        answerSpace.textContent = "Yup";
        console.log(questionsAnsweredCorrect);
    } else {
        answerSpace.textContent = "Nope";
    }
    console.log(li.textContent, this.answer);
}
this.isCorrectSA = function(event) {
    let submit = event.target;
    let shortAnswerWe = submit.previousElementSibling;
    let shortAnswerWeInput = shortAnswerWe.value;
    let yourAnswer = submit.nextElementSibling;
    if (shortAnswerWeInput.toLowerCase() == this.answer.toLowerCase()) {
        yourAnswer.textContent = 'Damn! Your Smart...';
    } else {
        yourAnswer.textContent = 'Maybe you might want to attend the Iron Yard!, Im Just saying';
    }
    console.log(shortAnswerWeInput, this.answer);
}

this.display = function() {
    let source = document.querySelector('#question').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(this);
    document.querySelector('#quiz').insertAdjacentHTML('beforeend', html);
    document.querySelector('#quiz article.multiChoice:last-of-type ul').addEventListener('click', this.isCorrect.bind(this));
    console.log(document.querySelector('#quiz article.multiChoice ul'));
}

this.displaySA = function() {
    let source = document.querySelector('#shortAnsArticle').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(this);
    document.querySelector('#quiz').insertAdjacentHTML('beforeend', html);
    document.querySelector('#quiz .shortAnswer:last-of-type button.submitButton').addEventListener('click', this.isCorrectSA.bind(this));
}
console.log(document.querySelector('#quiz .shortAnswer:last-of-type button.submitButton'));
}

*/
