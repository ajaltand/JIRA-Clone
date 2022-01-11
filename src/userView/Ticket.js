import JiraAPI from "../api/JiraAPI.js";
import DropDivArea from "./DropDivArea.js";
import Status from "./Status.js";
import Update from "../dropDown.js";


export default class Ticket {
    constructor(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority) {
        this.elements = {};
        this.elements.root = Ticket.createDiv();

        const DropDivAreaUp = DropDivArea.createDropDivArea();
        this.elements.root.appendChild(DropDivAreaUp)

        this.elements.cont = this.elements.root.querySelector("#ticket-title")
        this.elements.type = this.elements.root.querySelector("#ticket-type-name")

        
        const tid = document.getElementById("t-id");
        const tName = document.getElementById("t-name");
        const tDetails = document.getElementById("t-details");
        const tAssignee = document.getElementById("t-assignee");
        const tReporter = document.getElementById("t-reporter");
        const tPriority = document.getElementById("t-priority");
       
        this.elements.root.dataset.id = id;
        this.elements.cont.textContent = issueName;
        this.issueName=issueName;
        this.elements.type.textContent = issueType;
        this.issueType=issueType;

       
        const ticketModal = document.getElementById("ticket-modal");
        const close = document.getElementById("close");
        const del = document.getElementById("delete");
        

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

            Update.updateFunction(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority);

            

            
            tName.addEventListener("blur",updateTitle);
            tDetails.addEventListener("blur",updateDesp);

            
            close.addEventListener("click", () => {
                ticketModal.style.display="none";
                location.reload()
            })

            del.addEventListener("click", () => {
                location.reload();
                JiraAPI.deleteItem(id);

            })
        })

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
            <div id="ticket-type-name"></div>
            </div>
        </div>            

        `).children[0];
    }
}