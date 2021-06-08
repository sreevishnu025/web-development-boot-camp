
    
        var randNum1= Math.floor(Math.random()*6)+1;
        var randNum2= Math.floor(Math.random()*6)+1;

        document.querySelectorAll(".img")[0].setAttribute("src","images/dice"+randNum1+".png");
        document.querySelectorAll(".img")[1].setAttribute("src","images/dice"+randNum2+".png");
        
        if(randNum1>randNum2) document.querySelector("h1").innerHTML = "<em>🚩 Player 1 Wins!</em>";
        else if (randNum2>randNum1) document.querySelector("h1").innerHTML= "<em>Player 2 Wins! 🚩</em>";
        else document.querySelector("h1").innerText = "Draw!";