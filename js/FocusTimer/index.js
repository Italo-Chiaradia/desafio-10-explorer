const state = {
  minutes: 0,
  seconds: 0,
  isRunning: false,
  countdownId: null
}

const elements = {
  playBtn: document.getElementById('playBtn'),
  pauseBtn: document.getElementById('pauseBtn'),
  resetBtn: document.getElementById('resetBtn'),
  plusBtn: document.getElementById('plusBtn'),
  minusBtn: document.getElementById('minusBtn'),

  controls: document.getElementById('controls'),

  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
}

const sounds = {
  buttonPress: new Audio('./assets/button-press.wav'),
  kichenTimer: new Audio('./assets/kichen-timer.mp3')
}

const actions = {
  toggleRunning() {
    state.isRunning = document.documentElement.classList.toggle('running');
    countdown();
    sounds.buttonPress.play();
  },
  reset() {
    document.documentElement.classList.remove('running');
    state.isRunning = false;
    updateDisplay();
    sounds.buttonPress.play();
  },
  plusFive() {
    let minutes = Number(elements.minutes.textContent);

    minutes += 5;

    if (minutes > 60) {
      minutes = 60;
    }

    state.minutes = minutes;
    if (state.isRunning) {
      state.isRunning = document.documentElement.classList.toggle('running');
    }
    updateDisplay(minutes);
    sounds.buttonPress.play();
  },
  minusFive() {
    let minutes = Number(elements.minutes.textContent);

    minutes -= 5;

    if (minutes < 0) {
      minutes = 0;
    }

    state.minutes = minutes;
    if (state.isRunning) {
      state.isRunning = document.documentElement.classList.toggle('running');
    }
    updateDisplay(minutes);
    sounds.buttonPress.play();
  }
}

elements.controls.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  if (typeof actions[action] != 'function') {
    return;
  }

  actions[action]();
})


function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes;
  seconds = seconds ?? state.seconds;

  elements.minutes.textContent = String(minutes).padStart(2, '0');
  elements.seconds.textContent = String(seconds).padStart(2, '0'); 
}
function countdown() {
  clearTimeout(state.countdownId);
  if (!state.isRunning) {
    return;
  }

  let minutes = Number(elements.minutes.textContent);
  let seconds = Number(elements.seconds.textContent);

  seconds--;

  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }
  if (minutes < 0) {
    actions.reset();
    sounds.kichenTimer.play();
    return;
  }
  
  updateDisplay(minutes, seconds);
  state.countdownId = setTimeout(() => countdown(), 1000);
}

