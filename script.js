const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('month-year');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = (firstDay.getDay() + 6) % 7; 

  calendarDays.innerHTML = '';
  monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  for (let i = 0; i < startDay; i++) {
    calendarDays.innerHTML += `<div class="day empty"></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const isToday = isCurrentMonth && today.getDate() === day;
    calendarDays.innerHTML += `<div class="day${isToday ? ' today' : ''}">${day}</div>`;
  }
}


prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);


const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function () {
    const textInput = this.nextElementSibling;
    if (this.checked) {
      textInput.style.textDecoration = 'line-through';
      textInput.style.color = 'gray';
    } else {
      textInput.style.textDecoration = 'none';
      textInput.style.color = 'black';
    }
  });
});

function getWeekNumber(date) {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstJan + 86400000) / 86400000;
  return Math.ceil((pastDaysOfYear + firstJan.getDay()) / 7);
}

const weekElement = document.getElementById('week-number');
const today = new Date();
const currentWeek = getWeekNumber(today);
weekElement.textContent = `Week-${currentWeek}`;

function highlightAlternateDays() {
  const dayDivs = document.querySelectorAll('#calendar-days .day');

  dayDivs.forEach((div, index) => {
    if (!div.classList.contains('empty') && index % 2 === 0) {
      div.classList.add('highlight-alternate');
    }
  });
}


