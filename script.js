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
            // Chama a função para iniciar o efeito das folhas
            iniciarEfeitoFolhas();
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

    // --- LÓGICA PARA O EFEITO DE FOLHAS CAINDO E GIRANDO (SEM ATRASO) ---
    function iniciarEfeitoFolhas() {
        const folhasContainer = document.getElementById('folhas-container');
        if (folhasContainer) {
            const imagensFolhas = ['./images/folha-3.png', './images/folha-4.png', './images/folha-5.png'];
            const quantidadeDeFolhas = 40;

            for (let i = 0; i < quantidadeDeFolhas; i++) {
                // Atraso mínimo apenas para a criação dos elementos
                setTimeout(() => {
                    const folha = document.createElement('div');
                    folha.classList.add('folha');
                    
                    folha.style.backgroundImage = `url(${imagensFolhas[Math.floor(Math.random() * imagensFolhas.length)]})`;
                    
                    if (Math.random() > 0.5) {
                        folha.style.top = `-${Math.random() * 20}vh`;
                        folha.style.left = Math.random() * 100 + 'vw';
                    } else {
                        folha.style.left = `-${Math.random() * 20}vw`;
                        folha.style.top = Math.random() * 100 + 'vh';
                    }
                    
                    folha.style.animationDuration = (Math.random() * 8 + 7) + 's';
                    
                    // A LINHA QUE CAUSA O ATRASO FOI REMOVIDA DESTA VERSÃO
                    // folha.style.animationDelay = Math.random() * 10 + 's';
                    
                    const tamanho = Math.random() * 4 + 1;
                    folha.style.width = tamanho + 'vw';
                    folha.style.height = tamanho + 'vw';
                    folha.style.opacity = Math.random() * 0.7 + 0.3;

                    folha.style.setProperty('--random-rotate-start', `${Math.random() * 360}deg`);

                    folhasContainer.appendChild(folha);

                    folha.addEventListener('animationend', () => {
                        folha.remove();
                    });
                }, i * 100); // Atraso de criação baixo para início rápido
            }
        }
    }
});