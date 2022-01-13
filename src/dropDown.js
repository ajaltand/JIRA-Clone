import JiraAPI from "./api/JiraAPI.js";

export default class Update{
static updateFunction(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority,typeImage){
    
    const modal = document.getElementById("ticket-modal-content")

    const type = document.getElementById("type");
    const typeDropdownClick = document.getElementById("code")
    const clickedIssue = document.getElementById("issue")
    const clickedStory = document.getElementById("story")
    const clickedBug = document.getElementById("bug")

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
                
    typeDropdownClick.addEventListener("click", (e) =>{
        e.stopPropagation();
        document.getElementById("typeDropdown").classList.toggle("show");

        clickedIssue.addEventListener("click", () => {  
            var newType = clickedIssue.textContent;
            updateType(newType);
        })

        clickedBug.addEventListener("click", () => {  
            var newType = clickedBug.textContent;
            updateType(newType);
        })

        clickedStory.addEventListener("click", () => {  
            var newType = clickedStory.textContent;
            updateType(newType);
        })

        function updateType(newType){
                        
            if (newType == issueType) {
                return;
            }

            issueType=newType;
            JiraAPI.updateItems(id, {
                issueType:issueType,   
            })

            type.textContent=issueType;
        }
    } )
    
    //Close the dropdown if the user clicks outside of it
    modal.onclick = function(event) {
        if (!event.target.matches('#code')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                        }
            }
        }
    }

    const assignee  = document.getElementById("t-assignee");
    const assigneeDropdownClick = document.getElementById("ti-assignee");
    const clickedAdam = document.getElementById("adam");
    const clickedNick = document.getElementById("nick");
    const clickedEvans = document.getElementById("evans");



    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
                
    assigneeDropdownClick.addEventListener("click", (e)=>{
        e.stopPropagation();
        document.getElementById("assigneeDropdown").classList.toggle("show2");

        clickedAdam.addEventListener("click", () => {   
            var newAssignee = clickedAdam.textContent;
            updateAssignee(newAssignee);
           
        })

        clickedNick.addEventListener("click", () => {  
            var newAssignee = clickedNick.textContent;
            updateAssignee(newAssignee);
           
        })

        clickedEvans.addEventListener("click", () => {  
            var newAssignee = clickedEvans.textContent;
            updateAssignee(newAssignee);
            
        })

        function updateAssignee(newAssignee){
                      
            if (newAssignee == issueAssignee) {
                return;
            }

            issueAssignee=newAssignee;
            
            
            JiraAPI.updateItems(id, {
                issueAssignee:issueAssignee,   
                
            })
            
            assignee.textContent=issueAssignee;
        }
    } )
    
    // Close the dropdown if the user clicks outside of it
    modal.onclick = function(event) {
        if (!event.target.matches('#ti-assignee')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show2')) {
                openDropdown.classList.remove('show2');
                
                    }
            }
        }

       
    }

    const reporter  = document.getElementById("t-reporter");
    const reporterDropdownClick = document.getElementById("ti-reporter");
    const clickedAdam1 = document.getElementById("adam1");
    const clickedNick1 = document.getElementById("nick1");
    const clickedEvans1 = document.getElementById("evans1");



    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
                
    reporterDropdownClick.addEventListener("click", (e)=>{
        e.stopPropagation();
        document.getElementById("reporterDropdown").classList.toggle("show3");

        clickedAdam1.addEventListener("click", () => {   
            var newReporter = clickedAdam1.textContent;
            updateReporter(newReporter);
           
        })

        clickedNick1.addEventListener("click", () => {  
            var newReporter = clickedNick1.textContent;
            updateReporter(newReporter);
           
        })

        clickedEvans1.addEventListener("click", () => {  
            var newReporter = clickedEvans1.textContent;
            updateReporter(newReporter);
            
        })

        function updateReporter(newReporter){
                      
            if (newReporter == issueReportor) {
                return;
            }

            issueReportor=newReporter;
            console.log(issueReportor)
            
            JiraAPI.updateItems(id, {
                issueReportor:issueReportor,   
                
            })
            console.log(issueReportor)

            
            reporter.textContent=issueReportor;
        }
    } )
    
    // Close the dropdown if the user clicks outside of it
    modal.onclick = function(event) {
        if (!event.target.matches('#ti-reporter')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show3')) {
                openDropdown.classList.remove('show3');
                
                    }
            }
        }

       
    }

}}

