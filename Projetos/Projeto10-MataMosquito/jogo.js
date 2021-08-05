var altura;
var largura;
var vidas = 3;
var tempo = 15;
var criaMosquitoTempo = 1500;

var nivel = window.location.search;
nivel = nivel.replace("?", "");

if (nivel === "normal") {
  var criaMosquitoTempo = 1500;
} else if (nivel === "dificl") {
  var criaMosquitoTempo = 1000;
} else if (nivel === "horrivel") {
  var criaMosquitoTempo = 750;
}

function ajusaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}

ajusaTamanhoPalcoJogo();

var cronometro = setInterval(function () {
  tempo--;
  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosquito);
    window.location.href = "vitoria.html";
  } else {
    document.getElementById("cronometro").innerHTML = tempo;
  }
}, 1000);

function posicaoRandomica() {
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    if (vidas < 1) {
      window.location.href = "fim_de_jogo.html";
    }
    document.getElementById("v" + vidas--).src = "imagens/coracao_vazio.png";
  }
  var posx = Math.floor(Math.random() * largura) - 90;
  var posy = Math.floor(Math.random() * altura) - 90;

  posx = posx < 0 ? 0 : posx;
  posy = posy < 0 ? 0 : posy;

  var mosquito = document.createElement("img");
  mosquito.src = "imagens/mosca.png";
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  mosquito.style.left = posx + "px";
  mosquito.style.top = posy + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    this.remove();
  };

  document.body.appendChild(mosquito);
}

function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2);

  switch (classe) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}
