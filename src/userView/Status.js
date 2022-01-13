import JiraAPI from "../api/JiraAPI.js";
import DropDivArea from "./DropDivArea.js";
import Ticket from "./Ticket.js";
var ticket ={};

export default class Status {
    constructor(id, title) {
        this.elements = {};
        this.elements.root =Status.createDiv();

        this.elements.title = this.elements.root.querySelector("#status-title");
        this.elements.tickets = this.elements.root.querySelector("#ticket-list");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        const DropDivAreaDown = DropDivArea.createDropDivArea();
        this.elements.tickets.appendChild(DropDivAreaDown);   
        
        

        JiraAPI.getItem(id).forEach(ticket => {
            this.renderTicket(ticket)
        })
    }

    static createDiv() {
        
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div id ="status">
            <div id="status-head">
                <div id="status-title"></div>
                <div id="ticket-count"></div>
            </div>    
            <div id="ticket-list"></div>
               
        </div>
        `).children[0];
    }
    
    renderTicket(data) {
        ticket = new Ticket(data.id, data.issueName, data.issueType, data.issueDetail, data.issueReportor, data.issueAssignee, data.issuePriority, data.issueComments);
        this.elements.tickets.appendChild(ticket.elements.root);
    }
}