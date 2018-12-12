

var buttonCard = document.getElementById("buttonCard");
var buttonStay = document.getElementById("buttonStay");

var labelSumDealer = document.getElementById("sumDealerCards");
var labelSumPlayer = document.getElementById("sumPlayerCards");

var betarea = document.getElementById("bet");

var buttonContinue = document.getElementById("continue");
var buttonLeave = document.getElementById("leave");

var labelResult = document.getElementById("result");
var labelMoney = document.getElementById("money");

var playerCardsSumValue = 0;
var dealerCardsSumValue = 0;

var money = 1000;
var bet = 100;

var cardList = [...Array(53).keys()];
var pickedCards = [];  //Carte deja tirees
var nbCard = 52

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
  buttonLeave.addEventListener("click",function(){resetTurn()});
}

/* Initialisation */

function resetTurn(){
  document.getElementById("ddiv").innerHTML = "";
  document.getElementById("ydiv").innerHTML = "";
  playerCardsSumValue = 0;
  dealerCardsSumValue = 0;
  playerCardsSumValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue);
  dealerCardsSumValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ddiv"),dealerCardsSumValue);
  bet = betarea.value;
  enableButtons();
  labelSumPlayer.innerHTML = " ";
  labelSumDealer.innerHTML = " ";
  labelResult.innerHTML = "Playing...";
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
}

function dealerActionManager(cardList,pickedCards){

  var previousDealerCardsSumValue = 0;

  while (dealerCardsSumValue)

  previousDealerCardsSumValue = dealerCardsSumValue




    }
  }
}

/* round end  */

function win(){
  disableButtons();
  labelResult.innerHTML = "You win this turn";
  var money =  money + bet;
  labelMoney.innerHTML = String("money :"+money);
}

function loose(){
  disableButtons();
  labelResult.innerHTML = "You win";
  var money = money - bet;
  labelMoney.innerHTML = String("money :"+money);
}


setupListener();
resetTurn();
