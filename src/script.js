// IMPORTING CLASSES
import ProjectAPI from "./api/ProjectAPI.js";
import JiraBoard from "./userView/JiraBoard.js";

new JiraBoard(
    document.querySelector("#tickets-container")
)
ProjectAPI.deleteDetail();
ProjectAPI.addDetails();

var projectSetting = document.getElementById("project-setting");
var projectText = projectSetting.getElementsByClassName("li");

const board = document.getElementById("board");
const setting = document.getElementById("setting");

const boardContainer = document.getElementById("main-container");
const settingContainer = document.getElementById("project-container")

// ADDING ACTIVE CLASS 

for (var i = 0; i < projectText.length; i++) {
    projectText[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
}

// SHOWS KANBAN BOARD

board.addEventListener("click", () => {
    boardContainer.style.display="block";
    settingContainer.style.display="none";
})

//SHOWS PROJECT SETTING PAGE

setting.addEventListener("click", () => {
    settingContainer.style.display="block";
    boardContainer.style.display="none";
})

// MOUSEOVER EVENT FOR REPORT FEATURE

const reportText = document.getElementById("project-report-text");
reportText.onmouseover = function() {mouseOver()};
reportText.onmouseout = function() {mouseOut()};

function mouseOver() {
    reportText.textContent="COMING SOON";
    reportText.style.fontWeight="bold";
}

function mouseOut() {
    reportText.textContent="REPORTS";
    reportText.style.fontWeight="normal";
}





