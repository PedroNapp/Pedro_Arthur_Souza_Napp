export async function carregarTarefas() {
    const resposta = await fetch("../dados.json");

    if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (!dados || !Array.isArray(dados.tarefas)) {
        throw new Error("Formato inválido dos dados.");
    }

    return dados.tarefas;
}
