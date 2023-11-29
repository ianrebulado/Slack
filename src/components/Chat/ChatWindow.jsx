import React, { useEffect, useState, useRef } from "react";
import Input from "../Input";
import { useLoaderData } from "react-router-dom";
import "../Chat/chatwindow.css";
import { Slack } from "../../utils/axios";
import { User, PlusCircle, UserPlus, Phone, Video } from "lucide-react";
import Loader from "../../pages/Loader/Loader";
import AddMember from "./AddMember";
import { toastError, toastSuccess, toastWarning } from "../../utils/toast";

export default function ChatWindow({ fetchUsers }) {
  const [conversationData, setConversationData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const channelID = useLoaderData();
  const chat = useRef(null);

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

        if (mappedData.length === conversationData.length) {
          return null;
        } else {
          setConversationData(mappedData);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    const interval = setInterval(fetchMsgs, 500);

    return () => clearInterval(interval);
  }, [channelID]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.trim() === "") {
      return;
    }
    try {
      const res = await Slack.post("/messages", reqBody);
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    setAddModal(true);
  }

function addMember(addPayload){
  async function onModalSubmit() {
    console.log("clicked");
    console.log(addPayload);
    try {
      const res = await Slack.post("channel/add_member", addPayload);
      toastSuccess("Added new member");
    } catch (error) {
      toastError("Invalid");
    } finally {
      setAddModal(false);
    }
  }
  onModalSubmit()
}

  useEffect(() => {
    chat.current.scrollTop = chat.current.scrollHeight;
  }, [conversationData]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {channelID}
        <div className="header-icons">
        <Phone size={20} cursor={'pointer'} onClick={()=> toastWarning('Feature unavailable')}/> 
        <Video size={20}  cursor={'pointer'} onClick={()=> toastWarning('Feature unavailable')}/>
        <UserPlus size={20} cursor={"pointer"} onClick={handleClick} />
        </div>
      </div>
      <div className="window-content" ref={chat}>
        {!loading ? (
          conversationData.map((msg, index) => (
            <Chat key={index} sender={msg.senderUid} msg={msg.body} />
          ))
        ) : (
          <Loader />
        )}

        {addModal && (
          <AddMember
            channelID={channelID}
            onModalSubmit={addMember}
            onClose={() => setAddModal(false)}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="msg-form">
        <Input
          placeholder={"Message"}
          className={"msg-input"}
          type={"text"}
          onChange={handleChange}
          value={inputValue}
        />
      </form>
    </div>
  );
}

function Chat({ sender, msg }) {
  const you = localStorage.getItem("uid");
  return (
    <div className="msgs">
      <div className="icon">
        {" "}
        <User />
      </div>
      <div className="msg-content">
        <div className="sender"> {sender === you ? "You" : sender} </div>
        <div className="message"> {msg} </div>
      </div>
    </div>
  );
}
