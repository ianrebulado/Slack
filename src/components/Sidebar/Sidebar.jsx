import React, { useState } from "react";
import "../Sidebar/sidebar.css";
import SideA from "./SideA/SideA";
import SideB from "./SideB/SideB";
import Modal from "./Modal/ServerModal";

export default function Sidebar({ fetchUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePlusClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="sidebar-container">
      <SideA fetchUsers={fetchUsers} handlePlusClick={handlePlusClick} />
      <SideB />
      {isModalOpen && <Modal onClose={handleCloseModal} fetchUsers={fetchUsers} />}
    </div>
  );
}


