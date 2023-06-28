import { useState } from "react";
import DatePicker from 'react-datepicker';
import "../css/projectCreate.css";
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";
import { Fragment } from "react";

//The component for the form 
function ProjectCreate ({onCreate}){
    //Initialising the use states of all necessary information
    const [projectName, setName] = useState(''); 
    const [desc,  setDesc] = useState(''); 
    const [endD,  setEndD] = useState(new Date());
    const [startD, setStartD] = useState(new Date()); 

    //Handles the date being  added 
    const handleData = (events) =>{
        events.preventDefault();
        //If the project name has not been inputterd show alert
        if(projectName.length === 0){
            alert("Please Enter the inputs");
            return;
        }else{
            //else, create a new project 
            onCreate(projectName.slice(0,1).toUpperCase() + projectName.slice(1, projectName.length), desc,moment(startD).format("YYYY-MM-DD HH:mm"), endD);
            //Clearing the inputs 
            setName('');
            setDesc('');
            setStartD('');
            setEndD('');
        }
    }

    return (
        <Fragment>
            <h2>Create Project</h2>
            <form id="create-form" onSubmit={handleData}>
                {/* Gathers text inputs and handles it  */}
                <label>Title</label>
                <input value={projectName} onChange={(e)=>setName(e.target.value)}/>
                <label>Description</label>
                <textarea value={desc} onChange={(e)=> setDesc(e.target.value)}/>
                {/* Displays a calendar and time and grabs value given by the user */}
                <label>Start Date</label>
                <DatePicker 
                    showTimeSelect
                    minTime={new Date(0, 0, 0, 1, 0)}
                    maxTime={new Date(0, 0, 0, 24, 0)}
                selected={startD} onChange={(startD) => setStartD(startD)}/>
                <label>End Date</label>
                <DatePicker 
                    showTimeSelect
                    minTime={new Date(0, 0, 0, 1, 0)}
                    maxTime={new Date(0, 0, 0, 24, 0)}
                selected={endD} onChange={(endD) => setEndD(endD)}/>
                {/* submit button */}
                <button id="submit">Submit!</button>
            </form>
        </Fragment>
    );
}

export default ProjectCreate;