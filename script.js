// Aguarda o DOM ser carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA TELA DE ENTRADA E MÚSICA (EXISTENTE) ---
    const player = new Plyr('#musicaFundo');
    const botaoEntrar = document.getElementById('botaoEntrar');
    const telaEntrada = document.getElementById('telaEntrada');

    if (botaoEntrar) {
        botaoEntrar.addEventListener('click', () => {
            if (player) {
                player.volume = 0.5;
                player.currentTime = 0;
                player.play();
            }
            if (telaEntrada) {
                telaEntrada.style.opacity = '0';
                telaEntrada.addEventListener('transitionend', () => {
                    telaEntrada.style.display = 'none';
                });
            }
        });
    }

    // --- NOVA LÓGICA DO CONTADOR REGRESSIVO ---

    // 1. Defina a data final do evento (Ano, Mês, Dia, Hora, Minuto, Segundo)
    // Lembre-se que o mês em JavaScript começa em 0 (Janeiro=0, Dezembro=11)
    const dataFinal = new Date(2025, 11, 21, 16, 0, 0).getTime();

    // 2. Seleciona os elementos do contador no HTML
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    // 3. Atualiza o contador a cada segundo
    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const distancia = dataFinal - agora;

        // 4. Se o tempo acabou, para o contador
        if (distancia < 0) {
            clearInterval(intervalo);
            document.getElementById('contador').innerHTML = "Chegou o grande dia!";
            return;
        }

        // 5. Calcula os dias, horas, minutos e segundos
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // 6. Exibe o resultado no HTML, adicionando um "0" na frente se for menor que 10
        diasEl.innerText = dias < 10 ? '0' + dias : dias;
        horasEl.innerText = horas < 10 ? '0' + horas : horas;
        minutosEl.innerText = minutos < 10 ? '0' + minutos : minutos;
        segundosEl.innerText = segundos < 10 ? '0' + segundos : segundos;

    }, 1000); // 1000ms = 1 segundo
});