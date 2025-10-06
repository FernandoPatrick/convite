// Aguarda o DOM ser carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA TELA DE ENTRADA E MÚSICA ---
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

    // --- LÓGICA DO CONTADOR REGRESSIVO ---
    const dataFinal = new Date(2025, 11, 21, 16, 0, 0).getTime();
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');
    const contadorEl = document.getElementById('contador');

    if (contadorEl) {
        const intervalo = setInterval(() => {
            const agora = new Date().getTime();
            const distancia = dataFinal - agora;

            if (distancia < 0) {
                clearInterval(intervalo);
                contadorEl.innerHTML = "Chegou o grande dia!";
                return;
            }

            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            if (diasEl) diasEl.innerText = dias < 10 ? '0' + dias : dias;
            if (horasEl) horasEl.innerText = horas < 10 ? '0' + horas : horas;
            if (minutosEl) minutosEl.innerText = minutos < 10 ? '0' + minutos : minutos;
            if (segundosEl) segundosEl.innerText = segundos < 10 ? '0' + segundos : segundos;
        }, 1000);
    }

    // --- LÓGICA PARA O EFEITO DE FOLHAS CAINDO NA TELA TODA ---
    const folhasContainer = document.getElementById('folhas-container');
    if (folhasContainer) {
        const imagensFolhas = ['./images/folha.png', './images/folha-2.png'];
        const quantidadeDeFolhas = 40; // Ajuste para mais ou menos folhas

        for (let i = 0; i < quantidadeDeFolhas; i++) {
            // Usamos setTimeout para não criar todas as folhas de uma vez e travar o navegador
            setTimeout(() => {
                const folha = document.createElement('div');
                folha.classList.add('folha');
                
                folha.style.backgroundImage = `url(${imagensFolhas[Math.floor(Math.random() * imagensFolhas.length)]})`;
                
                // PONTO DE PARTIDA ALEATÓRIO (TOPO OU ESQUERDA)
                if (Math.random() > 0.5) {
                    folha.style.top = `-${Math.random() * 20}vh`; // Começa acima da tela
                    folha.style.left = Math.random() * 100 + 'vw';
                } else {
                    folha.style.left = `-${Math.random() * 20}vw`; // Começa à esquerda da tela
                    folha.style.top = Math.random() * 100 + 'vh';
                }
                
                // Duração, atraso, tamanho e opacidade aleatórios
                folha.style.animationDuration = (Math.random() * 8 + 7) + 's'; // Duração entre 7s e 15s
                folha.style.animationDelay = Math.random() * 10 + 's';
                const tamanho = Math.random() * 1.5 + 1; // Tamanho entre 1vw e 2.5vw
                folha.style.width = tamanho + 'vw';
                folha.style.height = tamanho + 'vw';
                folha.style.opacity = Math.random() * 0.7 + 0.3;

                folhasContainer.appendChild(folha);

                // Otimização: remove a folha do DOM após a animação
                folha.addEventListener('animationend', () => {
                    folha.remove();
                });
            }, i * 400); // Cria as folhas com um pequeno intervalo entre elas
        }
    }

});