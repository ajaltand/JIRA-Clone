import JiraAPI from "../api/JiraAPI.js";
import JiraBoard from "./JiraBoard.js";

export default class DropDivArea {
    static createDropDivArea() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropDivArea =  range.createContextualFragment(`
        <div class ="dropDivArea">
    
        </div>
        `).children[0];

        dropDivArea.addEventListener("dragover", e => {
            e.preventDefault();
            dropDivArea.classList.add("dropDivArea--active")
        });

        dropDivArea.addEventListener("dragleave", () => {
            dropDivArea.classList.remove("dropDivArea--active")
        })

        dropDivArea.addEventListener("drop", e => {
            dropDivArea.classList.remove("dropDivArea--active")

            const statusElement = dropDivArea.closest("#status");
            const statusId = Number(statusElement.dataset.id);

            const dropAreaStatus = Array.from(statusElement.querySelectorAll(".dropDivArea"));
            const indexDrop = dropAreaStatus.indexOf(dropDivArea) 
            const ticketId = Number(e.dataTransfer.getData("text/plain"))
            const ticketElementDrop = document.querySelector(`[data-id="${ticketId}"]`);
            const insertAfter = dropDivArea.parentElement.classList.contains("ticket") ? dropDivArea.parentElement : dropDivArea;

            insertAfter.after(ticketElementDrop)

            JiraAPI.updateItems(ticketId, {
                statusId,
                position: indexDrop
            })
        })


        return dropDivArea;
    }
}
    