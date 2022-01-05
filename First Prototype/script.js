let date = new Date();
let selectedDay;

const renderCalendar = (ausgewahlterDay = new Date()) => {
    date.setDate(1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const monthDays = document.querySelector('.days');
    const year = ausgewahlterDay.getFullYear();
    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    document.querySelector('.monthAndYear').innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
    document.querySelector('.year').innerHTML = year;
    document.querySelector('.fullDate').innerHTML = ausgewahlterDay.toDateString().toString().substring(0,
        ausgewahlterDay.toDateString().toString().length - 5);

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay-x+1}</div>`;
    }


    for (let i = 1; i <= lastDay; i++) {
        if (i === ausgewahlterDay.getDate() && date.getMonth() === ausgewahlterDay.getMonth() && date
            .getFullYear() === ausgewahlterDay.getFullYear()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;

    const calenderDays = document.querySelectorAll('.days div');
    selected_day = new Date();
    calenderDays.forEach(day => {
        day.addEventListener('click', () => {
            calenderDays.forEach(day => {
                day.classList.remove('today');
            });
            day.classList.add('today');
            let numberCalendarDay = date.getDate();
            let numberCalendarMonth = date.getMonth()
            let numberCalendarYear = date.getFullYear();
            if (day.classList.contains('prev-date')) {
                selectedDay = new Date(numberCalendarYear, numberCalendarMonth - 1,
                    numberCalendarDay - (numberCalendarDay - day.innerText));
            } else if (day.classList.contains('next-date')) {
                selectedDay = new Date(numberCalendarYear, numberCalendarMonth + 1,
                    numberCalendarDay - (numberCalendarDay - day.innerText));
            } else {
                selectedDay = new Date(numberCalendarYear, numberCalendarMonth,
                    numberCalendarDay - (numberCalendarDay - day.innerText));
            }
            document.querySelector('.year').innerHTML = selectedDay.getFullYear();
            document.querySelector('.fullDate').innerHTML = selectedDay.toDateString()
                .toString().substring(0, selectedDay.toDateString()
                    .toString().length - 5);
        });
    });
}

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    if (selectedDay == undefined) {
        selectedDay = new Date();
    }
    renderCalendar(selectedDay);
});
document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    if (selectedDay == undefined) {
        selectedDay = new Date();
    }
    renderCalendar(selectedDay);
});

document.querySelector('.ok').addEventListener('click', () => {
    document.querySelector('.calendarContainer').innerHTML = '<i class ="fas fa-check-circle"></i>'
});

renderCalendar();