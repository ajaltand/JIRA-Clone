import Status from "./Status.js";

export default class JiraBoard {
    constructor(root) {
        this.root=root;

        JiraBoard.statuss().forEach(status => {
            const statusView = new Status(status.id,status.title);
        
            this.root.appendChild(statusView.elements.root)
        });
    }  
    
    static statuss() {
        return [
            {
                id : 1,
                title : "BACKLOG"
            },
            {
                id : 2,
                title : "IN PROGRESS"
            },
            {
                id : 3,
                title : "DONE"
            }
        ]
    }
}