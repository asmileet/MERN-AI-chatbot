import { useState } from 'react'
import Siderbar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext';
import{v1 as uuidv1} from "uuid";


import './App.css';

function App() {
  const[prompt , setPrompt] = useState("");
  const [reply , setReply] = useState("null");
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
   const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);


  const providerValue = {
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
     newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
    
  };

  return (
    <div className='app'>
     <MyContext.Provider value={providerValue}>
      
     <Siderbar></Siderbar>
     <ChatWindow></ChatWindow>
     </MyContext.Provider>
     
    </div>
  )
}

export default App
