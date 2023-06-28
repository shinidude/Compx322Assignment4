import ProjectShow from "./ProjectShow";
import "../css/projectlist.css"; 

//The component for the list of projects 
function ProjectList({projects, onDelete, searchProject}){
    //Grabs rendered projects 
    const renderedProjects = projects
        //Filter the projects based on what is searched and if a searched had been donee
        .filter((project)=> {return searchProject.toLowerCase() === ''? project : project.projectName.toLowerCase().includes(searchProject)})
        .map((project)=>{
            return <ProjectShow key={project.projectIdentifier} project={project} onDelete={onDelete}/>;
    });

    //Returns the rendered projects in a table structure 
    return <div className="project-list">
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th></th>
                </tr>
                {renderedProjects}
            </tbody>
        </table>
        </div>
        ;
}
export default ProjectList;