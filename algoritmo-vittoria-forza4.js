var w = 7;
var h = 6;
var mat = new Array();

function simulaPartita() {
    azzeraGriglia();

    grigliaRandom();

    controllaVittoria();

}

function controllaVittoria(posW, posH, nColore) {
    
    var cont = 0;

    //orizzontale
    for(var i = posH; i < w-4; i++) {
        //controllo il blocco di 4
        if(mat[posW][i] == nColore) cont++;
        if(mat[posW][i+1] == nColore) cont++;
        if(mat[posW][i+2] == nColore) cont++;
        if(mat[posW][i+3] == nColore) cont++;

        //controllo se ha vinto
        if (cont == 4) return true;
        else cont = 0;
    }
    
    //verticale
    for(var i = posW; i < h-4; i++) {
        //controllo il blocco di 4
        if(mat[i][posH] == nColore) cont++;
        if(mat[i+1][posH] == nColore) cont++;
        if(mat[i+2][posH] == nColore) cont++;
        if(mat[i+3][posH] == nColore) cont++;

        //controllo se ha vinto
        if (cont == 4) return true;
        else cont = 0;
    }

    //diagonale
    //distanza dal bordo
    var escursioneW;
    var escursioneH;

    //trova distanza dal bordo (lateralmente)
    if(posW+3 >= w)
        if(posW+2 >= w)
            if(posW+1 >= w)
                escursioneW = 0;
            else escursioneW = 1;
        else escursioneW = 2;
    else escursioneW = 3;
    //trova distanza dal bordo (verticalmente)
    if(posH+3 >= w)
        if(posH+2 >= w)
            if(posH+1 >= w)
                escursioneH = 0;
            else escursioneH = 1;
        else escursioneH = 2;
    else escursioneH = 3;
    //controllo
    for(var i = 0; i < escursioneW; i++) {

    }
    
}

function grigliaRandom() {
    for(var i = 0; i < h; i++) {
        for(var j = 0; j < w; j++) {
            if(Math.random() % 2 == 0)
                mat[j][h] == 2;
            else mat[j][h] == 1;
        }
    }
}

function azzeraGriglia() {
    for(var i = 0; i < h; i++) {
        for(var j = 0; j < w; j++) {
            mat[j][h] == 0;
        }
    }
}