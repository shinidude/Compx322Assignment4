import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import ProjectCreate from "./ProjectCreate";
import { ImPlus,ImArrowUp,ImArrowDown } from "react-icons/im";
import {TiDelete} from "react-icons/ti";
import { v1 } from "uuid";
import "../css/app.css"; 

function App(){
    //Setting up the use state for the modal for adding a neew project 
    const [showForm, setShowModal]= useState(false);
    //Setting up the state of the projects as an empty array 
    const [projects,  setProjects] =useState([]);
    //Setting up te state for ordering the projects 
    const [sortOrder, setSortOrder] =useState('');
    const [sortBy, setSortBy] = useState('');
    //Setting up the state for searching the project 
    const [searchedProj,  setSearchProj] = useState('');

    //gets the projects from the json file 
    const getProjects = async ()=>{
       const res = await fetch('./data.json');
       const data =  await res.json();
       setProjects(data);
    }
    
    //Deleting the chosen project to be deleted
    const deleteProj = (id, name)=>{
        //Creating a copy of projects without the deleted one 
        const updatedProjects = projects.filter((project)=>{
            return project.projectIdentifier !==id && project.projectName !== name;
        }); 
        //Setting up the copy of porjects as the new projects 
        setProjects(updatedProjects);
    }

    //Allows the projects to be retrieved 
    useEffect(()=>{
        getProjects()
    }, []);

    //Adding a new project 
    const addProject =(projectName, description, start_date, end_date)=>{
        //Creating a copy where the added project is alsoo added
        const updatedProj =[
            ...projects, {
                projectName,
                projectIdentifier: v1(),
                description, 
                start_date, 
                end_date
            }
        ]
        //Setting the copy of projects as new projects 
        setProjects(updatedProj);
    }

    //Handles the toggle display of the form 
    const handleDisplay =()=>{
        setShowModal(showForm => !showForm);
    }

    //Set up the options for the select
    const optionsArr =[       
        {label: 'Name', value:'name'}, 
        {label: 'Date', value:'date'}    
    ];

    //handles the sorting of projects 
    const handleSorting =(e)=>{
        e.preventDefault();
        //a variable that caries what to sort by 
        let property;
        //Check the sortBy value and set the property to be sort based on it 
        sortBy==='date'? property="start_date":property="projectName";
        //Sort based on the order wanted
        if(sortOrder==='asc'){
           setProjects([...projects].sort((a, b) => a[property] > b[property] ? 1 : -1));     
        }else if (sortOrder==='desc'){
            setProjects([...projects].sort((a, b) =>  a[property]> b[property]  ? -1 : 1));
        }
    }
    //Variable that carries the form 
    let CreateForm;
    //if showform is true display the create form
    if (showForm){
        CreateForm = <div id="create-container">
                        <button id="close" onClick={handleDisplay}><TiDelete size={'2rem'}/></button>
                        <ProjectCreate onCreate={addProject}/>
                    </div>;
    }
    
    return (<div className="app-body">
        <div>
            <div id="header-box">
            <div id="header-section"><h1 id="header">Projects</h1></div>
            {/* display the button to togglle for create form  */}
            <button onClick={handleDisplay} id="toggle-button"><ImPlus size={'2rem'}/></button> 
            </div>
            <form id="sort-area" onSubmit={handleSorting}>
                <select onChange={e => setSortBy(e.target.value)}>
                    {/* displaying the options in the dropdown */}
                    <option hidden value="" id="place-holder">.........</option>
                    {optionsArr.map((item)=>{
                        return <option key={item.value} value={item.value}>{item.label}</option>;
                    })}
                </select>
                {/* The buttons for the sorting  */}
                <button onClick={()=>setSortOrder('asc')} className="sort-button"><ImArrowUp size={'1rem'}/></button>
                <button onClick={()=>setSortOrder('desc')} className="sort-button"><ImArrowDown size={'1rem'}/></button>
            </form>
            {/* input for searching the project */}
            <input id="search-bar" type="text" onChange={(e)=>setSearchProj(e.target.value)} placeholder="Enter Project Name..."/>
            {/* list of projects  */}
            <ProjectList projects={projects} onDelete={deleteProj} searchProject={searchedProj}/>  
        </div>
        {CreateForm}
    </div>);

}
export default App;