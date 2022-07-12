let mainBox = document.querySelector(".mainBox");
let box = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restartBtn");
let newGameBtn = document.querySelector("#newGameBtn");
let circle = `<i class="fa-regular fa-circle"></i>`;
let cross = `<i class="fa-regular fa-x"></i>`;
let playerName = "Player"
let playerSign = cross
let compSign = circle
let isPlayersTurn = false;
let gameFinished = false;

let isMarked = (e1,e2,e3) => {
  if ((e1.innerHTML == e2.innerHTML) && (e2.innerHTML == e3.innerHTML) &&(e1.innerHTML === circle || e1.innerHTML===cross)) {
      return true
  } else {
    return false;
  }
};

let isClicked = (element) => {
    if(element.classList.contains("marked")){
        return true
    }
    else{
        return false
    }
}

let newGame = () => {
  playerName = document.querySelector("#playerName").value
  var sign = document.querySelector('input[name="getSign"]:checked').value;
  if(sign == circle){
    playerSign = circle
    compSign = cross
  }
  if(document.querySelector("#compFirst").checked){
    compsTurn()
  }
  else{
    mainBox.classList.remove("marked")
    isPlayersTurn = true
  }
}

let restart = () => {
  box.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("marked");
    mainBox.classList.remove("marked");
  });
};

let giveMsg = (name) => {
  setTimeout(() => {
    alert(`${name} wins !!!`);
    restart();
  }, 100);
};
let checkWin = () => {
  if (
    (isMarked(box[0],box[1],box[2])) ||
    (isMarked(box[3],box[4],box[5])) ||
    (isMarked(box[6],box[7],box[8])) ||(isMarked(box[0],box[3],box[6])) ||(isMarked(box[0],box[4],box[8])) ||(isMarked(box[1],box[4],box[7])) ||(isMarked(box[2],box[4],box[6])) ||(isMarked(box[7],box[5],box[8])) 
  ) {
    if (isPlayersTurn) {
      giveMsg(playerName);
    
    } 
    
    else {
      giveMsg("Computer");
    }
    return 0;
  }
  else if([...box].every(isClicked)) {
    giveMsg("No_one");
    return 0;
  }
  else{return 1;}
};

let compsTurn = () => {
  let i = Math.floor(Math.random() * 9);

  if (box[i].classList.contains("marked")) {
    compsTurn();
  } else {
    box[i].classList.add("marked");
    box[i].innerHTML = compSign;
    let n = checkWin();
    if (n != 0) {
      mainBox.classList.remove("marked");
    }
  }
};

let playersTurn = (id) => {
    isPlayersTurn = true
  let el = document.getElementById(`${id}`);
  el.innerHTML = playerSign;
  el.classList.add("marked");
  mainBox.classList.add("marked");

  let n = checkWin();

  if (n != 0) {
    isPlayersTurn = false;
    setTimeout(() => {
    compsTurn();
    }, 500);
  }
};

restartBtn.addEventListener("click", restart);
newGameBtn.addEventListener("click", newGame);
