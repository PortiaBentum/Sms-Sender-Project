import '../compose/compose.css';
import { useState, useEffect } from 'react';
import EditTemplate from './EditTemplate';

const SavedTemplates = () =>{
    const [templates, setTemplates] = useState([]);
    const [spinner, setSpinner] = useState("display");

    const getTemplates = async () => {
        try {
            const response = await fetch("http://localhost:5000/templates");
            const jsonData = await response.json();
            setSpinner("none")
            
            setTemplates(jsonData);

        } catch (err) {
            console.error(err)
        }
    }
 
    useEffect(()=>{getTemplates()},[])

    return(
        <div className="container-history">

        <div className="text-center" style={{display: `${spinner}`}}>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
        {
            templates.map(template => (
                <div className="hisory-message-section" key={template.template_id}>
                <div className="hisory-message">
                    <div>
                        <h3>{template.template_contacts}</h3>
                        <p id="subject">{template.template_subject}</p>
                        <p id="message">{template.template_body}</p>
                    </div>                    
                </div>
                <div className="btn">
                    <EditTemplate template={template}/>
                    <button>Send Now</button>
                </div>                
            </div>
            ))

        }           
        </div>
    )
}

export default SavedTemplates;