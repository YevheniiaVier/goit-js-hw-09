import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[ data-start]'),
  div: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
refs.startBtn.disabled = true;
let startTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      refs.startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
    // console.log(selectedDates[0]);
    // console.log(Date.now);

    // startTime = selectedDates[0];
    // console.log(startTime);
  },
};

const fp = flatpickr('#datetime-picker', options);

// if (fp.selectedDates[0] <= Date.now) {
//   refs.startBtn.disabled = true;
// } else {
//   refs.startBtn.disabled = false;
// }

const timer = {
  start() {
    const startTime = fp.selectedDates[0];

    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime < 1) {
        clearInterval(intervalId);
        refs.startBtn.disabled = false;
        return;
      }
      const timeComponents = convertMs(deltaTime);
      //   const updatedTime = addLeadingZero(timeComponents);
      updateClockFace(timeComponents);
      //   console.log(timeComponents);
    }, 1000);
  },
};
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

refs.startBtn.addEventListener('click', onstartBtnClick);

function onstartBtnClick() {
  if (refs.startBtn.disabled) {
    return;
  }
  refs.startBtn.disabled = true;
  refs.input.disabled = true;
  timer.start();
}
console.log(refs.input);
// console.log(refs.startBtn);
// console.log(refs.span);
// console.log(refs.days);
// console.log(refs.hours);

// console.log(refs.minutes);
// console.log(refs.seconds);
