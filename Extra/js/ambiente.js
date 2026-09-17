
// =========================================
// CRIAÇÃO DO AMBIENTE
// =========================================

const ambiente = document.createElement("div");

ambiente.className = "ambiente";

ambiente.innerHTML = `
    <div class="sol"></div>
    <div class="lua"></div>
    <div class="estrelas"></div>
    <div class="cidade"></div>
`;

document.body.prepend(ambiente);

// =========================================
// ESTRELAS
// =========================================

const estrelas = ambiente.querySelector(".estrelas");

for (let i = 0; i < 45; i++) {

    const estrela = document.createElement("span");

    estrela.className = "estrela";

    estrela.style.left = `${Math.random() * 100}%`;
    estrela.style.top = `${Math.random() * 65}%`;

    estrela.style.opacity =
        `${0.3 + Math.random() * 0.7}`;

    estrelas.appendChild(estrela);
}

// =========================================
// CIDADE SEMIURBANA
// =========================================

const cidade = ambiente.querySelector(".cidade");

for (let i = 0; i < 28; i++) {

    const predio = document.createElement("div");

    predio.className = "predio";

    predio.style.height =
        `${20 + Math.random() * 80}%`;

    cidade.appendChild(predio);
}

// =========================================
// CICLO DE ILUMINAÇÃO
// =========================================

function atualizarAmbiente() {

    const agora = new Date();

    const hora = agora.getHours();
    const minutos = agora.getMinutes();

    const tempo = hora + minutos / 60;

    const body = document.body;

    const sol = ambiente.querySelector(".sol");

    body.classList.remove(
        "manha",
        "tarde",
        "entardecer",
        "noite"
    );

    // =============================
    // MANHÃ
    // =============================

    if (tempo >= 6 && tempo < 12) {

        body.classList.add("manha");

        const progresso = (tempo - 6) / 6;

        sol.style.left =
            `${10 + progresso * 35}%`;

        sol.style.top =
            `${35 - progresso * 20}%`;

        body.style.setProperty(
            "--luz-x",
            `${25 + progresso * 25}%`
        );

        body.style.setProperty(
            "--luz-y",
            `${35 - progresso * 20}%`
        );
    }

    // =============================
    // TARDE
    // =============================

    else if (tempo >= 12 && tempo < 18) {

        body.classList.add("tarde");

        const progresso = (tempo - 12) / 6;

        sol.style.left =
            `${45 + progresso * 35}%`;

        sol.style.top =
            `${15 + progresso * 25}%`;

        body.style.setProperty(
            "--luz-x",
            `${50 + progresso * 25}%`
        );

        body.style.setProperty(
            "--luz-y",
            `${15 + progresso * 25}%`
        );
    }

    // =============================
    // ENTARDECER
    // =============================

    else if (tempo >= 18 && tempo < 19) {

        body.classList.add("entardecer");

        const progresso = (tempo - 18) / 2;

        sol.style.left =
            `${80 + progresso * 10}%`;

        sol.style.top =
            `${40 + progresso * 25}%`;

        body.style.setProperty(
            "--luz-x",
            `${80 + progresso * 10}%`
        );

        body.style.setProperty(
            "--luz-y",
            `${40 + progresso * 25}%`
        );
    }

    // =============================
    // NOITE
    // =============================

    else {

        body.classList.add("noite");

        body.style.setProperty("--luz-x", "80%");
        body.style.setProperty("--luz-y", "10%");
    }
}

atualizarAmbiente();

setInterval(atualizarAmbiente, 60000);