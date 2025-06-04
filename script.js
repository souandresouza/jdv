const celulas = document.querySelectorAll('[data-celula]');
const status = document.getElementById('status');
const reiniciarBtn = document.getElementById('reiniciar');

let turnoX = true;
let jogoAtivo = true;

const combinacoesVitoria = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const celula = e.target;
  if (!jogoAtivo || celula.textContent !== '') return;
  
  celula.textContent = turnoX ? 'X' : 'O';
  
  if (verificarVitoria(turnoX ? 'X' : 'O')) {
    status.textContent = `Jogador ${turnoX ? 'X' : 'O'} venceu!`;
    jogoAtivo = false;
  } else if (Array.from(celulas).every(c => c.textContent !== '')) {
    status.textContent = 'Empate!';
    jogoAtivo = false;
  } else {
    turnoX = !turnoX;
    status.textContent = `Turno do jogador ${turnoX ? 'X' : 'O'}`;
  }
}

function verificarVitoria(simbolo) {
  return combinacoesVitoria.some(combinacao => {
    return combinacao.every(index => celulas[index].textContent === simbolo);
  });
}

function reiniciarJogo() {
  celulas.forEach(c => c.textContent = '');
  turnoX = true;
  jogoAtivo = true;
  status.textContent = 'Turno do jogador X';
}

function aplicarTemaPorHorario() {
  const hora = new Date().getHours();
  if (hora >= 18 || hora < 6) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Inicializações
celulas.forEach(c => c.addEventListener('click', handleClick));
reiniciarBtn.addEventListener('click', reiniciarJogo);
status.textContent = 'Turno do jogador X';
aplicarTemaPorHorario();

// Atualiza o tema a cada 5 minutos para mudanças dinâmicas
setInterval(aplicarTemaPorHorario, 5 * 60 * 1000);
