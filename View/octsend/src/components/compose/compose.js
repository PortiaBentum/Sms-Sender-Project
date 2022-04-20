import './compose.css';
import Oct from '../../assets/octLogo.png';
import { useState } from 'react';



const Compose = () =>{


    const [messageSubject, setMessageSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const [contacts, setContacts] = useState("");

    const handleMessageSubject = (e) => {
        setMessageSubject(e.target.value);
    }

    const handleMessageBody = (e) => {
        setMessageBody(e.target.value);
    }

    const handleMessageReceiver = (e) => {
        setContacts(e.target.value)
    }

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const splitContacts = contacts.split(";");


            console.log(splitContacts);
            const body =  { messageSubject, messageBody, splitContacts };
            const africastalkingResponse = await fetch("https://api.africastalking.com/version1/messaging", {
                method: "POST",
                mode: 'no-cors',
                to: splitContacts,
                message: messageBody,
                from: "OctoSenda", 
                username: "octosenda",
                headers: {"username": USER_NAME,"apiKey": API_KEY,"content-type": "application/json", "accept":"string"},
                bultSMSMode: 1
            })

            console.log(africastalkingResponse);  

            splitContacts.forEach(async (messageReceiver) => {
                const body =  { messageSubject, messageBody, messageReceiver };
                const response = await fetch("http://localhost:5000/messages", {
                    method: "POST",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(body)
                });
                console.log(response);
                console.log(messageReceiver, messageSubject, messageBody)
            })

            setContacts("");
            setMessageSubject("");
            setMessageBody("");
           
        } catch (err) {
            console.error(err.message)
        }
    }


    let oct= Oct;

    return (
        <div className="grids-container">
            <div className="logo">
                <img src={oct} alt="octsend logo" />
            </div>
            <div className="left-section-compose">
                <div className="header-2">
                    <h2>Compose</h2>
                    <h2>History</h2>
                    <h2>Saved Templates</h2> 
                </div>            
            </div>
            <div className="main-section">            
                    <h1>Compose</h1>
                    <div className="main-message-section">
                        <div className="main-message">                                                           
                            <div className="form-section">
                                <form>
                                    <input type="text" onChange={handleMessageReceiver} value={contacts} placeholder="Enter a Number" id="compose-number" />
                                    <br />
                                    <input type="text" onChange={handleMessageSubject} value={messageSubject} placeholder="Subject" id="compose-subject"/>
                                    <br />
                                    <textarea type="text" onChange={handleMessageBody} value={messageBody} placeholder="Message..." className="message-mobile" id="message " required></textarea>
                                    <button>Save Templates</button>
                                    <button onClick={handleSend}>Send Now</button>
                                    <button>Send Later</button>
                                </form>   
                            </div>                            
                        </div>            
                </div>    
            </div>
        </div>  
    )
}

export default Compose;