function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

let intervalId = null;

btnStartEl.addEventListener('click', e => {
  e.target.disabled = true;
  btnStopEl.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStopEl.addEventListener('click', e => {
  e.target.disabled = true;
  btnStartEl.disabled = false;

  clearInterval(intervalId);
});
