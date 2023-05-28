import format from 'date-fns/format';

const date = new Date();

displayDate(date);
displayGreeting(date);

function displayDate(date) {
  document.querySelector('.day-num').textContent = format(date, 'd');
  document.querySelector('.day').textContent = format(date, 'EEEE');
  document.querySelector('.month-year').textContent = format(date, 'LLLL yyyy');
}

function displayGreeting(date) {
  const hour = format(date, 'H');
  const greetingEl = document.querySelector('.greeting');

  if (hour < 12) {
    greetingEl.textContent = 'Good morning!';
  } else if (hour < 16) {
    greetingEl.textContent = 'Good afternoon!';
  } else if (hour < 20) {
    greetingEl.textContent = 'Good evening!';
  } else {
    greetingEl.textContent = 'Welcome!';
  }
}
