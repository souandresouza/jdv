const celulas = document.querySelectorAll('[data-celula]');
const status = document.getElementById('status');
const reiniciarBtn = document.getElementById('reiniciar');

let jogoAtivo = true;

// Verifica vitória
const combinacoesVitoria = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function verificarVitoria(simbolo) {
  return combinacoesVitoria.some(combinacao => {
    return combinacao.every(index => celulas[index].textContent === simbolo);
  });
}

function verificarEmpate() {
  return [...celulas].every(c => c.textContent !== '');
}

function handleClick(e) {
  const celula = e.target;
  if (!jogoAtivo || celula.textContent !== '') return;

  marcarCelula(celula, 'X');

  if (verificarVitoria('X')) {
    status.textContent = 'Você venceu!';
    jogoAtivo = false;
    return;
  }

  if (verificarEmpate()) {
    status.textContent = 'Empate!';
    jogoAtivo = false;
    return;
  }

  status.textContent = 'Turno da IA...';
  setTimeout(jogadaIA, 500);
}

function marcarCelula(celula, simbolo) {
  celula.textContent = simbolo;
}

// IA simples: escolhe uma célula vazia aleatoriamente
function jogadaIA() {
  const celulasVazias = [...celulas].filter(c => c.textContent === '');
  if (celulasVazias.length === 0) return;

  const indiceAleatorio = Math.floor(Math.random() * celulasVazias.length);
  marcarCelula(celulasVazias[indiceAleatorio], 'O');

  if (verificarVitoria('O')) {
    status.textContent = 'IA venceu!';
    jogoAtivo = false;
    return;
  }

  if (verificarEmpate()) {
    status.textContent = 'Empate!';
    jogoAtivo = false;
    return;
  }

  status.textContent = 'Seu turno!';
}

function reiniciarJogo() {
  celulas.forEach(c => c.textContent = '');
  jogoAtivo = true;
  status.textContent = 'Seu turno!';
}

celulas.forEach(c => c.addEventListener('click', handleClick));
reiniciarBtn.addEventListener('click', reiniciarJogo);

status.textContent = 'Seu turno!';
