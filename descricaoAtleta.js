const url = 'https://botafogo-atletas.mange.li';

const urlParams = new URLSearchParams(window.location.search);
const jogadorId = urlParams.get('id');

fetch(`${url}/${jogadorId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na solicitação da API');
        }
        return response.json();
    })
    .then(data => {
        const detalhesAtleta = document.getElementById('detalhesAtleta');

        const nomeAtleta = document.createElement('p');
        nomeAtleta.textContent = `Nome: ${data.nome}`;

        const idadeAtleta = document.createElement('p');
        idadeAtleta.textContent = `Idade: ${data.idade}`;

        const descricaoAtleta = document.createElement('p');
        descricaoAtleta.textContent = `Descrição: ${data.descricao}`;

        const alturaAtleta = document.createElement('p');
        alturaAtleta.textContent = `Altura: ${data.altura} metros`;

        const imagemAtleta = document.createElement('img');
        imagemAtleta.src = data.imagem;
        imagemAtleta.alt = `Imagem de ${data.nome}`;

        detalhesAtleta.appendChild(nomeAtleta);
        detalhesAtleta.appendChild(idadeAtleta);
        detalhesAtleta.appendChild(descricaoAtleta);
        detalhesAtleta.appendChild(alturaAtleta);
        detalhesAtleta.appendChild(imagemAtleta);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
