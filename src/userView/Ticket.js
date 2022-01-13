import JiraAPI from "../api/JiraAPI.js";
import DropDivArea from "./DropDivArea.js";
import Update from "../dropDown.js";

export default class Ticket {
    constructor(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority, issueComments) {
        this.elements = {};
        this.elements.root = Ticket.createDiv();

        const DropDivAreaUp = DropDivArea.createDropDivArea();
        this.elements.root.appendChild(DropDivAreaUp)

        this.elements.cont = this.elements.root.querySelector("#ticket-title")
        this.elements.typeImage = this.elements.root.querySelector("#ticket-type-img")
        this.elements.priorityImage = this.elements.root.querySelector("#ticket-priority-img")
        this.elements.assigneeImage = this.elements.root.querySelector("#ticket-assignee-img")
        
        const tid = document.getElementById("t-id");
        const tName = document.getElementById("t-name");
        const tDetails = document.getElementById("t-details");
        const tAssignee = document.getElementById("t-assignee");
        const tReporter = document.getElementById("t-reporter");
        const tPriority = document.getElementById("t-priority");

        const typeImg = document.querySelector("#ticket-type-image")
        const assigneeImg = document.querySelector("#ticket-assignee-image")
        const reporterImg = document.querySelector("#ticket-reporter-image")
        const priorityImg = document.querySelector("#ticket-priority-image")

       
        this.elements.root.dataset.id = id;
        this.elements.cont.textContent = issueName;
        this.issueName=issueName;
        this.issueType=issueType;
        this.issuePriority=issuePriority;
        this.issueAssignee=issueAssignee;

        // LOADS IMAGES FOR TICKET TYPE

        if(this.issueType==="Bug"){
            this.elements.typeImage.src="./images/bug.png";
        }
        else if(this.issueType==="Task"){
            this.elements.typeImage.src="./images/task.png";
        }
        else {
            this.elements.typeImage.src="./images/story.png";
        }

        // LOADS IMAGES FOR TICKET PRIORITY

        if(this.issuePriority==="High"){
            this.elements.priorityImage.src="./images/high.png";
        }
        else if(this.issuePriority==="Medium"){
            this.elements.priorityImage.src="./images/medium.png";
        }
        else {
            this.elements.priorityImage.src="./images/low.png";
        }

        // LOADS IMAGES FOR TICKET ASSIGNEE

        if(this.issueAssignee==="Adam Jones"){
            this.elements.assigneeImage.src="./images/adam.png";
        }
        else if(this.issueAssignee==="Nick Fury"){
            this.elements.assigneeImage.src="./images/nick.png";
        }
        else{
            this.elements.assigneeImage.src="./images/rose.png";
        }
       
        const ticketModal = document.getElementById("ticket-modal");
        const close = document.getElementById("close");
        const del = document.getElementById("delete");

        const commentBox = document.getElementById("comment-box");
        const commentBtn = document.getElementById("comment-btn");

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain" , id);
        });

        this.elements.root.addEventListener("click", () => {
            JiraAPI.viewStatus(id);
            ticketModal.style.display="flex";
            tid.textContent=id;
            tName.textContent=issueName;
            type.textContent=issueType;
            tDetails.textContent=issueDetail;
            tAssignee.textContent=issueAssignee;
            tReporter.textContent=issueReportor;
            tPriority.textContent=issuePriority;

            window.onclick = function(event) {
                if (event.target == ticketModal){
                    ticketModal.style.display="none";
                }
            }

            loadImages();
            
            const searchModal =  document.getElementById("search-modal");
            searchModal.style.display="none";

            // ADD COMMENT IN TICKET

            const showComment = document.getElementById("commentText");

            if (issueComments===""){
                document.getElementById("comment-section").style.display="none";

            }
            showComment.textContent=issueComments;

            commentBtn.addEventListener("click", () => {
                document.getElementById("comment-section").style.display="";

                const newComment = commentBox.value

                if (newComment == issueComments) {
                    return;
                }
                
                issueComments=newComment;
                JiraAPI.updateItems(id, {
                    issueComments:issueComments,   
                })

                showComment.textContent=issueComments;
                commentBox.value='';
            })

        // Updates the Ticket Title     
            const updateTitle = () => {
                const newTitle = tName.textContent.trim();

                if (newTitle == issueName) {
                    return;
                }

                issueName=newTitle;
                
                JiraAPI.updateItems(id, {   
                    issueName:issueName,
                })
            }
        
         // Updates the Ticket Dsecription    
            
            const updateDesp = () => {
                const newDescription = tDetails.textContent.trim();

                if (newDescription == issueDetail) {
                    return;
                }
                
                issueDetail=newDescription;
                JiraAPI.updateItems(id, {
                    issueDetail:issueDetail,
                })
            }

            Update.updateFunction(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority,this.elements.typeImage);
            
            tName.addEventListener("blur",updateTitle);
            tDetails.addEventListener("blur",updateDesp);
            
            close.addEventListener("click", () => {
                ticketModal.style.display="none";
                location.reload()
            })

            del.addEventListener("click", () => {

                const confirmModal = document.getElementById("confirm-modal")
                confirmModal.style.display="block";
                
                const delBtn =document.getElementById("del-btn")
                delBtn.addEventListener("click", () => {
                    const deletePopMessage = document.getElementById("delete-popMessage");

                    confirmModal.style.display="none";
                    ticketModal.style.display="none";
                    deletePopMessage.style.display="block";

                        setTimeout(function() {
                            location.reload();    
                        }, 1000);
                    
                    JiraAPI.deleteItem(id);
                })

                document.getElementById("cancel-btnn").addEventListener('click', () => {
                    confirmModal.style.display="none";
                    ticketModal.style.display="flex";
                })    
            })

            // LOADS ICONS IN TICKET DETAILS

            function loadImages(){

            // LOADS TICKET TYPE ICONS
                if(issueType==="Bug"){
                    typeImg.src="./images/bug.png";
                }
                else if(issueType==="Task"){
                    typeImg.src="./images/task.png";
                }   
                else {
                    typeImg.src="./images/story.png";
                } 

            // LOADS TICKET ASSIGNEE ICONS
                
                if(issueAssignee==="Adam Jones"){
                    assigneeImg.src="./images/adam.png";  
                }
                else if(issueAssignee==="Nick Fury"){
                    assigneeImg.src="./images/nick.png";
                }   
                else {
                    assigneeImg.src="./images/rose.png";
                }  

            // LOADS TICKET REPORTER ICONS

                if(issueReportor==="Adam Jones"){
                    reporterImg.src="./images/adam.png";
                }
                else if(issueReportor==="Nick Fury"){
                    reporterImg.src="./images/nick.png";
                }   
                else {
                    reporterImg.src="./images/rose.png";
                } 

            // LOADS TICKET PRIORITY ICONS
                
                if(issuePriority==="High"){
                    priorityImg.src="./images/high.png";
                    
                }
                else if(issuePriority==="Medium"){
                    priorityImg.src="./images/medium.png";
                }   
                else {
                    priorityImg.src="./images/low.png";
                }               
            }
        })

        // TICKET DRAG AND DROP PREVENTION

        this.elements.root.addEventListener("drop", e => {
            e.preventDefault
        });

        this.elements.cont.addEventListener("drag", e => {
            e.preventDefault();
        })
    }

    static createDiv(){
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div id="ticket">
            <div id ="ticket-box" draggable="true">
            <div id="ticket-title"></div>
            <div id="title-img">
                <div id="type-priority-img">
                    <img id="ticket-type-img">
                    <img id="ticket-priority-img">
                </div>
                <img id="ticket-assignee-img">
            </div>
        </div>            
        `).children[0];
    }
}