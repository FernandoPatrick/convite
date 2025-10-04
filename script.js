// Aguarda o DOM ser carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Inicializa o Player Plyr no elemento de áudio
    const player = new Plyr('#musicaFundo');

    // Seleciona os elementos da tela de entrada
    const botaoEntrar = document.getElementById('botaoEntrar');
    const telaEntrada = document.getElementById('telaEntrada');
    
    // Adiciona o evento de clique ao botão de entrada
    if (botaoEntrar) {
        botaoEntrar.addEventListener('click', () => {
            
            // Controla a música com a API do Plyr
            if (player) {
                player.volume = 0.5; // Define o volume para 50%
                player.currentTime = 0; // Garante que a música comece do início
                player.play();       // Toca a música
            }

            // Esconde a tela de entrada com efeito de fade
            if (telaEntrada) {
                telaEntrada.style.opacity = '0';
                // Remove o elemento da tela após a transição para não atrapalhar cliques
                telaEntrada.addEventListener('transitionend', () => {
                    telaEntrada.style.display = 'none';
                });
            }
        });
    }
});