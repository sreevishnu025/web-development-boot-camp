
for(var i=0; i<document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function (){
        var btnInnerHtml = this.innerHTML;
        keySound(btnInnerHtml);
        btnAnimation(btnInnerHtml);
    });
}

document.addEventListener("keypress", function (e){
    keySound(e.key);
    btnAnimation(e.key);
});

function keySound(key){
    switch(key){
        case "w":
            var aud = new Audio("sounds/tom-1.mp3");
            aud.play();
        break;

        case "a":
            var aud = new Audio("sounds/tom-2.mp3");
            aud.play();
        break;

        case "s":
            var aud = new Audio("sounds/tom-3.mp3");
            aud.play();
        break;

        case "d":
            var aud = new Audio("sounds/tom-4.mp3");
            aud.play();
        break;

        case "j":
            var aud = new Audio("sounds/snare.mp3");
            aud.play();
        break;

        case "k":
            var aud = new Audio("sounds/crash.mp3");
            aud.play();
        break;

        case "l":
            var aud = new Audio("sounds/kick.mp3");
            aud.play();
        break;
        

    }
}
function btnAnimation(key){
  var drumBtn =  document.querySelector("."+key);
    drumBtn.classList.add("pressed");
    setTimeout(function (){
        drumBtn.classList.remove("pressed");
    },100);


}

