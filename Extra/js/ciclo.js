
const ciclo = document.createElement("div");

ciclo.className = "ciclo-dia-noite";

ciclo.innerHTML = `
    <div class="ciclo-orbita">
        <div class="ciclo-astro"></div>
    </div>

    <div class="ciclo-info">
        <span class="ciclo-hora"></span>
        <span class="ciclo-periodo"></span>
    </div>
`;

document.querySelector("header").appendChild(ciclo);

const horaElemento = ciclo.querySelector(".ciclo-hora");
const periodoElemento = ciclo.querySelector(".ciclo-periodo");
const astro = ciclo.querySelector(".ciclo-astro");

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

    } else if (tempo >= 12 && tempo < 18) {
        periodo = "DIA • TARDE";
        cor = "#ffad4a";

        const progresso = (tempo - 12) / 6;

        x = 34 + progresso * 8;
        y = 0 + progresso * 16;

        document.body.style.setProperty(
            "--luz-x",
            `${70 - progresso * 40}%`
        );

        document.body.style.setProperty(
            "--luz-y",
            `${15 + progresso * 25}%`
        );

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

    periodoElemento.textContent = periodo;

    astro.style.setProperty("--astro-x", `${x}px`);
    astro.style.setProperty("--astro-y", `${y}px`);
    astro.style.setProperty("--astro-cor", cor);
}

atualizarCiclo();

setInterval(atualizarCiclo, 60000);