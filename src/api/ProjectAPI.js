const pName = document.getElementById("p-name")
const pName1 = document.getElementById("p-name1")


export default class ProjectAPI{

    static deleteDetail(ticketId){
        const data = read();

        data.splice(1)
            
        
        save(data);
    }
    
    static addDetails(){
        var data = read();
        const id=1;

        var project = {
            projectId:1,
            projectName : "Intern",
            projectURL : "https://www.atlassian.com/software/jira",
            projectDescription : "Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.",
            projectCategory : "Software"

        }
        console.log(project.projectName)
        pName.textContent= project.projectName;
        pName1.textContent= project.projectName;
        data.push(project)
        save(data);
        return project;
    }
    
    static viewDetails(projectId){
        var data =read();

    }
} 


function read() {
    var json = localStorage.getItem("project-data");

    if (!json) {
        return [
            {
                projectId:1,
                projectName : "New Project",
                projectURL : "https://www.atlassian.com/software/jira",
                projectDescription : "Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.",
                projectCategory : "Software"
            },
            
        ]
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("project-data", JSON.stringify(data));
}
