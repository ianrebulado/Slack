import React, { useEffect, useState, useRef } from "react";
import { User } from "lucide-react";
import Input from "../Input";
import { useLoaderData } from "react-router-dom";
import { Slack } from "../../utils/axios";


export default function DMWindow() {
const [inputValue, setInputValue] = useState('')
const [chats, setChats] = useState([])
const id = useLoaderData()
const chat = useRef(null)

  async function fetchMsgs() {
  try {
    const res = await Slack.get(`messages?receiver_id=${id}&receiver_class=User`)
    const chatData = Object.values(res.data.data).flat()
    console.log('cd', chatData)

    if (chatData.length === chats.length){
      return null
    } else{
      setChats(chatData)
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchMsgs(); 
  const interval = setInterval(fetchMsgs, 5000);
  return () => clearInterval(interval);
}, []);




console.log('cd', chats)
const payload = {
  receiver_id: id,
  receiver_class: 'User',
  body: inputValue
}


async function handleSubmit(e){
  e.preventDefault();
  if (inputValue.trim() === '') {
    return;
  }
try {
  const res = await Slack.post('messages', payload)
} catch (error) {
  console.log(error)
} finally {
  setInputValue('')
}
}

useEffect(() => {
  chat.current.scrollTop = chat.current.scrollHeight;
}, [chats]);

function handleChange(e) {
  setInputValue(e.target.value)
}

  return(
    <div className="chat-window">
    <div className="chat-header">{id} </div>
    <div className="window-content" ref={chat}>

    {chats.map((chat, index) => (
          <Chat key={index} sender={chat.sender.uid} msg={chat.body} />
        ))}

    </div>
    <form className="msg-form" onSubmit={handleSubmit}>
      <Input placeholder={"Message"} className={"msg-input"} type={"text"} onChange={handleChange} value={inputValue}/>
    </form>
  </div>
  )
}

function Chat({ sender, msg }) {
  const you = localStorage.getItem('uid')
  return (
    <div className="msgs">
     <div className="icon"> <User /></div>
     <div className="msg-content">
     <div className="sender"> {sender === you ? "You" : sender } </div>
     <div className="message"> {msg} </div>
     </div>
    </div>
  );
}
