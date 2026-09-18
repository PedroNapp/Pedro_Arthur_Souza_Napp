
/* =========================
   SELETOR DE CLIMA
   ========================= */

const selecaoClima = document.querySelector("#selecao-clima");


/* =========================
   ALTERAÇÃO DO CLIMA
   ========================= */

function alterarClima(tipo) {

    document.body.classList.remove(
        "clima-chuva",
        "clima-neblina",
        "clima-tempestade"
    );

    if (tipo === "chuva") {
        document.body.classList.add("clima-chuva");
    }

    if (tipo === "neblina") {
        document.body.classList.add("clima-neblina");
    }

    if (tipo === "tempestade") {
        document.body.classList.add("clima-tempestade");
    }

    console.log(`Clima atual: ${tipo}`);

}


/* =========================
   EVENTO DO SELECT
   ========================= */

selecaoClima.addEventListener("change", () => {

    const tipo = selecaoClima.value;

    alterarClima(tipo);

});