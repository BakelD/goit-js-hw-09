// Described in documentation
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const daysOutputEl = document.querySelector('[data-days]');
const hoursOutputEl = document.querySelector('[data-hours]');
const minutesOutputEl = document.querySelector('[data-minutes]');
const secondsOutputEl = document.querySelector('[data-seconds]');
const btnStartEl = document.querySelector('[data-start]');

btnStartEl.disabled = true;

let date = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] - Date.now() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    btnStartEl.disabled = false;
    date = selectedDates[0];
  },
};

flatpickr(inputEl, options);

btnStartEl.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    const diff = date - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysOutputEl.textContent = addLeadingZero(days);
    hoursOutputEl.textContent = addLeadingZero(hours);
    minutesOutputEl.textContent = addLeadingZero(minutes);
    secondsOutputEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
