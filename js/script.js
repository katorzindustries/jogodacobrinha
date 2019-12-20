var canvas;
var direcao;
var velocidade;
var cobrinha = new Array(new Array());;
var up = true;
var upaux = true;
var reiniciarGame;
var animacao;
var verificacaoCobrinha;
var ativadorVerficador;
var itens = [];
var dificuldade = 500;
var HScore = 0,
    limpar = false;
var win, lose, pick, clear, bg, slow;
var qtdPretinhas = 40;

function pararJogo() {
    lose = new Audio('lose.mp3');
    lose.play();
    clearInterval(verificaCobrinha);
    clearInterval(animacao);
    if (HScore <= ((cobrinha.length - 2) * 10)) {
        setCookie('score', ((cobrinha.length - 2) * 10), 365);
    }
    canvas.fillStyle = "#fff";
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 20,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'VOCÊ MORREU ( ._.)',
        x: 300,
        y: 180,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#0dd',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 20,
        fontFamily: 'Trebuchet MS, sans-serif',
        text: 'Pressione alguma tecla para reiniciar',
        x: 300,
        y: 220,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    reiniciarGame = true;
}

function desenhaPlayer(xCabeca, yCabeca) {

    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#0f0',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 12,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'Pontuação: ' + ((cobrinha.length - 2) * 10),
        x: 100,
        y: 10,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    if (((cobrinha.length - 2) * 10) > HScore) {
        HScore = ((cobrinha.length - 2) * 10);
    }

    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#00f',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 12,
        fontFamily: 'UBUNTU, sans-serif',
        text: " Highscore: " + HScore,
        x: 500,
        y: 10,
        align: 'center',
        maxWidth: 600,
        lineHeight: 2
    });
    canvas.drawRect({
        fillStyle: '#119',
        strokeStyle: '#000',
        x: xCabeca,
        y: yCabeca,
        width: 12,
        height: 12
    });
    for (var i = 1; i < cobrinha.length; i++) {
        canvas.drawRect({
            fillStyle: '#190',
            strokeStyle: '#000',
            strokeWidth: 1,
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
}

function verificaCobrinha(xCabeca, yCabeca) {
    for (var i = 2; i < cobrinha.length; i++) {
        if (xCabeca == cobrinha[i][0] && yCabeca == cobrinha[i][1]) {
            pararJogo();
            clearInterval(this);
        }
    }
    for (var i = 0; i < itens.length; i++) {
        if (xCabeca == itens[i].x && yCabeca == itens[i].y && itens[i].tipo < dificuldade) {
            criarItem(2, xCabeca, yCabeca);
            pick.play();
            cobrinha.push([-10, -10]);
            itens[i].x = -100;
            itens[i].y = -100
            itens[i].tipo = 3000;
            //aumenta velocidade a cada 50 pontos.
            if (((cobrinha.length - 2) % 5) == 0 && velocidade > 30) {
                velocidade -= 10;
                win.play();
                clearInterval(animacao);
                animacao = setInterval(quadro, velocidade);
            }



        } else if (xCabeca == itens[i].x && yCabeca == itens[i].y && itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
            pararJogo();
            clearInterval(this);
        } else if (xCabeca == itens[i].x && yCabeca == itens[i].y && ((cobrinha.length - 2) * 10) > 180 && limpar == true && itens[i].tipo == 2000) {
            limpar = false;
            for (var i = 0; i < itens.length; i++) {
                if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
                    itens[i].x = -100;
                    itens[i].y = -100;
                }
                if (itens[i].tipo == 2000) {
                    itens[i].x = -100;
                    itens[i].y = -100;
                    itens[i].tipo = dificuldade + 1;
                }
            }

            clear.play();
        } else
        if (xCabeca == itens[i].x && yCabeca == itens[i].y && limpar == true && itens[i].tipo == 2000) {
            limpar = false;
            for (var i = 0; i < itens.length; i++) {
                if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
                    itens[i].x = -100;
                    itens[i].y = -100;
                }
                if (itens[i].tipo == 2000) {
                    itens[i].x = -100;
                    itens[i].y = -100;
                    itens[i].tipo = dificuldade + 1;
                }
            }
            clear.play();
        }

    }
}

function movimentaPlayer(keyCode) {

    switch (keyCode) {
        case 37:
            direcao = keyCode;
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0] - 10;
            yCabeca = cobrinha[0][1];
            verificaCobrinha(xCabeca, yCabeca);
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca);


            break;
        case 38:
            direcao = keyCode;
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0];
            yCabeca = cobrinha[0][1] - 10;
            verificaCobrinha(xCabeca, yCabeca);
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca);
            break;

        case 39:
            direcao = keyCode;
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0] + 10;
            yCabeca = cobrinha[0][1];
            verificaCobrinha(xCabeca, yCabeca);
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca);
            break;


        case 40:
            direcao = keyCode;
            canvas.clearCanvas();
            xCabeca = cobrinha[0][0];
            yCabeca = cobrinha[0][1] + 10;
            verificaCobrinha(xCabeca, yCabeca);
            desenhaPlayer(xCabeca, yCabeca);
            atualizaCobrinha(xCabeca, yCabeca);
            break;

        default:

            break;
    }
    for (var i = 0; i < itens.length; i++) {
        if (itens[i].tipo < dificuldade) {
            canvas.drawEllipse({
                fillStyle: '#f12',
                strokeStyle: '#000',
                strokeWidth: 1,
                shadowColor: '#f00',
                x: itens[i].x,
                y: itens[i].y,
                width: 10,
                height: 10
            });
        }
        if (itens[i].tipo >= dificuldade && itens[i].tipo <= 1000) {
            canvas.drawEllipse({
                fillStyle: '#000',
                shadowColor: '#000',
                x: itens[i].x,
                y: itens[i].y,
                width: 10,
                height: 10
            });
        }
        if (itens[i].tipo == 2000) {
            canvas.drawEllipse({
                fillStyle: '#00d',
                shadowColor: '#000',
                x: itens[i].x,
                y: itens[i].y,
                width: 10,
                height: 10
            });
        }
    }
}

function quadro() {
    var verificaMacas = false;
    var contaDificuldade = 0;
    var itemUP = false;
    for (var i = 0; i < itens.length; i++) {
        if (itens[i].tipo < dificuldade && itens[i].tipo > 0) {
            verificaMacas = true;
        }
        if (itens[i].tipo > dificuldade && itens[i].tipo <= 1000) {
            contaDificuldade++;
        }
        if (itens[i].tipo == 2000) {
            itemUP = true;
        }

    }
    if (contaDificuldade >= qtdPretinhas && velocidade <= 200 && limpar == false && itemUP == false) {
        qtdPretinhas += qtdPretinhas * 1.05;
        var auxX = Math.floor(Math.random() * 59 + 1) * 10;
        var auxY = Math.floor(Math.random() * 39 + 1) * 10;
        var igual = false;
        for (var i = 0; i < itens.length; i++) {
            if (itens[i].x == auxX && itens[i].y == auxY) {
                igual = true;
                i = 0;
                auxX = Math.floor(Math.random() * 59 + 1) * 10;
                auxY = Math.floor(Math.random() * 39 + 1) * 10;
            }
        }
        for (var i = 0; i < cobrinha.length; i++) {
            if (cobrinha[i][0] == auxX && cobrinha[i][1] == auxY) {
                igual = true;
                i = 0;
                auxX = Math.floor(Math.random() * 59 + 1) * 10;
                auxY = Math.floor(Math.random() * 39 + 1) * 10;
            }
        }
        itens.push({
            x: Math.floor(Math.random() * 59 + 1) * 10,
            y: Math.floor(Math.random() * 39 + 1) * 10,
            tipo: 2000
        });
        limpar = true;
    }
    if (verificaMacas == false) {
        criarItem(2, cobrinha[1][0], cobrinha[1][1]);
    }

    if (cobrinha[0][1] > 390) {
        pararJogo();
    } else

    if (cobrinha[0][1] < 10) {

        pararJogo();
    } else
    if (cobrinha[0][0] > 590) {

        pararJogo();
    } else
    if (cobrinha[0][0] < 10) {
        pararJogo();
    } else
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
            bg.play();
            ativadorVerficador = false;
        } else {
            if (!ativadorVerficador) {
                if (keyCode == 32) {
                    keyCode = direcao;
                }
                keyCode;
                movimentaPlayer(keyCode);
            }
        }
    }
}

function criarItem(qtd, Cabecax, Cabecay) {
    for (var k = 0; k < qtd; k++) {
        var auxX = Math.floor(Math.random() * 59 + 1) * 10;
        var auxY = Math.floor(Math.random() * 39 + 1) * 10;
        var igual = false;
        for (var i = 0; i < itens.length; i++) { //verifica se já não existe um item nessa posição.
            if (itens[i].x == auxX && itens[i].y == auxY) {
                igual = true;
                break;
            }
        }
        for (var i = 0; i < cobrinha.length; i++) { //verifica se não é a posição das partes da cobrinha
            if (cobrinha[i][0] == auxX && cobrinha[i][1] == auxY) {
                igual = true;
                break;
            }
        }
        if (((auxY >= (Cabecay - 90)) && (auxY <= (Cabecay + 90))) && ((auxX >= (Cabecax - 90)) && (auxX <= (Cabecax + 90)))) {
            k = k - 1;
        } else {
            if (igual == false) {
                itens.push({
                    x: auxX,
                    y: auxY,
                    tipo: (Math.random() * 1000)
                });
            } else {
                k = k - 1;
            }
        }
    }
}

function iniciaJogo() {

    checkCookie();
    upaux = true;
    up = true;
    lose.pause();
    start = new Audio('start.mp3');
    start.play();
    itens = [];

    velocidade = 200;
    direcao = 39;
    cobrinha = [
        [90, 200],
        [90, 200]
    ];
    canvas.clearCanvas();

    animacao = setInterval(quadro, velocidade);
    //   verificacaoCobrinha = setInterval(verificaCobrinha, 10);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    HScore = getCookie("score");

    if (HScore == '') {
        HScore = 0;
    }
}

window.onload = function() {
    win = new Audio('win.mp3');
    lose = new Audio('lose.mp3');
    pick = new Audio('collect.mp3');
    slow = new Audio('slow.mp3');
    bg = new Audio('bg.mp3');
    clear = new Audio('clear.mp3');
    bg.loop = true;
    canvas = $('#cenario');
    canvas.drawText({
        fillStyle: '#050',
        strokeStyle: '#25a',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 30,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'THE LIFE',
        x: 300,
        y: 180,
        radius: 110,
        align: 'center',
        maxWidth: 600,
    });
    canvas.drawText({
        fillStyle: '#050',
        strokeStyle: '#25a',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 40,
        fontFamily: 'UBUNTU, sans-serif',
        text: 'Snake',
        x: 300,
        y: 120,
        align: 'center',
        maxWidth: 600,
    });
    canvas.drawText({
        fillStyle: '#000',
        shadowColor: '#f00',
        shadowBlur: 1,
        fontStyle: 'bold',
        fontSize: 20,
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