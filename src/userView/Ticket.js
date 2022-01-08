import JiraAPI from "../api/JiraAPI.js";
import DropDivArea from "./DropDivArea.js";


export default class Ticket {
    constructor(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority) {
        this.elements = {};
        this.elements.root = Ticket.createDiv();
        this.elements.cont = this.elements.root.querySelector("#ticket-title")
        this.elements.type = this.elements.root.querySelector("#ticket-type-name")

        const p = document.getElementById("p");


        this.elements.root.dataset.id = id;
        this.elements.cont.textContent = issueName;
        this.issueName=issueName;

        this.elements.type.textContent = issueType;
        this.issueType=issueType;

        const ticketModal = document.getElementById("ticket-modal");
        const close = document.getElementById("close");
        

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain" , id);
        });

        this.elements.root.addEventListener("click", () => {
            console.log(id)
            ticketModal.style.display="flex";
            p.textContent=id;

            close.addEventListener("click", () => {
                ticketModal.style.display="none";
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