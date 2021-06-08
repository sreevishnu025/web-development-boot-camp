
var level=0, count,randChosenColour;
var userChosenPattern=[];
var btnColors = ["red","blue","green","yellow" ];
var gamePattern=[];
function nextSeq(){ return Math.floor(Math.random()*4); }

function checkGame(){
    if(userChosenPattern.length == level){
    if(JSON.stringify(gamePattern) == JSON.stringify(userChosenPattern)) runGame();
    else {
        $("h1").text("Game over");
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        level = 0;
        gamePattern=[];
        userChosenPattern=[];
    }}
    else{
        if(JSON.stringify(gamePattern.slice(0,count))!=JSON.stringify(userChosenPattern)) {
            $("h1").text("Game over");
            var aud = new Audio("sounds/wrong.mp3");
            aud.play();
            level = 0;
            gamePattern=[];
            userChosenPattern=[];
        }
    }
    
}

$(document).keypress(runGame);

function runGame(){
        count=0;
        level++;
        userChosenPattern = [];
        $("h1").text("Level "+level);
        randChosenColour = btnColors[nextSeq()]
        gamePattern.push(randChosenColour);
        var aud = new Audio("sounds/"+randChosenColour+".mp3");
        aud.play();
        $("#"+randChosenColour).fadeOut(50).fadeIn(50);
    
}
$(".btn").click(clickedColor);    
function clickedColor(){
    count++;
    userChosenPattern.push(this.id);
    checkGame();
}




