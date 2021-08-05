function calcular(tipo, valor) {
  if (tipo == "acao") {
    if (valor === "c") {
      document.getElementById("resultado").value = "";
    } else if (valor === "/" || valor === "*" || valor === "-" || valor === "+" || valor === ".") {
      document.getElementById("resultado").value += valor;
    } else if (valor === "=") {
      document.getElementById("resultado").value = eval(document.getElementById("resultado").value);
    }
  } else {
    document.getElementById("resultado").value += valor;
  }
}
