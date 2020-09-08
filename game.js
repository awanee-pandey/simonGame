var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started =false;
var buttonColours =["red","blue","green","yellow"];

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function(){
    if(!started){
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " +level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
  });

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    //inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomeNumnber = Math.floor(Math.random() * 4);

    //Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomeNumnber];

    //add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

}

function playsound(name){
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play(); 
}

function animatePress(currentColour)
{
    $("#" +currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" +currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern.currentLevel === userClickedPattern.currentLevel){
        console.log("success");
        
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }else{
        playsound("wrong");
        //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 100);
        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        }
    }
}  

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}