
function trackTime() {
    return elapsedTime = (endDate - startDate) / 1000;
}

function startTime() {
    startDate = new Date();
}

function stopTime() {
    endDate = new Date();
}



function trackMouseclicks(event) {
    var elem = $(event.target)[0];
    var elemParent = elem.parentElement;

    //count overallMousecliks for this task;
    overallMouseClicksCounter++;

    //count clicks if user clicks on day elements
    if (elemParent != null) {
        if (elemParent.className == "days") {
            clickOnDaysCounter++;
        }
    }

    //count clicks if user clicks on any element of the calendar
    if (calendarElement != null) {
        if (calendarElement.contains(elem)) {
            clickOnCalendarCounter++;
        }
    }

    console.log("elem: " + elem);
    console.log("elemParent: " + elemParent);
    console.log("overallMouseClicksCounter: " + overallMouseClicksCounter);
    console.log("clickOnCalendarCounter: " + clickOnCalendarCounter);
    console.log("clickOnDaysCounter: " + clickOnDaysCounter);
}

function commitTrackedData() {
    //databse shitty fuck
}





//-----------------------GLOBAL VARIABLES--------------------------
let calendarElement = document.querySelector('.calendar');
console.log(document.querySelector('.calendar'));
//task time
let startDate;
let endDate;
//mouse clicks
let overallMouseClicksCounter = 0;
let clickOnCalendarCounter = 0;
let clickOnDaysCounter = 0;

//-----------------------------MAIN--------------------------------
$(document).click(function (event) {
    trackMouseclicks(event);
});



