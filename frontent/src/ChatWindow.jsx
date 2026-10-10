import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./MyContext";
import { useContext,useState, useEffect} from "react";
import {ScaleLoader} from "react-spinners"



function ChatWindow() {
    const{prompt, setPrompt, reply, setReply ,currThreadId,prevChats,
  setPrevChats}= useContext(MyContext);
    const [loading, setLoading] = useState(false);
const getReply = async () => {
  setLoading(true);
  if (!currThreadId) {
    
    alert("Thread ID is missing. Cannot send message.");
    console.error("Missing threadId!");
    return;
  }

  console.log("Sending:", { message: prompt, threadId: currThreadId });

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: prompt,
      threadId: currThreadId
    })
  };

  try {
    const response = await fetch("http://localhost:8000/api/chat", option);
    const data = await response.json();
    console.log("Server response:", data);
    setReply(data.reply);
  } catch (err) {
    console.error("Fetch error:", err);
  }
  setLoading(false);
};

 //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    return ( 
        <>
           <div className="chatWindow">
            <div className="navbar">
                <span>SIGMAGPT <i className="fa-solid fa-angles-down"></i></span>
                <div className="USERDIV">
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
                <Chat></Chat>


             <ScaleLoader color="#ffff" loading= {loading}></ScaleLoader>
            <div className="CHATINPUT">
                <div className="USERINPUT">
                <input placeholder="ASK ANYTHINGS" value={prompt} onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}>
                 </input>
                <div id="submit" onClick={getReply}> <i className="fa-regular fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    CHATGPT CAN MAKE MISTAKE. CHECK IMPORTANT INFO.
                </p>
            </div>
           </div>
        </>
     );
}

export default ChatWindow;