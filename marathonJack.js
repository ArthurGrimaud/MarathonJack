

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
  console.log(rand);
  return rand;
}

function createImg(path,div) {
  var img = document.createElement('img');
  img.src = path;
  return img;
}

function displayNewCard(cardValue,div) { //arg : div : balise "div dans laquelle la carte est crée"
  var path = "img/" + cardValue + ".BMP";
  console.log(path);
  var newImg = createImg(path);
  var divJS = document.getElementById(div);
  divJS.appendChild(newImg);
  return cardValue
}

/* Listeners */

function setupListener(){
  console.log(buttonCard)
  buttonCard.addEventListener("click",function(){card(playerCardsSumValue,cardList,pickedCards)});
  buttonStay.addEventListener("click",function(){})
}

/* gameManager */

function resetTurn(){
  var playerCardsSumValue = 0
  var dealerCardsSumValue = 0
  document.getElementById("ddiv").innerHTML = "";
  document.getElementById("ydiv").innerHTML = "";
}

function card(playerCardsSumValue,cardList,pickedCards){
  playerCardsSumValue = playerCardsSumValue + displayNewCard(drawCard(cardList,pickedCards),"ydiv")
  labelSumPlayer.innerHTML = playerCardsSumValue;
}




setupListener();
