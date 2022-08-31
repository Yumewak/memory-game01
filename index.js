// Project finished in 7 Hours and 14 Minutes
var colorPalette = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var gameLevel = 0;
var gameStart = false;
var evaluatePosition = 0;

// Start Game
$(document).keydown(function() {
  if (gameStart === false) {
    gameSequence();
  }
});
$("h1").click(function() {
  if(gameStart === false) {
    gameSequence();
  }
})

// Game Sequence
function gameSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colorPalette[randomNumber];
  $("h1").text("Memorized colors: " + gameLevel);
  gamePattern.push(randomColor);
  flasClick(randomColor);
  gameLevel++;
  userPattern = [];
  gameStart = true;
  console.log("Game pattern: " + gamePattern);
}

// User Sequence
$("button").click(function() {
  var userColor = $(this).attr("class").split(/\s+/)[0];
  flasClick(userColor);
  userPattern.push(userColor);
  evaluateArray();
  console.log("User pattern: " + userPattern)
});

// Compare the User and Game Color Patterns
function evaluateArray() {
  if (gamePattern[evaluatePosition] !== userPattern[evaluatePosition]) {
    $("h1").text("Game Over, you memorized: " + (gameLevel - 1));
    flashGameOver();
    gameStart = false;
    gameLevel = 0;
    gamePattern = [];
  } else if (gamePattern.length === userPattern.length) {
    setTimeout(() => {
      gameSequence();
      evaluatePosition = 0;
    }, 450);
  }
  evaluatePosition++
  console.log(evaluatePosition)
}

// Animation and Sound
function flasClick(colorTarget) {
  var audio = new Audio ("./sounds/" + colorTarget + ".mp3");
  audio.play();
  $("." + colorTarget).attr("id", "f" + colorTarget);
  setTimeout(() => {
    $("." + colorTarget).attr("id", "");
  }, 200);
}
function flashGameOver() {
  var i = 0;
  while (i < 5) {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("gameOverOne");
    setTimeout(() => {
      $("body").removeClass("gameOverOne");
    }, 100);
    i++;
  }
}