class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for (let a in this) {
      if (this[a] == "" || this[a] == undefined || this[a] == null) {
        return false;
      }
    }
    return true;
  }
}

class BD {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoID() {
    let proximoID = localStorage.getItem("id");
    return parseInt(proximoID) + 1;
  }

  gravar(d) {
    let id = this.getProximoID();

    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() {
    let despesas = Array();

    for (let i = 1; i <= localStorage.getItem("id"); i++) {
      let despesa = JSON.parse(localStorage.getItem(i));

      if (despesa !== null) {
        despesa.id = i;
        despesas.push(despesa);
      }
    }
    return despesas;
  }

  pesquisar(d) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarTodosRegistros();

    for (let a in d) {
      if (d[a] != "") {
        despesasFiltradas = despesasFiltradas.filter((f) => d[a] == f[a]);
      }
    }

    return despesasFiltradas;
  }

  remover(id) {
    localStorage.removeItem(id);
  }
}

let bd = new BD();

function cadastrarDespesa() {
  var ano = document.getElementById("ano");
  var mes = document.getElementById("mes");
  var dia = document.getElementById("dia");
  var tipo = document.getElementById("tipo");
  var descricao = document.getElementById("descricao");
  var valor = document.getElementById("valor");

  let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

  if (despesa.validarDados()) {
    bd.gravar(despesa);
    mudaModal("sucesso");
    $("#resultadoGravacao").modal("show");
    limpaCampos();
  } else {
    mudaModal("erro");
    $("#resultadoGravacao").modal("show");
  }
}

function mudaModal(mensagem) {
  if (mensagem == "sucesso") {
    document.getElementById("modal-titulo").innerHTML = "Registro inserido com sucesso";
    document.getElementById("modal-corpo").innerHTML = "A despesa foi cadastrada com sucesso!";
    document.getElementById("modal-cabecalho").className = "modal-header text-success";
    document.getElementById("modal-botao").className = "btn btn-success";
  } else {
    document.getElementById("modal-titulo").innerHTML = "Erro na gravação";
    document.getElementById("modal-corpo").innerHTML = "Existem campos obrigatórios que não foram preenchidos";
    document.getElementById("modal-cabecalho").className = "modal-header text-danger";
    document.getElementById("modal-botao").className = "btn btn-danger";
  }
}

function limpaCampos() {
  ano.value = "";
  mes.value = "";
  dia.value = "";
  tipo.value = "";
  descricao.value = "";
  valor.value = "";
}

function carregaListaDespesas() {
  let despesas = Array();

  despesas = bd.recuperarTodosRegistros();

  printConsulta(despesas);
}

function printConsulta(despesas) {
  document.getElementById("listaDespesas").innerHTML = "";

  despesas.forEach(function (d) {
    let listaDespesas = document.getElementById("listaDespesas");
    let linha = listaDespesas.insertRow();

    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

    switch (d.tipo) {
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Educação";
        break;
      case "3":
        d.tipo = "Lazer";
        break;
      case "4":
        d.tipo = "Sáude";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo;

    linha.insertCell(2).innerHTML = d.descricao;

    linha.insertCell(3).innerHTML = `R$ ${d.valor}`;

    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerHTML = "<i class='fas fa-times'></i>";
    btn.id = `id_depesa_${d.id}`;
    btn.onclick = function () {
      bd.remover(d.id);
      window.location.reload();
    };
    linha.insertCell(4).append(btn);
  });
}

function pesquisarDespesa() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  if (despesa.length == 0) {
    carregaListaDespesas();
    return;
  }

  let despesas;
  despesas = bd.pesquisar(despesa);

  printConsulta(despesas);
}
