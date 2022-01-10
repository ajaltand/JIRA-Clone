export default class JiraAPI {
    static getItem(statusId) {
        const status = read().find(status => status.id == statusId);
    
        if (!status) {
            return [];
        }

        return status.tickets;
    }

    static insertItem(statusId, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority) {
        const data = read();
        const status = data.find(status => status.id == statusId);
        const ticket = {
            id: Math.floor(Math.random() * 1000),
            issueName,
            issueType,
            issueDetail, 
            issueReportor, 
            issueAssignee, 
            issuePriority
            
            
        }
        
        status.tickets.push(ticket);
        save(data);

        return ticket;

    }

    static viewItems(ticketId){
        const data = read();
        const [ticket, currentStatus] =(() => {
            for (const status of data){
                const ticket = status.tickets.find(ticket => ticket.id == ticketId);

                if(ticket){
                    console.log(ticket.issueName)
                    return [ticket, status]
                }
                
             }
             
        })();
    }

    static updateItems(ticketId, newData){
        const data = read();
        const [ticket, currentStatus] =(() => {
            for (const status of data){
                const ticket = status.tickets.find(ticket => ticket.id == ticketId);

                if(ticket){
                    return [ticket, status]
                }
             }
        })();

        ticket.issueName = newData.issueName === undefined ? ticket.issueName : newData.issueName;
        ticket.issueType = newData.issueType === undefined ? ticket.issueType : newData.issueType;
        ticket.issueDetail = newData.issueDetail === undefined ? ticket.issueDetail : newData.issueDetail;
        //ticket.statusId = newData.statusId === undefined ? ticket.statusId : newData.statusId;
        ticket.issueAssignee = newData.issueAssignee === undefined ? ticket.issueAssignee : newData.issueAssignee;



        // Updates the status and it's position

        if (newData.statusId !== undefined && newData.position !== undefined){
            const targetStatus = data.find(status => status.id == newData.statusId);
            
            // Removes the ticket from original status
            currentStatus.tickets.splice(currentStatus.tickets.indexOf(ticket), 1);

            // Moves the ticket to its new status
            targetStatus.tickets.splice(newData.position,0,ticket);
        }
        save(data);
    }

    static deleteItem(ticketId){
        const data = read();

        for(const status of data){
            const ticket = status.tickets.find(ticket => ticket.id == ticketId);
        
            if (ticket) {
                status.tickets.splice(status.tickets.indexOf(ticket), 1)
            }
        }
        save(data);
    }

    static viewStatus(ticketId){
        const data = read();  
            const currentStatus =(() => {
                for (const status of data){
                    const ticket = status.tickets.find(ticket => ticket.id == ticketId);
    
                    if(ticket){
                        const tStatus = document.getElementById("t-status");
                        var statusTitle;
                        if(status.id==1){statusTitle="BACKLOG"} 
                        else if(status.id==2){statusTitle="IN PROGRESS"}
                        else statusTitle="DONE" 
                        tStatus.textContent=statusTitle;

                        /* When the user clicks on the button, 
            toggle between hiding and showing the dropdown content */

            const statusDropdownClick = document.getElementById("t-status");
            const clickedBacklog = document.getElementById("backlog")
            const clickedProgress = document.getElementById("progress")
            const clickedDone = document.getElementById("done")
 
            statusDropdownClick.addEventListener("click", ()=>{
                
                document.getElementById("statusDropdown").classList.toggle("show1");

                clickedBacklog.addEventListener("click", () => {  
                        var newStatus = clickedBacklog.textContent;
                        var statusId=1;
                        updateStatus(statusId,newStatus);
                        
                        
                })

                clickedProgress.addEventListener("click", () => {  
                    var newStatus = clickedProgress.textContent;
                    var statusId=2;
                    updateStatus(statusId,newStatus);
                    
                        
                })

                clickedDone.addEventListener("click", () => {  
                    var newStatus = clickedDone.textContent;
                    var statusId=3;
                    updateStatus(statusId,newStatus);
                    
                        
                })

                function updateStatus(statusId,newStatus){
                    
                    if (statusId == statusTitle) {
                        return;
                    }
                    statusTitle=newStatus;
                    
                    JiraAPI.updateItems(ticketId, {
                        statusId:statusId,
                        position:0  
                    })
                    tStatus.textContent=statusTitle;
                }
            } )
  
            // Close the dropdown if the user clicks outside of it
            window.onclick = function(event) {
                if (event.target.matches('.dropdown-content')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show1')) {
                    openDropdown.classList.remove('show1');
                    }
                }
                }
            }

                    }
                 }
            })();
    }

    
}

function read() {
    const json = localStorage.getItem("ticket-data");

    if (!json) {
        return [
            {
                id : 1,
                tickets : []
            },
            {
                id : 2,
                tickets : []
            },
            {
                id : 3,
                tickets : []
            },
        ]
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("ticket-data", JSON.stringify(data));
}

