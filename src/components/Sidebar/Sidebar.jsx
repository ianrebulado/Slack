import React, { useState, useEffect } from "react";
import "../Sidebar/sidebar.css";
import SideA from "./SideA/SideA";
import SideB from "./SideB/SideB";
import Modal from "./Modal/ServerModal";
import { Slack } from "../../utils/axios";

export default function Sidebar({ fetchUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelData, setChannelData] = useState(null);
  const [channelsList, setChannelsList] = useState([]);

  const handlePlusClick = () => setIsModalOpen(true);
  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };


  async function fetchChannels() {
    try {
      const res = await Slack.get('/channels');
      const channels = Object.values(res.data.data).flat()
      const channelNames = channels.map((channel) => channel.name);
      setChannelsList(channelNames);
    } catch (error) {
      console.error(error);
    }  
  }
  
  
  useEffect(() => {
    if(channelsList.length === 0) {
      fetchChannels()
      console.log(channelsList)
    }}, [channelsList]);

    
    useEffect(() => {
      if (channelData) {
        setChannelsList((prevChannelsList) => [...prevChannelsList, channelData.name]);
      }
    }, [channelData]);

  function handleStanleySubmit(payload) {
    async function createChannel() {
      try {
        const res = await Slack.post('/channels', payload);
        if (res.status === 200) {
          setChannelData(res.data.data);
          fetchChannels();
          setIsModalOpen(false);
        } 
      } catch (error) {
        console.error(error);
      }
    }
    createChannel()
  }

  console.log('list', channelsList)

  return (
    <div className="sidebar-container">
      <SideA fetchUsers={fetchUsers} handlePlusClick={handlePlusClick} />
      <SideB channelList={channelsList}/>
      {isModalOpen && (
        <Modal
          onStanleySubmit={handleStanleySubmit}
          onClose={handleCloseModal}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
}