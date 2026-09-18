
import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import "./ciclo.js";
import "./ambiente.js";
import "./clima.js";

import {
    renderizarTarefas,
    instalarEventosDoQuadro
} from "./renderizacao.js";

const estado = {
    tarefas: [],
    busca: "",
    status: "todos",
    prioridade: "todas",
    ordenacao: "prazo",
    carregamento: "carregando",
    erro: null
};

const quadro = document.querySelector("[data-quadro]");
const campoBusca = document.querySelector("#busca");
const filtroStatus = document.querySelector("#status");
const filtroPrioridade = document.querySelector("#prioridade");
const formulario = document.querySelector("form");
const botaoLimpar = document.querySelector("#limpar-filtros");

function derivarTarefas(estado) {
    let tarefas = estado.tarefas.filter(tarefa => {
        const correspondeBusca =
            tarefa.titulo
                .toLowerCase()
                .includes(estado.busca.toLowerCase());

        const correspondeStatus =
            estado.status === "todos" ||
            tarefa.status === estado.status;

        const correspondePrioridade =
            estado.prioridade === "todas" ||
            tarefa.prioridade === estado.prioridade;

        return (
            correspondeBusca &&
            correspondeStatus &&
            correspondePrioridade
        );
    });

    if (estado.ordenacao === "prazo") {
        tarefas = [...tarefas].sort((a, b) => {
            return a.prazo.localeCompare(b.prazo);
        });
    }

    return tarefas;
}

function obterMensagemErro(erro) {
    if (erro.name === "TypeError") {
        return "Erro de rede: não foi possível carregar as tarefas.";
    }

    if (erro.name === "SyntaxError") {
        return "Erro de formato: o arquivo JSON está inválido.";
    }

    if (erro.message.startsWith("Erro HTTP:")) {
        return `Erro de protocolo: ${erro.message}`;
    }

    return "Ocorreu um erro inesperado ao carregar as tarefas.";
}

function renderizarAplicacao() {
    const tarefasVisiveis = derivarTarefas(estado);

    renderizarTarefas(tarefasVisiveis, quadro);

    if (estado.carregamento === "carregando") {
        renderizarEstado("carregando");
        return;
    }

    if (estado.carregamento === "erro") {
        renderizarEstado("erro", {
            mensagem: estado.erro
        });
        return;
    }

    if (estado.tarefas.length === 0) {
        renderizarEstado("vazio");
        return;
    }

    if (tarefasVisiveis.length === 0) {
        renderizarEstado("resultado-vazio");
        return;
    }

    renderizarEstado("sucesso", {
        quantidade: tarefasVisiveis.length,
        total: estado.tarefas.length
    });
}

function atualizarAplicacao() {
    renderizarAplicacao();
}

campoBusca.addEventListener("input", evento => {
    estado.busca = evento.target.value;
    atualizarAplicacao();
});

filtroStatus.addEventListener("change", evento => {
    estado.status = evento.target.value;
    atualizarAplicacao();
});

filtroPrioridade.addEventListener("change", evento => {
    estado.prioridade = evento.target.value;
    atualizarAplicacao();
});

formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    atualizarAplicacao();
});

botaoLimpar.addEventListener("click", () => {
    estado.busca = "";
    estado.status = "todos";
    estado.prioridade = "todas";
    estado.ordenacao = "prazo";

    campoBusca.value = "";
    filtroStatus.value = "todos";
    filtroPrioridade.value = "todas";

    atualizarAplicacao();
});

function iniciarAplicacao() {
    instalarEventosDoQuadro(quadro);

    renderizarEstado("carregando");

    carregarTarefas()
        .then(tarefas => {
            estado.tarefas = tarefas;
            estado.carregamento = "sucesso";
            estado.erro = null;

            renderizarAplicacao();
        })
        .catch(erro => {
            estado.carregamento = "erro";
            estado.erro = obterMensagemErro(erro);

            renderizarAplicacao();

            console.error(erro);
        });
}

iniciarAplicacao();

window.estado = estado;