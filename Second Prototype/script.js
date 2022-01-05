const date = new Date();
let year = date.getFullYear() - 2;
let month = date.getMonth() - 2;
let day = date.getDate() - 1;

let visualMonths = []
let currentMonthF = date.getMonth() - 1;
let calculatedMonth = 0;
for (let i = 0, j = 3; i < j; i++) {
    calculatedMonth = currentMonthF + i;
    if (calculatedMonth < 0) {
        visualMonths[i] = 11;
    } else if (calculatedMonth > 11) {
        visualMonths[i] = 0;
    } else {
        visualMonths[i] = calculatedMonth;
    }
}

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

function daysInMonth() {
    let currentMonth = document.querySelector('.currentMonth').innerHTML;
    let currentYear = document.querySelector('.currentYear').innerHTML;
    let currentMonthNum = 0;
    for (let i = 0, j = months.length; i < j; i++) {
        if (months[i] == currentMonth) {
            currentMonthNum = i + 1;
            break;
        }
    }
    return new Date(currentYear, currentMonthNum, 0).getDate();
}

function calculateDays(element) {
    let monthDays = daysInMonth();
    let previousDay = false;
    let previousDayNum = false;
    let previousSelection = document.querySelector('.dayPickerContainer p:nth-child(3)').innerHTML;
    document.querySelectorAll('.dayPickerContainer p').forEach(element => {
        if (previousSelection == '01') {
            document.querySelector('.dayPickerContainer p:first-of-type').innerHTML = monthDays;
        } else if (previousDay) {
            element.innerHTML = parseInt(previousDay.innerHTML) + 1;
            if (element.innerHTML > monthDays) {
                element.innerHTML = 1;
            } else if (element.innerHTML == '01' && previousDayNum != monthDays) {
                element.innerHTML = monthDays
            }
            if (element.innerHTML < 10) {
                element.innerHTML = '0' + element.innerHTML
            }
        }
        previousDayNum = element.innerHTML;
        previousDay = element;
    });
}

function checkLeadingZero(element) {
    if (element.innerHTML < 10) {
        element.innerHTML = '0' + element.innerHTML;
    }
}

let dayCounter = 0;
document.querySelectorAll('.dayPickerContainer p').forEach(element => {
    let monthDays = daysInMonth();
    element.innerHTML = day + dayCounter;
    checkLeadingZero(element);
    if (element.innerHTML > monthDays) {
        element.innerHTML = '01';
    }
    dayCounter += 1;
});

document.querySelectorAll('.monthPickerContainer p').forEach(element => {
    month += 1;
    if (month < 0) {
        adjusted_month = 11;
        element.innerHTML = months[adjusted_month];
    } else {
        element.innerHTML = months[month];
    }
});

document.querySelectorAll('.yearPickerContainer p').forEach(element => {
    year += 1;
    element.innerHTML = year;
});


document.querySelector('.daysUp').addEventListener('click', () => {
    let monthDays = daysInMonth();
    document.querySelectorAll('.dayPickerContainer p').forEach(element => {
        element.innerHTML = parseInt(element.innerHTML) - 1;
        checkLeadingZero(element);
        if (element.innerHTML <= 0) {
            element.innerHTML = monthDays;
        }
    });
});

document.querySelector('.daysDown').addEventListener('click', () => {
    let monthDays = daysInMonth();
    document.querySelectorAll('.dayPickerContainer p').forEach(element => {
        element.innerHTML = parseInt(element.innerHTML) + 1;
        checkLeadingZero(element);
        if (element.innerHTML <= 0) {
            element.innerHTML = monthDays;
        }
        if (element.innerHTML > monthDays) {
            element.innerHTML = '01';
        }
    });
});

let counter = -1;
document.querySelector('.monthsUp').addEventListener('click', () => {
    for (let i = 0, j = visualMonths.length; i < j; i++) {
        visualMonths[i] = visualMonths[i] - 1;
        if (visualMonths[i] < 0) {
            visualMonths[i] = 11;
        }
    }
    document.querySelectorAll('.monthPickerContainer p').forEach(element => {
        counter += 1;
        element.innerHTML = months[visualMonths[counter]];
    });
    counter = -1;
    document.querySelectorAll('.dayPickerContainer p').forEach(element => {
        calculateDays(element);
    });
});

document.querySelector('.monthsDown').addEventListener('click', () => {
    for (let i = 0, j = visualMonths.length; i < j; i++) {
        visualMonths[i] = visualMonths[i] + 1;
        if (visualMonths[i] > 11) {
            visualMonths[i] = 0;
        }
    }
    document.querySelectorAll('.monthPickerContainer p').forEach(element => {
        counter += 1;
        element.innerHTML = months[visualMonths[counter]];
    });
    counter = -1;
    document.querySelectorAll('.dayPickerContainer p').forEach(element => {
        calculateDays(element);
    });
});

document.querySelector('.yearsUp').addEventListener('click', () => {
    document.querySelectorAll('.yearPickerContainer p').forEach(element => {
        element.innerHTML = parseInt(element.innerHTML) - 1;
        calculateDays(element);
    });
});

document.querySelector('.yearsDown').addEventListener('click', () => {
    document.querySelectorAll('.yearPickerContainer p').forEach(element => {
        element.innerHTML = parseInt(element.innerHTML) + 1;
        calculateDays(element);
    });
});

document.querySelector('.ok').addEventListener('click', () => {
    document.querySelector('.calendarContainer').innerHTML = '<i class ="fas fa-check-circle"></i>';
});