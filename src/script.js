import JiraAPI from "./api/JiraAPI.js";
import JiraBoard from "./userView/JiraBoard.js";

new JiraBoard(
    document.querySelector("#tickets-container")
)

//JiraAPI.insertItem(1,"local host Storage");
JiraAPI.viewItems(727);