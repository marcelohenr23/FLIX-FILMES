// COLOQUE SUA CHAVE DO TMDB ABAIXO NO LUGAR DAS LETRAS EXEMPLO
const CHAVE_API = 'COLOQUE-SUA-CHAVE-AQUI';
const URL_BASE = 'https://api.themoviedb.org/3';
const URL_IMG = 'https://image.tmdb.org/t/p/w500';

async function carregarFilmesPopulares() {
    const resposta = await fetch(`${URL_BASE}/movie/popular?api_key=${CHAVE_API}&language=pt-BR`);
    const dados = await resposta.json();
    mostrarFilmes(dados.results);
}

function mostrarFilmes(filmes) {
    const container = document.getElementById('lista-filmes');
    container.innerHTML = '';

    filmes.forEach(filme => {
        if(filme.poster_path) {
            const card = document.createElement('div');
            card.classList.add('filme');
            
            card.innerHTML = `
                <img src="${URL_IMG}${filme.poster_path}" alt="${filme.title}">
                <div class="info">
                    <p class="titulo">${filme.title}</p>
                    <p class="nota">⭐ ${filme.vote_average.toFixed(1)}</p>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

async function buscarFilme() {
    const termo = document.getElementById('pesquisa').value;
    if (!termo) return;

    const resposta = await fetch(`${URL_BASE}/search/movie?api_key=${CHAVE_API}&language=pt-BR&query=${termo}`);
    const dados = await resposta.json();
    mostrarFilmes(dados.results);
}

// Controle da animação de abertura
window.addEventListener('load', () => {
    const tela = document.getElementById('telaAbertura');
    const conteudo = document.querySelectorAll('header, main, footer');

    // Tempo total da animação: ~3 segundos
    setTimeout(() => {
        tela.style.opacity = '0';
        setTimeout(() => tela.style.display = 'none', 800);

        // Mostra o site com suavidade
        conteudo.forEach(el => el.style.opacity = '1');
    }, 3000);

    // Carrega os filmes após a animação
    carregarFilmesPopulares();
});
