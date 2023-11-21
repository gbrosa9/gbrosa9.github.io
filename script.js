const url = 'https://botafogo-atletas.mange.li';


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
    window.location.href = `${url}/${atleta.id}`;
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

function verificarSenha(event) {
    event.preventDefault(); 
    
    const senhaDigitada = document.getElementById('senha').value;
    const senhaCorreta = 'GABRIEL'; 

    if (senhaDigitada === senhaCorreta) {
      window.location.href = 'atletas.html'; 
    } else {
      alert('Senha incorreta!'); 
    }
}