//---------------------------------------FUNCTIONS------------------------------------------

function loadJSON(urlName) {
    let query_JSON = null;

    $.ajax({
        url: urlName,
        type: 'get',
        async: false,
        success: function (data) {
            //console.log(data);
            //console.log("Load was performed.");
            console.log("loadJSON successfull");
            query_JSON = data;
            console.log(query_JSON);
        }
    });

    return query_JSON;
}

function loadDataForModalPage(id) {
    for (let i = 0, j = dataJSON.length; i < j; i++) {
        if (dataJSON[i].id == id) {
            return dataJSON[i];
        }
    }
    return null;
}

function setDataForModalPage() {
    let task = modalPageData.task

    let modularPageQuestion = document.querySelectorAll(".modularPageQuestion");
    let modularPageQuestionTop = document.querySelectorAll(".modularPageQuestionTop");
    if (modularPageQuestion != null && modularPageQuestion.length != 0) {
        modularPageQuestion.forEach(element => element.innerHTML = task);
        let modularPageQuestionParent = modularPageQuestion[0].parentElement;
        toggleFade(modularPageQuestionParent);
    }
    if (modularPageQuestionTop != null) {
        modularPageQuestionTop.forEach(element => element.innerHTML = task);
    }
}

function toggleFade(element) {
    if (element != null) {
        if ($(element).css("display") === "none") {
            $(element).fadeIn();
        } else {
            $(element).fadeOut();
        }
    }
}

function nextQuestion() {
    let id = parseInt(currentQuestionID);

    if (id < dataJSON.length - 1) {
        id++;
        localStorage.setItem('currentQuestionID', id.toString());
        reloadQuestion();
    } else {

        if (taskSetFinished == 1) {
            //finished
            //alert("YOU ARE FINISHED!");
            submitData();
        } else {
            loadNextCalendar();
            id = 0;
            localStorage.setItem('currentQuestionID', id.toString());
        }


    }
}

function submitData() {
    let userData = localStorage.getItem('userDataJSON');


    let url = null;
    if (calendarPrototype == 0) {
        url = $("#urlPrototype1").attr("data-url");
    } else {
        url = $("#urlPrototype0").attr("data-url");
    }

    if (url != null) {
        $.ajax({
            url: url,
            data: userData,
            type: 'POST'
        }).done(function (response) {
            console.log(response);
        });
    }


    //load participation site
    url = $("#urlParticipation").attr("data-url");
    if (url != null) {
        setTimeout(function () {
            window.location.href = url;
        }, 1000);
    }


}

function loadNextCalendar() {
    if (calendarPrototype != null) {
        let url = null;
        if (calendarPrototype == 0) {
            url = $("#urlPrototype1").attr("data-url");
        } else {
            url = $("#urlPrototype0").attr("data-url");
        }

        if (url != null) {
            localStorage.setItem('taskSetFinished', 1);

            setTimeout(function () {
                window.location.href = url;
            }, 1000);
        }
    }
}

function reloadQuestion(time = 1000) {
    //reload page
    setTimeout(function () {
        location.reload();
    }, time);
}

function resetQuestionID(reset = false) {
    if (reset) {
        //localStorage.clear();
        localStorage.setItem('currentQuestionID', 0);
        localStorage.setItem('taskSetFinished', 0);
        localStorage.setItem('userID', generateUserID());
    } else {
        if (localStorage.getItem('currentQuestionID') == null) {
            localStorage.clear();
            localStorage.setItem('currentQuestionID', 0);
            localStorage.setItem('taskSetFinished', 0);
            localStorage.setItem('userID', generateUserID());
        }
    }
}

function generateUserID() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear());
    var hh = String(today.getHours()).padStart(2, '0');
    var mi = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');
    var mil = String(today.getMilliseconds()).padStart(2, '0');
    var userID = "uid_" + dd + mm + yyyy + hh + mi + ss + mil;
    return userID
}

function getAnswer() {
    let currentYear = document.querySelector(".year").innerHTML;
    let currentFullDate = document.querySelector(".fullDate").innerHTML;
    if (currentFullDate.length > 6) {
        currentFullDate = currentFullDate.substring(4);
    }
    currentFullDate = currentFullDate.toUpperCase();

    return currentYear + " " + currentFullDate;
}

function checkSelectedDate() {
    let currentYear = document.querySelector(".year").innerHTML;
    let currentFullDate = document.querySelector(".fullDate").innerHTML;
    let taskYear = modalPageData.year
    let taskFullDate = modalPageData.fullDate.toUpperCase();

    if (currentYear != null && currentFullDate != null && taskYear != null && taskFullDate != null) {
        if (currentFullDate.length > 6) {
            currentFullDate = currentFullDate.substring(4);
        }
        currentFullDate = currentFullDate.toUpperCase();


        if (currentYear == taskYear && currentFullDate == taskFullDate) {
            return true;
        }
    }
    return false;
}

function updateUserDataJSON(isCorrect = false) {

    let wasNull = false;
    let userData = localStorage.getItem("userDataJSON");
    if (userData == null) {
        userData = "[{}]";
        wasNull = true;
    }
    if (userData != null) {


        userData = JSON.parse(userData);

        let data = userDataTemplateJSON[0];

        let userID = localStorage.getItem("userID");
        if (userID != null) {
            data.userID = userID;
        }else{
            data.userID = generateUserID();
        }
        data.taskID = modalPageData.id;
        data.userAnswer = getAnswer();
        data.taskCorrectAnswered = isCorrect;
        data.prototype = calendarPrototype;
        data.answerDate = new Date().toISOString().substring(0, 10);;
        data.overallMouseClicksCounter = overallMouseClicksCounter;
        data.clickOnCalendarCounter = clickOnCalendarCounter;
        data.clickOnDaysCounter = clickOnDaysCounter;
        data.timeNeededForTask = trackTime();

        userData[userData.length] = data;

        if (wasNull) {
            userData.splice(0, 1);
        }

        let stringifiedData = JSON.stringify(userData);
        localStorage.setItem("userDataJSON", stringifiedData);
    }

}

//---------GLOBAL VARIABLES---------
resetQuestionID(); //set localstorage item
let taskSetFinished = localStorage.getItem('taskSetFinished');
let currentQuestionID = localStorage.getItem('currentQuestionID');
let dataJSON = loadJSON("/static/json/data.json");
let userDataTemplateJSON = loadJSON("/static/json/userDataTemplate.json");
let modalPageData;

//---------------------------------------------------

//-------------------------------------MAIN-------------------------------------


if (dataJSON != null && userDataTemplateJSON != null) {
    modalPageData = loadDataForModalPage(currentQuestionID);
    setDataForModalPage();
}






