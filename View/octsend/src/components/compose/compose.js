import './compose.css';
import Oct from '../../assets/octLogo.png';
import { useState } from 'react';
import ComposeForm from './compose2';
import History from '../history/history';
import SavedTemplates from '../SavedTemplates/savedTemplates';
import { useNavigate } from 'react-router-dom';



const Compose = () =>{    

    const myStle = {
        color: "#F9A826"
    }

    let hone = {
        first: "Compose",
        second: "History",
        third: "Saved Templates"
        
    }

    const [hOne, setHOne] = useState(hone.first);
    const [form, setForms] = useState(<ComposeForm />)
    const [color, setColor] = useState()

    let oct= Oct;

    const changeHOne = (hOne, form) =>{
        setHOne(hOne);
        setForms(form)
    }

    let navigate = useNavigate();

    return (
        <div className="grids-container">
            <div className="logo">
                <img src={oct} alt="octsend logo" />
            </div>
            <div className="left-section-compose">
                <div className="header-2">
                    <h2 onClick={()=>changeHOne(hone.first, <ComposeForm /> )}>Compose</h2>
                    <h2 onClick={()=>changeHOne(hone.second, <History />)}>History</h2>
                    <h2 onClick={()=>changeHOne(hone.third, <SavedTemplates />)}>Saved Templates</h2>
                    <h2 onClick={()=> {navigate("/signin")}}>Log Out</h2> 
                </div>            
            </div>
            <div className="main-section">            
                <h1>{hOne}</h1>
                <div className="main-message-section">
                       {form}             
                </div>    
            </div>
        </div>  
    )
}

export default Compose;