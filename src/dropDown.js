import JiraAPI from "./api/JiraAPI.js";

export default class Update{
static updateFunction(id, issueName, issueType, issueDetail, issueReportor, issueAssignee, issuePriority){
    var type = document.getElementById("type");
    const typeDropdownClick = document.getElementById("type");
    const clickedIssue = document.getElementById("issue")
    const clickedStory = document.getElementById("story")
    const clickedBug = document.getElementById("bug")



    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
                
    typeDropdownClick.addEventListener("click", ()=>{
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
    
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('#type')) {
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

    const assignee  =document.getElementById("t-assignee")
    const assigneeDropdownClick = document.getElementById("t-assignee");
    const clickedAdam = document.getElementById("adam")
    const clickedNick = document.getElementById("nick")
    const clickedEvans = document.getElementById("evans")



    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
                
    assigneeDropdownClick.addEventListener("click", ()=>{
        document.getElementById("assigneeDropdown").classList.toggle("show");

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
            console.log(newAssignee)            
            if (newAssignee == issueAssignee) {
                return;
            }

            issueAssignee=newAssignee;
            
            JiraAPI.updateItems(id, {
                issueAssignee:issueAssignee,   
                
            })
            console.log(issueAssignee)
            assignee.textContent=issueAssignee;
        }
    } )
    
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('#t-assignee')) {
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
}
}
