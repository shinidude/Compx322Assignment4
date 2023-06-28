import Moment from 'react-moment';
import { Fragment } from 'react';
import {RiDeleteBack2Line} from "react-icons/ri";
//A component that shows how a project looks 
function ProjectShow({project, onDelete}){

    //if the delete button is clicked 
    const handleDeleteClick =()=>{
        //Selete the project 
        onDelete(project.projectIdentifier, project.projectName);
    };
    //Return the project in a row format 
    return(
        <Fragment key={project.projectIdentifier}>
            <tr>
                <td>{project.projectName}</td>
                {/* Changing the date format  */}
                <td><Moment format='MMMM Do YYYY, h:mm a'>{project.start_date}</Moment></td>
                <td><Moment format='MMMM Do YYYY, h:mm a'>{project.end_date}</Moment></td>
                {/* Delete button */}
                <td className="del-col"> 
                    <button id="delete" onClick={handleDeleteClick}>
                        <RiDeleteBack2Line size={'2rem'}/>
                    </button> 
                 </td>
            </tr>
        </Fragment>
    );
}
export default ProjectShow;