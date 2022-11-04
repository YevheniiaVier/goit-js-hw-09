function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

refs.startBtn.addEventListener('click', onstartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onstartBtnClick() {
  if (refs.startBtn.disabled) {
    return;
  }
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    changeColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
}
