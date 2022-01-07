import JiraAPI from "../api/JiraAPI.js";
import DropDivArea from "./DropDivArea.js";


export default class Ticket {
    constructor(id, content) {
        this.elements = {};
        this.elements.root = Ticket.createDiv();
        this.elements.cont = this.elements.root.querySelector("#ticket-title")

        this.elements.root.dataset.id = id;
        this.elements.cont.textContent = content;
        this.content=content;

        const DropDivAreaDown = DropDivArea.createDropDivArea();
        this.elements.root.appendChild(DropDivAreaDown);

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain" , id);
        });

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
            </div>
        </div>            

        `).children[0];
    }
}