import JiraAPI from "./api/JiraAPI.js";
import Ticket from "./userView/Ticket.js";
import Status from "./userView/Status.js";


const createTicketModal = document.getElementById("create-modal");
const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");

const createIssue = document.getElementById("left-nav-create");
const ticketName = document.getElementById("ticket-name");
const ticketType = document.getElementById("ticket-type");
const ticketDetails = document.getElementById("ticket-details");
const ticketAssignee = document.getElementById("assignee");
const ticketReporter = document.getElementById("reporter");
const ticketPriority = document.getElementById("priority");

const searchIssue = document.getElementById("left-nav-search");
const searchModal =  document.getElementById("search-modal");



const ticketModal = document.getElementById("ticket-modal");
const ticketClicked = document.getElementById("ticket");

createIssue.addEventListener("click", () => {
    createTicketModal.style.display="flex";

    createBtn.addEventListener("click", () => {
        const newType = ticketType.options[ticketType.selectedIndex].text;
        const newAssignee = ticketAssignee.options[ticketAssignee.selectedIndex].text;
        const newReporter = ticketReporter.options[ticketReporter.selectedIndex].text;
        const newPriority = ticketPriority.options[ticketPriority.selectedIndex].text;
        const newComment = "";

        JiraAPI.insertItem(1,ticketName.value,newType, ticketDetails.value, newAssignee, newReporter, newPriority,newComment)
        createTicketModal.style.display="none";
        document.documentElement.scrollTop = 0;

        const createPopMessage = document.getElementById("create-popMessage");
        createPopMessage.style.display="block";

        setTimeout(function() {
            location.reload();    
          }, 3000);

        
    })
    window.onclick = function(event) {
        if (event.target == createTicketModal){
            createTicketModal.style.display="none";
        }
    }
    
})




cancelBtn.addEventListener("click", () => {
    createTicketModal.style.display="none";
})

ticketClicked.addEventListener("click", () => {
  
    ticketModal.style.display="flex";
})


searchIssue.addEventListener("click", () => {
    const searchClose= document.getElementById("search-close");

    searchClose.addEventListener("click", () => {
        searchModal.style.display="none";

    })
    
    searchModal.style.display="block";

    window.onclick = function(event) {
        if (event.target == searchModal){
            searchModal.style.display="none";
        }
    }



    const search = document.getElementById("search-btn");
    const rmv = document.getElementById("remove");

    const searchBar = document.getElementById("search-input");

    const ticketDiv = document.getElementById('ticket') 

    const searchResult = document.getElementById("search-results")
    
   
        
        
    
    search.addEventListener('click', (e) => {

        
        remvDiv();
        
        

        var searchString = searchBar.value;

        
    
    

        
        JiraAPI.getItem(2).forEach(data => {
            
            if (data.issueName.includes(searchString) || data.issueAssignee.includes(searchString)){
        
                const ticket = new Ticket(data.id, data.issueName, data.issueType, data.issueDetail, data.issueReportor, data.issueAssignee, data.issuePriority);
                searchResult.appendChild(ticket.elements.root);
            }
            
        });
        JiraAPI.getItem(1).forEach(data => {
            
            if (data.issueName.includes(searchString) || data.issueAssignee.includes(searchString)){
                
                
                const ticket = new Ticket(data.id, data.issueName, data.issueType, data.issueDetail, data.issueReportor, data.issueAssignee, data.issuePriority);
                searchResult.appendChild(ticket.elements.root);
            }
            
        });
        JiraAPI.getItem(3).forEach(data => {
            
            if (data.issueName.includes(searchString || data.issueAssignee.includes(searchString))){
                
                const ticket = new Ticket(data.id, data.issueName, data.issueType, data.issueDetail, data.issueReportor, data.issueAssignee, data.issuePriority);
                searchResult.appendChild(ticket.elements.root);

            }
            
       });
        function remvDiv(){
            const searchResultOld = document.getElementById("search-results");
            var child = searchResultOld.lastElementChild; 
            while (child) {
                searchResultOld.removeChild(child);
                child = searchResultOld.lastElementChild;
        }
                
            
        }
        
    })

   

    

    
    

        
    })






