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

