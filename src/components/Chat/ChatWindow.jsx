import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useLoaderData } from "react-router-dom";
import "../Chat/chatwindow.css";
import { Slack } from "../../utils/axios";
import { User } from "lucide-react";
import Loader from "../../pages/Loader/Loader";

export default function ChatWindow({}) {
  const [conversationData, setConversationData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false)
  const channelID = useLoaderData();

  const payload = {
    receiver_id: channelID,
    receiver_class: "Channel",
  };

  const reqBody = {
    receiver_id: channelID,
    receiver_class: "Channel",
    body: inputValue,
  };

  useEffect(() => {
    async function fetchMsgs() {
      try {
        const res = await Slack.get(
          `/messages?receiver_id=${channelID}&receiver_class=Channel`,
          payload
        );
        const data = Object.values(res.data.data).flat();

        const mappedData = data.map((msgs) => ({
          body: msgs.body,
          senderUid: msgs.sender.uid,
        }));

        if(mappedData.length === conversationData.length) {
          return null 
        } else {
        setConversationData(mappedData)};
        setLoading(false)
      } catch (error) {
        console.log(error);
      } 
    }
    const interval = setInterval(fetchMsgs, 500)
    
    return () => clearInterval(interval);
  }, [channelID]);



  async function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    try {
      const res = await Slack.post("/messages", reqBody);
    } catch (error) {
      console.log(error)
    } finally{
      setInputValue('')
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  return (
    <div className="chat-window">
      <div className="chat-header">{channelID}</div>
      <div className="window-content">

      
        {!loading ? conversationData.map((msg, index) => (
          <Chat key={index} sender={msg.senderUid} msg={msg.body} />
        )) : <Loader />}
  



      </div>
      <form onSubmit={handleSubmit} className="msg-form">
        <Input placeholder={"Message"} className={"msg-input"} type={"text"}
        onChange={handleChange} value={inputValue}/>
      </form>
    </div>
  );
}

function Chat({ sender, msg }) {
  return (
    <div className="msgs">
     <div className="icon"> <User/></div>
     <div className="msg-content">
     <div className="sender"> {sender} </div>
     <div className="message"> {msg} </div>
     </div>
    </div>
  );
}
