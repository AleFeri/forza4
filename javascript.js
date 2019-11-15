var board = new Array();
var righeTot = 6;
var colonneTot = 7;
var turno = true; //true = turno giallo

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
  //cosi facendo(visto che i bottoni hanno l'id 1,2,3 ...) ottengo la colonna dove verrà inserita la moneta

  setCoinInTable(colonna);

  turno = !turno; //cambio il turno da giallo a rosso e viceversa

  // questa funzione serve a noi se vuoi vedere il contenuto della matrice(poi si leverà)
  document.getElementById("text").innerHTML = JSON.stringify(board, null, 4);
};

//funzione che visualizza il coin in output e lo inserisce nella matrice
function setCoinInTable(colonna) {
  for (var i = 0; i < righeTot; i++) {
    var divId = "#" + i + "-" + colonna; //qua se non lo capisci poi te lo spiego
    if (!($(divId).hasClass("yellowCoin") || $(divId).hasClass("redCoin"))) {
      if (turno) {
        $(divId).addClass("yellowCoin");
        board[i][colonna] = 1;
      } else {
        $(divId).addClass("redCoin");
        board[i][colonna] = 2;
      }
      break;
    }
  }
}

//? da fare function checkWin(){}
