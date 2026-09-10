export function renderizarEstado(estado, dados = {}) {
    const status = document.querySelector('[role="status"]');

    if (!status) {
        return;
    }

    switch (estado) {
        case "carregando":
            status.textContent = "Carregando tarefas...";
            break;

        case "sucesso":
            status.textContent =
                `${dados.quantidade} de ${dados.total} tarefas.`;
            break;

        case "vazio":
            status.textContent = "Não há tarefas cadastradas.";
            break;

        case "resultado-vazio":
            status.textContent = "Nenhuma tarefa encontrada para os critérios selecionados.";
            break;

        case "erro":
            status.textContent = dados.mensagem;
            break;

        default:
            status.textContent = "";
    }
}

