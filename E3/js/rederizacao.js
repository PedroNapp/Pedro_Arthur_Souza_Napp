export function criarCartao(tarefa) {
    const li = document.createElement("li");
    const article = document.createElement("article");

    const titulo = document.createElement("h4");
    titulo.textContent = tarefa.titulo;

    const projeto = document.createElement("p");
    projeto.textContent = `Projeto: ${tarefa.projeto}`;

    const responsavel = document.createElement("p");
    responsavel.textContent = `Responsável: ${tarefa.responsavel}`;

    const prioridade = document.createElement("p");
    prioridade.classList.add("prioridade");
    prioridade.textContent = `Prioridade: ${tarefa.prioridade}`;

    const prazo = document.createElement("p");
    prazo.classList.add("prazo");
    prazo.textContent = `Prazo: ${tarefa.prazo}`;

    article.appendChild(titulo);
    article.appendChild(projeto);
    article.appendChild(responsavel);
    article.appendChild(prioridade);
    article.appendChild(prazo);

    li.appendChild(article);

    return li;
}

export function renderizarTarefas(tarefas, quadro) {
    const listas = quadro.querySelectorAll("[data-lista-status]");

    listas.forEach(lista => {
        lista.replaceChildren();
    });

    tarefas.forEach(tarefa => {
        const lista = quadro.querySelector(
            `[data-lista-status="${tarefa.status}"]`
        );

        if (lista) {
            lista.appendChild(criarCartao(tarefa));
        }
    });
}

export function instalarEventosDoQuadro(quadro) {
    quadro.addEventListener("click", evento => {
        const botao = evento.target.closest("[data-acao]");

        if (!botao) {
            return;
        }

        if (botao.dataset.acao === "ver-detalhes") {
            console.log("Tarefa selecionada.");
        }
    });
}
