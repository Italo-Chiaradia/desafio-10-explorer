/* Estado */
const state = {
  isMute: false,
  buttonOn: null,
  audioPlaying: null
}

/* Elementos */
const buttonForestSound = document.getElementById("forest-sound");
const buttonRainSound = document.getElementById("rain-sound");
const buttonCoffeeShopSound = document.getElementById("coffee-shop-sound");
const buttonBonfireSound = document.getElementById("bonfire-sound");
const sounds = document.getElementById('sounds');

/* Audios */
const audios = {
  forestSound: new Audio('./assets/Floresta.wav'),
  rainSound: new Audio('./assets/Chuva.wav'),
  coffeeShopSound: new Audio('./assets/Cafeteria.wav'),
  bonfireSound: new Audio('./assets/Lareira.wav')
}
audios.forestSound.loop = true;
audios.rainSound.loop = true;
audios.coffeeShopSound.loop = true;
audios.bonfireSound.loop = true;

/* Actions */
const actions = {
  playForestSound() {  
    playSound(audios.forestSound, buttonForestSound);
    buttonForestSound.classList.toggle('playing');
  },
  playRainSound() {
    playSound(audios.rainSound, buttonRainSound);
    buttonRainSound.classList.toggle('playing');
  },
  playCoffeeShopSound() {
    playSound(audios.coffeeShopSound, buttonCoffeeShopSound);
    buttonCoffeeShopSound.classList.toggle('playing');
  },
  playBonfireSound() {
    playSound(audios.bonfireSound, buttonBonfireSound);
    buttonBonfireSound.classList.toggle('playing');
  }
};

/* Eventos */
sounds.addEventListener('click', (event) => {
  const action = event.target.dataset.play;
  if (typeof actions[action] != 'function') {
    return;
  }

  actions[action]();
})

/* Utilitarios */
function removePreviousButton() {
  const buttons = document.getElementsByClassName('playing');

  if (buttons.length > 0) {
    buttons[0].classList.remove('playing');
    state.audioPlaying.pause();
  }
}
function updateState(buttonOn) {
  if (state.buttonOn != buttonOn) {
    removePreviousButton();
    state.buttonOn = buttonOn; 
    state.isMute = false;
  } else if (state.buttonOn == buttonOn) {
    state.buttonOn = null;
    state.isMute = true;
  }
}
function playSound(audio, buttonOn) {
  updateState(buttonOn);
  
  if (state.isMute) {
    audio.pause();
    state.audioPlaying = null;
  } else {
    audio.play();
    state.audioPlaying = audio;
  }
}