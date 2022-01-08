import JiraAPI from "./api/JiraAPI.js";


const createTicketModal = document.getElementById("create-modal");
const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");
const createIssue = document.getElementById("create-issue");
const ticketName = document.getElementById("ticket-name");
const ticketType = document.getElementById("ticket-type");
const ticketDetails = document.getElementById("ticket-details");
const ticketAssignee = document.getElementById("assignee");
const ticketReporter = document.getElementById("reporter");
const ticketPriority = document.getElementById("priority");


const ticketModal = document.getElementById("ticket-modal");
const ticketClicked = document.getElementById("ticket");

createIssue.addEventListener("click", () => {
    createTicketModal.style.display="flex";

    createBtn.addEventListener("click", () => {
        const newType = ticketType.options[ticketType.selectedIndex].text;
        const newAssignee = ticketAssignee.options[ticketAssignee.selectedIndex].text;
        const newReporter = ticketReporter.options[ticketReporter.selectedIndex].text;
        const newPriority = ticketPriority.options[ticketPriority.selectedIndex].text;


        JiraAPI.insertItem(1,ticketName.value,newType, ticketDetails.value, newAssignee, newReporter, newPriority)
        createTicketModal.style.display="none";
        location.reload();
    })
})

cancelBtn.addEventListener("click", () => {
    createTicketModal.style.display="none";
})

ticketClicked.addEventListener("click", () => {
    console.log("clicked")
    ticketModal.style.display="flex";
})



