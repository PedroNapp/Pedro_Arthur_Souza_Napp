
/* =========================
   ELEMENTOS DO HTML
   ========================= */

const ciclo = document.querySelector(".ciclo-dia-noite");

const horaElemento = ciclo.querySelector(".ciclo-hora");
const periodoElemento = ciclo.querySelector(".ciclo-periodo");
const astro = ciclo.querySelector(".ciclo-astro");

const selecaoClima = document.querySelector("#selecao-clima");


/* =========================
   ALTERAÇÃO DO CLIMA
   ========================= */

selecaoClima.addEventListener("change", () => {

    document.body.classList.remove(
        "clima-chuva",
        "clima-neblina",
        "clima-tempestade"
    );

    const climaSelecionado = selecaoClima.value;

    if (climaSelecionado) {

        document.body.classList.add(
            `clima-${climaSelecionado}`
        );

    }

});


/* =========================
   CICLO DE DIA E NOITE
   ========================= */

function atualizarCiclo() {

    const agora = new Date();

    const hora = agora.getHours();
    const minutos = agora.getMinutes();

    const tempo = hora + minutos / 60;

    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    horaElemento.textContent = horaFormatada;

    let periodo = "";
    let cor = "";
    let x = 18;
    let y = 0;


    /* =========================
       MANHÃ
       ========================= */

    if (tempo >= 6 && tempo < 12) {

        periodo = "DIA • MANHÃ";
        cor = "#f5bd3d";

        const progresso = (tempo - 6) / 6;

        x = 3 + progresso * 31;
        y = 16 - progresso * 16;

        document.body.style.setProperty(
            "--luz-x",
            `${30 + progresso * 40}%`
        );

        document.body.style.setProperty(
            "--luz-y",
            `${30 - progresso * 15}%`
        );


    /* =========================
       TARDE
       ========================= */

    } else if (tempo >= 12 && tempo < 18) {

        periodo = "DIA • TARDE";
        cor = "#ffad4a";

        const progresso = (tempo - 12) / 6;

        x = 34 + progresso * 8;
        y = progresso * 16;

        document.body.style.setProperty(
            "--luz-x",
            `${70 - progresso * 40}%`
        );

        document.body.style.setProperty(
            "--luz-y",
            `${15 + progresso * 25}%`
        );


    /* =========================
       NOITE
       ========================= */

    } else {

        periodo = "NOITE";
        cor = "#79baff";

        x = 18;
        y = 18;

        document.body.style.setProperty(
            "--luz-x",
            "80%"
        );

        document.body.style.setProperty(
            "--luz-y",
            "5%"
        );

    }


    /* =========================
       ATUALIZA ELEMENTOS
       ========================= */

    periodoElemento.textContent = periodo;

    astro.style.setProperty(
        "--astro-x",
        `${x}px`
    );

    astro.style.setProperty(
        "--astro-y",
        `${y}px`
    );

    astro.style.setProperty(
        "--astro-cor",
        cor
    );

}


/* =========================
   INICIALIZAÇÃO
   ========================= */

atualizarCiclo();

setInterval(atualizarCiclo, 60000);