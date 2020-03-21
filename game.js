var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern,length-1);
});

 function nextSequence() {
   userClickedPattern = [];
   level++;
   $("#level-title").text("Level "+level);

   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
};

function playSound(name) {
  var location = "./sounds/"+name+".mp3";
  var randomAudio = new Audio(location);

  randomAudio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTmeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-header").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
