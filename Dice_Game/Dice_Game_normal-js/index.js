var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6
// alert(randomNumber1);
var randomDiceimage1 = "images/dice" + randomNumber1 + ".png"; //dice1.png - dice6.png
// alert(randomDiceimage);

var playerFirst = document.querySelector("img.img1").setAttribute("src", randomDiceimage1);



var randomNumber2 = Math.floor(Math.random() * 6) + 1; //1-6
// alert(randomNumber1);
var randomDiceimage2 = "images/dice" + randomNumber2 + ".png"; //dice1.png - dice6.png
// alert(randomDiceimage);

var playersecond = document.querySelector("img.img2").setAttribute("src", randomDiceimage2);


function winner() {
    if(randomNumber1 > randomNumber2){
        document.querySelector(" h1").innerHTML = "player 1 wins";
    }else if(randomNumber1 < randomNumber2){
        document.querySelector(" h1").innerHTML = "player 2 wins";
    }else if(randomNumber1 === randomNumber2){
        document.querySelector(" h1").innerHTML = "Draw";
    }

}
winner();
