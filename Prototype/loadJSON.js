//---------------------------------------FUNCTIONS------------------------------------------

function loadJSON() {
    let query_JSON = null;

    $.ajax({
        url: "/Prototype/data.json",
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
    let id = modalPageData.id
    let task = modalPageData.task
    let date = modalPageData.date;

    document.querySelector(".modularPageQuestion").innerHTML = task;
}

function nextQuestion() {
    let id = parseInt(currentQuestionID);
    id++;
    if (id < dataJSON.length) {
        localStorage.setItem('currentQuestionID', id.toString());
    } else {
        resetQuestionID(true);
    }


}

function resetQuestionID(reset = false) {
    if (reset) {
        localStorage.clear();
        localStorage.setItem('currentQuestionID', 0);
    } else {
        if (localStorage.getItem('currentQuestionID') == null) {
            localStorage.clear();
            localStorage.setItem('currentQuestionID', 0);
        }
    }


}



//---------GLOBAL VARIABLES---------
resetQuestionID();
let currentQuestionID = localStorage.getItem('currentQuestionID');
let dataJSON = loadJSON();
let modalPageData;

//---------------------------------------------------

//-------------------------------------MAIN-------------------------------------



if (dataJSON != null) {



    modalPageData = loadDataForModalPage(currentQuestionID);
    setDataForModalPage();
    nextQuestion();
}






