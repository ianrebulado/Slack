import React, { useState, useEffect } from "react";
import "../Sidebar/sidebar.css";
import SideA from "./SideA/SideA";
import SideB from "./SideB/SideB";
import Modal from "./Modal/ServerModal";
import { Slack } from "../../utils/axios";
import { Outlet } from "react-router-dom";
import DMModal from "./DMModal/DMModal";
import Logout from "./Modal/Logout";

export default function Sidebar({ fetchUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dmModalOpen, setdmModalOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false)
  const [channelData, setChannelData] = useState(null);
  const [channelsList, setChannelsList] = useState([]);
  const [loading, setLoading] = useState(false);

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
const [selectedUsers, setSelectedUsers] = useState([])

  // dm modal
  const handleUserClick = () => setdmModalOpen(true);
  const closeModal = (e) => {
    e.preventDefault();
    setdmModalOpen(false);
  };

function handleSubmit(selectedUser) {
  setSelectedUsers((prev)=> [...prev, selectedUser])
  setdmModalOpen(false)
}

const handleLogoutClick = () => setLogoutModal(true)



  return (
    <div className="sidebar-container">
      <SideA
        fetchUsers={fetchUsers}
        handlePlusClick={handlePlusClick}
        channelList={channelsList}
        handleUserClick={handleUserClick}
        handleLogoutClick={handleLogoutClick}
      />
      <SideB selectedUsers={selectedUsers} />
    {logoutModal && (
      <Logout onClose={() => setLogoutModal(false)}
      />
    )
    }
      {isModalOpen && (
        <Modal
          onStanleySubmit={handleStanleySubmit}
          onClose={handleCloseModal}
          fetchUsers={fetchUsers}
        />
      )}
      {dmModalOpen && (
        <DMModal
          onClose={closeModal}
          fetchUsers={fetchUsers}
          onIanSubmit={handleSubmit}
        />
      )}
      <Outlet />
    </div>
  );
}
