import JiraAPI from "../api/JiraAPI.js";
import DropDivArea from "./DropDivArea.js";
import Ticket from "./Ticket.js";

export default class Status {
    constructor(id, title) {
        this.elements = {};
        this.elements.root =Status.createDiv();
        this.elements.title = this.elements.root.querySelector("#status-title");
        this.elements.tickets = this.elements.root.querySelector("#ticket-list");

        

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        
        const DropDivAreaUp = DropDivArea.createDropDivArea();
        this.elements.tickets.appendChild(DropDivAreaUp)

        JiraAPI.getItem(id).forEach(ticket => {
            this.renderTicket(ticket)
        })

    }

    static createDiv() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div id ="status">
            <div id="status-title"></div>
            <div id="ticket-list"></div>
               
        </div>
        `).children[0];
    }
    renderTicket(data) {
        const ticket = new Ticket(data.id, data.content);

        this.elements.tickets.appendChild(ticket.elements.root);
    }
}