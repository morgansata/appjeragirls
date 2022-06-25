// Variáveis Obrigatórias
var session_seconds = "00";
var session_minutes = 25;

// Arquivos de áudio
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

// Função inicial para o temporizador
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function start_timer() {
  click_sound.play();

  // Altere o tempo para o tempo de início
  session_minutes = 24;
  session_seconds = 59;

  // Adicione os minutos e os segundos ao timer
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;

  // Início da contagem regressiva
  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  // Funcões
  // Função para o contador de minutos do timer
  function minutesTimer() {
    session_minutes = session_minutes - 1;
    document.getElementById("minutes").innerHTML = session_minutes;
  }

  // Função para o contador de segundos do timer
  function secondsTimer() {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    // Verifica se o contador zerou em minutos e segundos
    // Se o contador tiver zerado em minutos e segundos, finaliza a sessão do timer
    if (session_seconds <= 0) {
      if (session_minutes <= 0) {
        // Limpa o contador e para o timer
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        // Adiciona uma mensagem ao HTML
        document.getElementById("done").innerHTML =
          "Session Completed!! Take a Break";

        // Torna a DIV da mensagem da HTML visível
        document.getElementById("done").classList.add("show_message");

        // Toque o som da campainha para informar o fim da sessão do timer
        bell.play();
      }

      // Redefine os segundos da sessão para 60
      session_seconds = 60;
    }
  }
}

// Funcão para o modo de intervalo de 5 minutos

// Set a time function to run pomodoro intervals
const timerStart = function() {
  if (timerRunning) {
    timerInterval = setInterval(function() {
      timeSpent++;
      currentSessionTime--;
      displayTimer(currentSessionTime);
      progressBar.set(calculateSessionProgress());
      if (currentSessionTime < 0) {
        if (type === "work") {
          totalWorkSessions++;
        } else {
          totalBreakSessions++;
        }
        timeSpent = 0;
        timerRunning = false;
        clearInterval(timerInterval);
        toggleSession();
        initializeButtons();
        displayTimer(currentSessionTime);
        progressBar.set(calculateSessionProgress());
      }
    }, 1000);
  }
};