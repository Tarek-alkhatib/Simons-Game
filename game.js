//initial variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("h1").text("Game Over, Press Any Key to Restart.");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    playSound("wrong");
    startOver();
  }
}

function startOver(){
   gamePattern = [];
   started = false;
   level = 0;
}


function nextSequence() {
  userClickedPattern=[];
  level++;
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  $("h1").text("level " + level);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
