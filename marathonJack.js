

var buttonCard = document.getElementById("buttonCard");
var buttonStay = document.getElementById("buttonStay");

var labelSumDealer = document.getElementById("sumDealerCards");
var labelSumPlayer = document.getElementById("sumPlayerCards");

var playerCardsSumValue = 0
var dealerCardsSumValue = 0

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

function createImg(path,div) {
  var img = document.createElement('img');
  img.src = path;
  return img;
}

function displayNewCard(cardID,div) { //arg : div : balise "div dans laquelle la carte est crée"
  var path = "img/" + cardID + ".BMP";
  var newImg = createImg(path);
  var divJS = document.getElementById(div);
  divJS.appendChild(newImg);
  return cardID
}

function getCardValue(cardID,sumScore){
  console.log("cardID"+cardID);
  var cardIDbis ;
  cardIDbis = cardID;

  for(var i=1 ; i<10 ; i++ ){
    console.log("cardIDbis"+cardIDbis);
    if (cardIDbis<14){

      if (cardIDbis == 1){
        if(sumScore >29){
          return 1
        }else{
          return 11
        }
      }
      if (9 < cardIDbis && cardIDbis < 14){
        return 10;
      }
      else{
        return cardIDbis;
      }
    }
    cardIDbis = cardIDbis - 13;
  }
}
/* Listeners */

function setupListener(){
  buttonCard.addEventListener("click",function(){card(playerCardsSumValue,cardList,pickedCards)});
  buttonStay.addEventListener("click",function(){});
}

/* gameManager */

function resetTurn(){
  var playerCardsSumValue = 0;
  var dealerCardsSumValue = 0;
  document.getElementById("ddiv").innerHTML = "";
  document.getElementById("ydiv").innerHTML = "";
}

function card(playerCardsSumValue,cardList,pickedCards){
  console.log("general"+getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue));
  //var cardValue = getCardValue(displayNewCard(drawCard(cardList,pickedCards),"ydiv"),playerCardsSumValue);
  //playerCardsSumValue = playerCardsSumValue + cardValue;
  //labelSumPlayer.innerHTML = playerCardsSumValue;
}




setupListener();
