

var buttonCard = document.getElementById("buttonCard");
var buttonStay = document.getElementById("buttonStay");

var labelSumDealer = document.getElementById("sumDealerCards");
var labelSumPlayer = document.getElementById("sumPlayerCards");

var betarea = document.getElementById("bet");

var buttonContinue = document.getElementById("continue");
var buttonLeave = document.getElementById("leave");

var labelResult = document.getElementById("result");
var labelMoney = document.getElementById("money");

var buttonHelp=document.getElementById("buttonHelp");

var playerCardsSumValue = 0;
var dealerCardsSumValue = 0;

var dealerDistracted = true;

var money = 1000;
var bet = 0;

var cardList = [...Array(53).keys()];
var pickedCards = [];  //Carte deja tirees
var nbCard = 52

var isHelpHide = true;

/* Tirer un carte et affichage  */

function drawCard(cardList,pickedCards){
  var rand = Math.floor(Math.random() * (nbCard)) + 1;
  while (pickedCards.includes(rand)){ // si la carte a deja ete tiree
    rand = Math.floor(Math.random() * (nbCard)) + 1; //une autre carte est choisie
  }
  pickedCards.push(rand); // on ajoute la carte tiree au carte deja tiree
  return rand;
}

function createImg(path,div) { //crée un objet image de class .card
  var img = document.createElement('img');
  img.setAttribute("class", "cards");
  img.src = path;
  return img;
}

function displayNewCard(cardID,div) { //arg : div : balise "div dans laquelle la carte est crée"
  var path = "img/" + cardID + ".BMP";
  var newImg = createImg(path);
  var divJS = document.getElementById(div);
  divJS.appendChild(newImg);
  return cardID;
}

function getCardValue(cardID,sumScore){ //retourne la valeur du carte en fonction du nom de sont image
  console.log("cardID"+cardID);
  var cardIDbis ;
  cardIDbis = cardID;

  for(var i=1 ; i<10 ; i++ ){
    console.log("cardIDbis"+cardIDbis);
    if (cardIDbis<14){

      if (cardIDbis == 1){
        if(sumScore >29){
          return 1; //si l'as fait deppaser 42
        }else{
          return 11; // si l'as ne fait pas depasser 42
        }
      }
      if (9 < cardIDbis && cardIDbis < 14){
        return 10; // les tetes
      }
      else{
        return cardIDbis; //cartes de 2 a 10
      }
    }
    cardIDbis = cardIDbis - 13;
  }
}
/* Listeners */

function setupListener(){
  buttonCard.addEventListener("click",function(){cardActionManager(cardList,pickedCards)});
  buttonStay.addEventListener("click",function(){dealerActionManager(cardList,pickedCards)});
  buttonContinue.addEventListener("click",function(){resetTurn()});
  buttonHelp.addEventListener("click",function(){helpBtn()})
  buttonLeave.addEventListener("click",function(){resetTurn()});
}

/* Initialisation */

function resetTurn(){
  document.getElementById("ddiv").innerHTML = "";
  document.getElementById("ydiv").innerHTML = "";
  playerCardsSumValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue);
  dealerCardsSumValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ddiv"),dealerCardsSumValue);
  bet = betarea.value
  enableButtons();
}

function disableButtons(){
  buttonCard.disabled = true;
  buttonStay.disabled = true;
  buttonLeave.disabled = false;
  buttonContinue.disabled = false;

}

function enableButtons(){
  buttonCard.disabled = false;
  buttonStay.disabled = false;
  buttonLeave.disabled = true;
  buttonContinue.disabled = true;
}


/* gameManager */

function cardActionManager(cardList,pickedCards){
  var cardScore = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue);
  playerCardsSumValue = playerCardsSumValue + cardScore;
  labelSumPlayer.innerHTML = String(playerCardsSumValue);
  if (playerCardsSumValue > 42){
    console.log("PERDU");
    loose();
  }
  if (playerCardsSumValue == 42){
    console.log("Marathon Jack");
    win();
  }
  isDealerDistracted();
}

function dealerActionManager(cardList,pickedCards){

  while (dealerCardsSumValue<=playerCardsSumValue){
    var cardScore = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ddiv"),playerCardsSumValue);
    dealerCardsSumValue = dealerCardsSumValue + cardScore;
    labelSumDealer.innerHTML = String(dealerCardsSumValue);
  }

  if(dealerCardsSumValue<43){
    loose()
  }
  else{
    win()
  }



  }


/* round end  */

function win(){
  disableButtons();
  labelResult.innerHTML = "You win this turn"
  money =  money + bet;
  labelMoney.innerHTML = String(money);
}

function loose(){
  disableButtons();
  labelResult.innerHTML = "You loose this turn"
  money = money - bet;
  labelMoney.innerHTML = String(money);
}

/*  Help   */

function helpBtn () {
  var hlp = document.createElement("div");
  console.log(isHelpHide);
  if(isHelpHide){
    var hlp = document.createElement("div");
    hlp.setAttribute("class","helpeffect");
    hlp.setAttribute("id","helpDiv");

    var bdy = document.getElementById("body");
    bdy.appendChild(hlp);

    var newContent = document.createTextNode("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
    hlp.appendChild(newContent);
    isHelpHide = false;
  }else{
    var help = document.getElementById("helpDiv")
    help.parentNode.removeChild(help);
    isHelpHide = true;
  }
}

/* sleep  */

function sleep(seconds){
    var waitUntil = new Date().getTime() + seconds*1000;
    while(new Date().getTime() < waitUntil) true;
}

/* progress bar */

function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}


/* Cheating */


function isDealerDistracted(){

  var disctractedDuration = Math.floor(Math.random() * (3000)) + 300;

}

document.addEventListener('keydown', function(event){
  if(event.keyCode == 32) {
    if(dealerDistracted == true){
      console.log("Cheating succesfully");
    }
    else{
      console.log("You have been Caught");
    }
  }
} );

setupListener();
isDealerDistracted();
move();
