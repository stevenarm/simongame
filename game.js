
var buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userSelection = [];
var numberOfFlashes = 0;
let userClicks = 0;
let gameStart = false;

function nextSequence() {
  var randomNumber = Math.floor (Math.random() * 4);
  return randomNumber;
}

//Check for any Key
$(document).keypress(function(event) {
  console.log(event.key);

if (!gameStart) {
    createSequence();
    gameStart = true;
}

  // let continueGame = true;
  // while (continueGame) {
  //
  //   continueGame = detectResponse();
  //   numberOfFlashes++;
  // }

});

// Detect responses from user
$(".btn").click(function(event) {
  var buttonId = this.id;
  userSelection.push(buttonId);
  userClicks++;
  displayFlash(buttonColors.indexOf(buttonId));
  checkUserAnswer();
  // $(`.${buttonId}`).addClass("pressed");
  // $(`#${buttonId}audio`)[0].play();
  // setTimeout(function () { $(`.${buttonId}`).removeClass("pressed");}, 100);
  // Check for correct sequence


    // console.log(userSelection);
});

function checkUserAnswer() {
  if (gameStart) {
    if (gamePattern[userClicks-1] === userSelection[userClicks-1]) {
      if (userClicks === numberOfFlashes) {
        setTimeout(function () {createSequence();}, 1000);
        userClicks = 0;
        userSelection.length = 0;
      }
    } else {
      //game end code
      $("#level-title").text("Game Over Press Any Key to Try Again");
      gameStart = false;
      userClicks = 0;
      numberOfFlashes = 0;
      gamePattern.length = 0;
      userSelection.length = 0;
      playSound("wrong");
    }
  }
}
//Play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}
//Display a sequence of flashes
function displayFlash(num) {
  $(`.${buttonColors[num]}`).addClass("pressed");
  $(`#${buttonColors[num]}audio`)[0].play();
  setTimeout(function () { $(`.${buttonColors[num]}`).removeClass("pressed");
}, 100);
}

function createSequence() {
  var nextNum = nextSequence();
  gamePattern.push(buttonColors[nextNum]);
  //displayFlash(nextNum);
  $("#" + buttonColors[nextNum]).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(buttonColors[nextNum]);
  numberOfFlashes++;
  $("#level-title").text("Level " + numberOfFlashes);
  }


function detectResponse () {
  for (var i = 0; i < numberOfFlashes; i++){
    $(".btn").click(function(event) {
      var buttonId = this.id;
      if (buttonId != buttonColors[gamePattern[i]]) {
        return false;
      }

    });
  }
  return true;
}

//Read input and check to see if sequence matches
