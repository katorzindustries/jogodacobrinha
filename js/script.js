var canvas;
var direcao;
var velocidade;
var cobrinha;

var reiniciarGame;
var animacao;
var verificacaoCobrinha;
var ativadorVerficador;

function pararJogo() {
    clearInterval(animacao);
    canvas.drawText({
        fillStyle: '#170',
        fontStyle: 'bold',
        fontSize: '30pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Você perdeu!',
        x: 300,
        y: 200,
        align: 'center',
        maxWidth: 300,
        lineHeight: 2
    });
}




function desenhaPlayer(xCabeca, yCabeca) {

    canvas.drawRect({
        fillStyle: '#910',
        shadowColor: '#000',
        shadowBlur: 4,
        x: xCabeca,
        y: yCabeca,
        width: 10,
        height: 10
    });
    for (var i = 1; i < cobrinha.length; i++) {
        canvas.drawRect({
            fillStyle: '#190',
            x: cobrinha[i][0],
            y: cobrinha[i][1],
            width: 10,
            height: 10
        });
    }

}

function atualizaCobrinha(xCabeca, yCabeca) {
    cobrinha[0][0] = xCabeca;
    cobrinha[0][1] = yCabeca;
    for (var i = cobrinha.length - 1; i >= 1; i--) {
        cobrinha[i][0] = cobrinha[i - 1][0];
        cobrinha[i][1] = cobrinha[i - 1][1];

    }
    console.log(cobrinha.length);

}

function verificaCobrinha(xCabeca, yCabeca) {
    console.log("testado");
    for (var i = 2; i < cobrinha.length; i++) {
        if (cobrinha[0][0] == cobrinha[i][0] && cobrinha[0][1] == cobrinha[i][1]) {
            pararJogo();
            clearInterval(this);
        }

    }

    console.log(cobrinha.length);

}




function movimentaPlayer(direcao) {
    switch (direcao) {
        case 37:
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0] - 10;
            yCabeca = cobrinha[0][1];
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca)
            break;
        case 38:
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0];
            yCabeca = cobrinha[0][1] - 10;
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca)
            break;

        case 39:
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0] + 10;
            yCabeca = cobrinha[0][1];
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca)

            break;


        case 40:
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0];
            yCabeca = cobrinha[0][1] + 10;
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca)
            break;

        default:
            break;
    }



}

function quadro() {
    if (cobrinha[0][1] >= 400) {
        cobrinha[0][1] = 0;
    }

    if (cobrinha[0][1] < 0) {
        cobrinha[0][1] = 400;
    }
    if (cobrinha[0][0] >= 600) {
        cobrinha[0][0] = 0;
    }
    if (cobrinha[0][0] < 0) {
        cobrinha[0][0] = 600;
    }
    movimentaPlayer(direcao);

}

document.onkeydown = function(event) {

    if (reiniciarGame) {
        canvas.clearCanvas();
        reiniciarGame = false;
        direcao = 39;
        iniciaJogo();
    } else {
        var keyCode;
        var flag = true;
        if (event == null) {
            keyCode = window.event.keyCode;
        } else {
            keyCode = event.keyCode;
        }
        if (keyCode == 32 && ativadorVerficador == true) {
            iniciaJogo();
            ativadorVerficador = false;
        } else {
            if (!ativadorVerficador) {
                direcao = keyCode;
                movimentaPlayer(keyCode);
            }

        }


    }
}




function iniciaJogo() {

    clearInterval(animacao);
    clearInterval(verificaCobrinha);
    velocidade = 100;
    direcao = 39;
    cobrinha = [
        [100, 200],
        [90, 200],
    ];
    canvas.clearCanvas();
    animacao = setInterval(quadro, velocidade);
    verificacaoCobrinha = setInterval(verificaCobrinha, 10);
}




window.onload = function() {
    canvas = $('#cenario');

    canvas.drawRect({
        fillStyle: '#910',
        shadowColor: '#000',
        shadowBlur: 4,
        x: 100,
        y: 200,
        width: 10,
        height: 10
    });
    canvas.drawRect({
        fillStyle: '#190',
        shadowColor: '#010',
        shadowBlur: 2,
        x: 90,
        y: 200,
        width: 10,
        height: 10
    });
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: '20pt',
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Aperte [ESPAÇO] para iniciar',
        x: 300,
        y: 200,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    ativadorVerficador = true;
}