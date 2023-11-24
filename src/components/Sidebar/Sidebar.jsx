import React, { useState, useEffect } from "react";
import "../Sidebar/sidebar.css";
import SideA from "./SideA/SideA";
import SideB from "./SideB/SideB";
import Modal from "./Modal/ServerModal";
import ChatWindow from "../Chat/ChatWindow";
import { Slack } from "../../utils/axios";
import { Outlet } from "react-router-dom";
import DMModal from "./DMModal/DMModal";

export default function Sidebar({ fetchUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dmModalOpen, setdmModalOpen] = useState(false);
  const [channelData, setChannelData] = useState(null);
  const [channelsList, setChannelsList] = useState([]);
  const [conversations, setConversations] = useState([]);

  const userID = localStorage.getItem('id')
  // channel modal
  const handlePlusClick = () => setIsModalOpen(true);
  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  // handle submit for channels
  function handleStanleySubmit(payload) {
  async function createChannel() {
    try {
      const res = await Slack.post('/channels', payload);
      if (res.status === 200) {
        const channels = Object.values(res.data.data).flat()
        setChannelData(channels);
        fetchChannels();
        setIsModalOpen(false);
      } 
    } catch (error) {
      console.error(error);
    }
  }
  createChannel()
  }
  
  // dm modal
  const handleUserClick = () => setdmModalOpen(true)
  const closeModal = (e) => {
    e.preventDefault();
    setdmModalOpen(false);
  };


  // fetch channels
  async function fetchChannels() {
    try {
      const res = await Slack.get('/channels');
      const channels = Object.values(res.data.data).flat()
      const channelNames = channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      }));
      setChannelsList(channelNames);
    } catch (error) {
      console.error(error);
    }  
  }
  
  useEffect(() => {
    if(channelsList.length === 0) {
      fetchChannels()
    }}, [channelsList]);

    
    useEffect(() => {
      if (channelData) {
        setChannelsList((prevChannelsList) => [...prevChannelsList, channelData.name]);
      }
    }, [channelData]);


// retrieve msgs
async function fetchMessages() {
try {
  const res = Slack.get(`/messages?receiver_id=${userID}&receiver_class=User`)
  const convos = Object.values(res.data.data).flat()
  const convoData = convos.map((convo)=> ({
    id: convo.id,
    body: convo.body
  }));
  setConversations(convoData)
} catch (error) {
  console.log(error)
}
}

useEffect(() => {
  if(conversations.length === 0) {
    fetchMessages()
  }}, [conversations]);








  return (
    <div className="sidebar-container">
      <SideA fetchUsers={fetchUsers} handlePlusClick={handlePlusClick} channelList={channelsList} handleUserClick={handleUserClick} />
      <SideB channelList={channelsList}/>
      {isModalOpen && (
        <Modal
          onStanleySubmit={handleStanleySubmit}
          onClose={handleCloseModal}
          fetchUsers={fetchUsers}
        />
        )}
        {dmModalOpen && (<DMModal onClose={closeModal} fetchUsers={fetchUsers}/>)
        }
        <Outlet />
    </div>
  );
}