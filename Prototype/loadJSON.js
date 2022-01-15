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
    if (modularPageQuestion != null) {
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
        }else{
            $(element).fadeOut();
        }
    }
}

function nextQuestion() {
    let id = parseInt(currentQuestionID);

    if (id < dataJSON.length - 1) {
        id++;
        localStorage.setItem('currentQuestionID', id.toString());
    } else {
        resetQuestionID(true);
    }


}

function resetQuestionID(reset = false) {
    if (reset) {
        //localStorage.clear();
        localStorage.setItem('currentQuestionID', 0);
    } else {
        if (localStorage.getItem('currentQuestionID') == null) {
            localStorage.clear();
            localStorage.setItem('currentQuestionID', 0);
        }
    }
}

function getAnwer() {
    let currentYear = document.querySelector(".year").innerHTML;
    let currentFullDate = document.querySelector(".fullDate").innerHTML;

    return currentYear + " " + currentFullDate;
}

function checkSelectedDate() {
    let currentYear = document.querySelector(".year").innerHTML;
    let currentFullDate = document.querySelector(".fullDate").innerHTML;
    let taskYear = modalPageData.year
    let taskFullDate = modalPageData.fullDate;

    if (currentYear != null && currentFullDate != null && taskYear != null && taskFullDate != null) {
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
        let dataId = userData.length
        if (wasNull) {
            dataId = 0;
        }

        data.id = dataId;
        data.taskID = modalPageData.id;
        data.answer = getAnwer();
        data.taskCorrectAnswered = isCorrect,
            data.prototype = dataId;
        data.answerDate = new Date();
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
let currentQuestionID = localStorage.getItem('currentQuestionID');
let dataJSON = loadJSON("/Prototype/data.json");
let userDataTemplateJSON = loadJSON("/Prototype/userDataTemplate.json");
let modalPageData;

//---------------------------------------------------

//-------------------------------------MAIN-------------------------------------


if (dataJSON != null && userDataTemplateJSON != null) {
    modalPageData = loadDataForModalPage(currentQuestionID);
    setDataForModalPage();
}






