import React, { useState, useEffect } from "react";
import "../Sidebar/sidebar.css";
import SideA from "./SideA/SideA";
import SideB from "./SideB/SideB";
import Modal from "./Modal/ServerModal";
import { Slack } from "../../utils/axios";
import { Outlet } from "react-router-dom";
import DMModal from './DMModal/DMModal'

export default function Sidebar({ fetchUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dmModalOpen, setdmModalOpen] = useState(false);
  const [channelData, setChannelData] = useState(null);
  const [channelsList, setChannelsList] = useState([]);
  const [loading, setLoading] = useState(false)

  // channels ============================================================

  // channel modal
  const handlePlusClick = () => setIsModalOpen(true);
  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  // handle submit for channel modal
  function handleStanleySubmit(payload) {
    async function createChannel() {
      try {
        const res = await Slack.post("/channels", payload);
        if (res.status === 200) {
          const channels = Object.values(res.data.data).flat();
          setChannelData(channels);
          fetchChannels();
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    createChannel();
  }

  // fetch channels
  async function fetchChannels() {
    try {
      const res = await Slack.get("/channels");
      const channels = Object.values(res.data.data).flat();
      const channelNames = channels.map((channel) => ({
        id: channel.id,
        name: channel.name,
      }));
      setChannelsList(channelNames);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (channelsList.length === 0) {
      fetchChannels();
    }
  }, []);

  // DMS =======================================================================================



  const [conversationsList, setConversationsList] = useState([]);
  const [conversationData, setConversationData] = useState([]);

  const userID = localStorage.getItem("id");
  const payload = {
    receiver_id: userID,
    receiver_class: "User",
  };

  // dm modal
  const handleUserClick = () => setdmModalOpen(true);
  const closeModal = (e) => {
    e.preventDefault();
    setdmModalOpen(false);
  };

//   // fetch msgs
  async function retrieveConversations() {
    try {
      const res = await Slack.get(
        `/messages?receiver_id=${userID}&receiver_class=User`,
        payload
      );

      const conversations = Object.values(res.data.data).flat();
      const uniqueConversations = conversations.filter(
        (conversation, index, self) =>
          index === self.findIndex((c) => c.sender.uid === conversation.sender.uid)
      );

      const conversationNames = uniqueConversations.map((conversation) => ({
        id: conversation.id,
        body: conversation.body,
        name: conversation.sender.uid,
        receiver: conversation.receiver.uid
      }));

      setConversationsList(conversationNames);
    } catch (error) {
      console.error(error);
    }
  }
  // retrieveConversations()

  // function handleSubmit(selectedUser){
  //  setConversationData(selectedUser)
  //  setdmModalOpen(false)
  //  console.log(selectedUser)
  // }



  useEffect(() => {
    if (conversationsList.length === 0) {
      retrieveConversations();
    }
  }, []);

  return (
    <div className="sidebar-container">
      <SideA
        fetchUsers={fetchUsers}
        handlePlusClick={handlePlusClick}
        channelList={channelsList}
        handleUserClick={handleUserClick}
      />
      <SideB conversations={conversationsList}/>
      {isModalOpen && (
        <Modal
          onStanleySubmit={handleStanleySubmit}
          onClose={handleCloseModal}
          fetchUsers={fetchUsers}
        />
      )}
      {dmModalOpen && <DMModal onClose={closeModal} fetchUsers={fetchUsers} onIanSubmit={handleSubmit}/>}
      <Outlet />
    </div>
  );
}
