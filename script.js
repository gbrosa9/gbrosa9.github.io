const url = 'https://botafogo-atletas.mange.li';

const urlParams = new URLSearchParams(window.location.search);
const jogadorId = urlParams.get('id');

fetch(`${url}/${jogadorId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao solicitar dados do jogador');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Dados recebidos da API:', data);

        const detalhesAtleta = document.getElementById('detalhesAtleta');

        if (data && data.nome && data.idade && data.descricao && data.altura) {
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
        } else {
            console.error('Dados do jogador não estão no formato esperado.');
        }
    })
    .catch(error => {
        console.error('Erro ao obter dados do jogador:', error);
    });



const preenche = (atleta) => {
    const listaAtletas = document.getElementById('listaAtletas');

    const container = document.createElement('div');
    container.classList.add('atleta');

    const nomeAtleta = document.createElement('p');
    nomeAtleta.textContent = `${atleta.nome}`;

    const imagemAtleta = document.createElement('img');
    imagemAtleta.src = atleta.imagem;
    imagemAtleta.alt = `Imagem de ${atleta.nome}`;

    imagemAtleta.addEventListener('click', () => {
        //Vai  para a página de descrição com o ID do jogador
        window.location.href = `descricaoAtleta.html?id=${atleta.id}`;
    });

    container.appendChild(nomeAtleta);
    container.appendChild(imagemAtleta);
    listaAtletas.appendChild(container);
};

const mostrarAtletas = (atletas) => {
    const listaAtletas = document.getElementById('listaAtletas');
    listaAtletas.innerHTML = '';

    atletas.forEach((atleta) => {
        preenche(atleta);
    });
};

const filtrarAtletas = (categoria) => {
    let caminho = `${url}/all`;

    if (categoria === 'masculino') {
        caminho = `${url}/masculino`;
    } else if (categoria === 'feminino') {
        caminho = `${url}/feminino`;
    }

    fetch(caminho)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação da API');
            }
            return response.json();
        })
        .then(data => {
            mostrarAtletas(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.pessoas');
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const categoria = event.target.dataset.category;
            filtrarAtletas(categoria);
        });
    });
});

let senhaDigitada = "";

function verificarSenha(event) {
  event.preventDefault();
  const senhaInput = document.getElementById("senha");
  senhaDigitada = senhaInput.value;

  // MD5
  if (senhaDigitada === "GABRIEL") {
    window.location.href = "atletas.html";
  } else {
    alert("Senha incorreta. Tente novamente.");
  }
}



