import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import {
    renderizarTarefas,
    instalarEventosDoQuadro
} from "./renderizacao.js";

const quadro = document.querySelector("[data-quadro]");

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

async function inicializar() {
    // Estado 1: carregando
    renderizarEstado("carregando");

    try {
        // Busca os dados
        const tarefas = await carregarTarefas();

        // Estado 3: vazio
        if (tarefas.length === 0) {
            renderizarTarefas([], quadro);
            renderizarEstado("vazio");
            return;
        }

        // Estado 2: sucesso
        renderizarTarefas(tarefas, quadro);

        renderizarEstado("sucesso", {
            quantidade: tarefas.length
        });

    } catch (erro) {
        // Estado 4: erro
        console.error(erro);

        renderizarEstado("erro", {
            mensagem: obterMensagemErro(erro)
        });
    }
}

function iniciarAplicacao() {
    instalarEventosDoQuadro(quadro);
    inicializar();
}

iniciarAplicacao();
