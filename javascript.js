var board = new Array();
var righeTot = 6;
var colonneTot = 7;
var turno = true; //true = turno giallo
var vittoria = 0; //0 partita non finita, 1 vittoria, 2 pareggio
var mosse = 0;

//funzione per hover
function hover() {
  var myBtn = $(".btn");

  myBtn.mouseenter(function() {
    if (turno) {
      myBtn.filter(".yellowCoin").removeClass("yellowCoin");
      $(this).addClass("yellowCoin");
    } else {
      myBtn.filter(".redCoin").removeClass("redCoin");
      $(this).addClass("redCoin");
    }
  });

  myBtn.mouseleave(function() {
    if (turno) myBtn.removeClass("yellowCoin");
    else myBtn.removeClass("redCoin");
  });
}
$(document).ready(hover);

function azzeraGriglia() {
  //pone a 0 la matrice
  for (var i = 0; i < colonneTot; i++) {
    for (var j = 0; j < righeTot; j++) {
      board[j][i] = 0;
    }
  }
}

function preparaMatrice() {
  //funzione per creare la matrice
  for (let i = 0; i < righeTot; i++) {
    board[i] = new Array();
  }
  azzeraGriglia();
}

// funzione main che viene richiamata con il click su uno qualsiasi dei 6 buttoni
$.fn.playFunct = function() {
  var id = $(this).attr("id"); //qua prendo l'id del bottone che è stato cliccato
  var colonna = Number(id); //mentre qua trasformo l' id appena ottenuto in numero
  incrementaMosse();
  //cosi facendo(visto che i bottoni hanno l'id 1,2,3 ...) ottengo la colonna dove verrà inserita la moneta
  var varforCheckWin = setCoinInTable(colonna); //contine riga colonna e colore del coin

  if (turno) $(".btn").removeClass("yellowCoin");
  else $(".btn").removeClass("redCoin");
  turno = !turno; //cambio il turno da giallo a rosso e viceversa

  vittoria = checkWin(varforCheckWin[0], varforCheckWin[1], varforCheckWin[2]);

  if (vittoria != 0) {
    var coinId = "#" + varforCheckWin[0] + "-" + colonna;
    turno = !turno;
    if (turno) {
      $(coinId).addClass("yellowCoin");
    } else {
      $(coinId).addClass("redCoin");
    }
    setTimeout(function() {
      if (turno) showDivWin(1);
      else showDivWin(2);
      vittoria = 0;
      turno = true;
    }, 200);
  }
};

//funzione che visualizza il coin in output e lo inserisce nella matrice
function setCoinInTable(colonna) {
  for (var i = 0; i < righeTot; i++) {
    var divId = "#" + i + "-" + colonna; //qua se non lo capisci poi te lo spiego
    if (!($(divId).hasClass("yellowCoin") || $(divId).hasClass("redCoin"))) {
      if (turno) {
        $(divId).addClass("yellowCoin");
        board[i][colonna] = 1;

        var varforCheckWin = [i, colonna, 1];
        return varforCheckWin;
      } else {
        $(divId).addClass("redCoin");
        board[i][colonna] = 2;

        var varforCheckWin = [i, colonna, 2];
        return varforCheckWin;
      }
    }
  }
}

function resetBoard() {
  azzeraGriglia();
  mosse = 0;
  for (var j = 0; j < colonneTot; j++) {
    for (var i = 0; i < righeTot; i++) {
      var divId = "#" + i + "-" + j;
      $(divId).removeClass("yellowCoin");
      $(divId).removeClass("redCoin");
    }
  }
}

function checkWin(y, x, nColore) {
  //controllo per pareggio
  if (mosse == righeTot * colonneTot) return 2;

  //orizzontale
  for (var i = 0; i < colonneTot - 3; i++) {
    //controllo il blocco di 4
    if (board[y][i] == nColore)
      if (board[y][i + 1] == nColore)
        if (board[y][i + 2] == nColore)
          if (board[y][i + 3] == nColore) {
            return 1;
          }
  }

  //verticale
  for (var i = 0; i < righeTot - 3; i++) {
    //controllo il blocco di 4
    if (board[i][x] == nColore)
      if (board[i + 1][x] == nColore)
        if (board[i + 2][x] == nColore)
          if (board[i + 3][x] == nColore) {
            return 1;
          }
  }

  //limite
  var limX;
  var limY;
  var lim;

  //limite X
  if (x + 3 >= colonneTot)
    if (x + 2 >= colonneTot)
      if (x + 1 >= colonneTot)
        limX = 0;
      else limX = 1;
    else limX = 2;
  else limX = 3;
  //limite Y 
  if (y + 3 >= righeTot)
    if (y + 2 >= righeTot)
      if (y + 1 >= righeTot)
        limY = 0;
      else limY = 1;
    else limY = 2;
  else limY = 3;
  //trovo il limite
  if (limX < limY)
    lim = limX;
  else
    lim = limY;

    //diagonale (alto basso)
    for (var i = lim; i >= 0; i--) {
      if (board[y+i][x+i] == nColore)
        if (board[y+i-1][x+i-1] == nColore)
          if (board[y+i-2][x+i-2] == nColore)
            if (board[y+i-3][x+i-3] == nColore) {
              return 1;
            }
    }
  
    //limite Y (dal basso)
    if (y - 3 < 0)
      if (y - 2 < 0)
        if (y - 1 < 0)
          limY = 0;
        else limY = 1;
      else limY = 2;
    else limY = 3;
    //trovo il limite
    if (limX < limY)
      lim = limX;
    else
      lim = limY;

    //diagonale (basso alto)
    for (var i = 0; i <= 3; i++) {
      if (board[y-i][x+i] == nColore)
        if (board[y-i+1][x+i-1] == nColore)
          if (board[y-i+2][x+i-2] == nColore)
            if (board[y-i+3][x+i-3] == nColore) {
              return 1;
            }
    }

  return 0;
}

function showDivWin(colorWin) {
  document.getElementById("box").style.display = "none";
  document.getElementById("divBtn").style.display = "none";
  document.getElementById("divWin").style.display = "block";
  if (vittoria == 1) {
    if (colorWin == 1)
      document.getElementById("pWin").innerHTML = "Vince il giocatore giallo";
    else document.getElementById("pWin").innerHTML = "Vince il giocatore rosso";
  } else {
    document.getElementById("pWin").innerHTML = "Pareggio";
  }
  document.getElementById("pMosseTot").innerHTML = "Mosse fatte " + mosse;
}

function showDivBox() {
  resetBoard();
  document.getElementById("divWin").style.display = "none";
  document.getElementById("box").style.display = "block";
  document.getElementById("divBtn").style.display = "block";
}

function incrementaMosse() {
  mosse++;
}