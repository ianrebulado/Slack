import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useLoaderData } from "react-router-dom";
import "../Chat/chatwindow.css";
import { Slack } from "../../utils/axios";
import { User } from "lucide-react";

export default function DMWindow({}) {
//   const [conversationData, setConversationData] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   const receiverID = useLoaderData();
//   const userID = localStorage.get('id')



//   const payload = {
//     receiver_id: userID,
//     receiver_class: "User",
//   };

//   const reqBody = {
//     receiver_id: receiverID,
//     receiver_class: "User",
//     body: inputValue,
//   };

  // useEffect(() => {
  //   async function fetchMsgs() {
  //     try {
  //       const res = await Slack.get(
  //         `/messages?receiver_id=${userID}&receiver_class=User`,
  //         payload
  //       );
  //       const data = Object.values(res.data.data).flat();

  //       const mappedData = data.map((msgs) => ({
  //         body: msgs.body,
  //         senderUid: msgs.sender.uid,
  //       }));
  //       setConversationData(mappedData);
  //     } catch (error) {
  //       console.log(error);
  //     } 
  //   }
  //   const interval = setInterval(fetchMsgs, 500)
    
  //   return () => clearInterval(interval);
  // }, [channelID]);



  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   if (inputValue.trim() === '') {
  //     return;
  //   }

  //   try {
  //     const res = await Slack.post("/messages", reqBody);
  //   } catch (error) {
  //     console.log(error)
  //   } finally{
  //     setInputValue('')
  //   }
  // }

  // function handleChange(e) {
  //   setInputValue(e.target.value)
  // }

  // return (
  //   <div className="chat-window">
  //     <div className="chat-header">{receiverID}</div>
  //     <div className="window-content">
  //       {conversationData.map((msg, index) => (
  //         <Chat key={index} sender={msg.senderUid} msg={msg.body} />
  //       ))}

        
{/* {conversationData.map((msg, index) => (
  <React.Fragment key={index}>
    {index === 0 || msg.senderUid !== conversationData[index - 1].senderUid ? (
      <Chat key={index} sender={msg.senderUid} msg={msg.body} />
    ) : (
      <div key={index}>{msg.body}</div>
    )}
  </React.Fragment>
))} */}
{/* ask sir ano to */}

//       </div>
//       <form onSubmit={handleSubmit} className="msg-form">
//         <Input placeholder={"Message"} className={"msg-input"} type={"text"}
//         onChange={handleChange} value={inputValue}/>
//       </form>
//     </div>
//   );
}

function Chat({ sender, msg }) {
  return (
    <div className="msgs">
     <div className="icon"> <User color="blue"/></div>
     <div className="msg-content">
     <div className="sender"> {sender} </div>
     <div className="message"> {msg} </div>
     </div>
    </div>
  );
}
