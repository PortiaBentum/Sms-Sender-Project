import '../compose/compose.css';
import { useState, useEffect } from 'react';
import EditMessage from './EditMessage';

const History = () =>{

    const [history, setHistory] = useState([]);
    const [spinner, setSpinner] = useState("display");
 

    const getHistory = async () => {
        try {
            const response = await fetch("http://localhost:5000/messages");
            const jsonData = await response.json();
            setSpinner("none")
            
            setHistory(jsonData);

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=>{getHistory()},[])


    return(
        <>
            <div className="text-center"  style={{display: `${spinner}`}}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            

            <div className="container-history">
            {history.map(message => (
                <div className="hisory-message-section" key={message.message_id}>
                <div className="hisory-message">
                    <div>
                        <h3>{message.receiver_contact}</h3>
                        <p id="subject">{message.message_subject}</p>
                        <p id="message">{message.message_body}</p>
                    </div>                    
                </div>
                <div className="btn">
                    <EditMessage message={message}/>
                    <button >Resend</button>
                </div>                
                </div>
            ))}
            </div>
        </>

    )
    
}

export default History;