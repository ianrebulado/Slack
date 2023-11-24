import React, { useState } from "react";
import { redirect, useNavigate, Link } from "react-router-dom";
import "../SideA/side-a.css";
import ChatIcon from "../../Chat/ChatIcon";
import logo from "../../../images/discordpng.png";
import { Users2, Plus, LogOut } from "lucide-react";

export default function SideA({
  handlePlusClick, channelList, handleUserClick
}) {
  const [usersHovered, setUsersHovered] = useState(false);
  const [plusHovered, setPlusHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  // hover arte
  const handleUsersHover = () => setUsersHovered(true);
  const handleUsersLeave = () => setUsersHovered(false);
  const handlePlusHover = () => setPlusHovered(true);
  const handlePlusLeave = () => setPlusHovered(false);
  const handleLogoutHover = () => setLogoutHovered(true);
  const handleLogoutLeave = () => setLogoutHovered(false);

  // modal state
  const navigate = useNavigate();

  function handleLogoutClick() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="side-a">
      <div className="logo-container" onClick={()=> navigate('/m')}>
        <img src={logo} className="logo" />
      </div>
      
      <div className="separator" />

      <div
        className="usericon-container"
        onMouseEnter={handleUsersHover}
        onMouseLeave={handleUsersLeave}
        onClick={handleUserClick}
      >
        <Users2 color={usersHovered ? "white" : "#23A559"} />
      </div>

      <div
        className="plusicon-container"
        onMouseEnter={handlePlusHover}
        onMouseLeave={handlePlusLeave}
        onClick={handlePlusClick}
      >
        <Plus color={plusHovered ? "white" : "#23A559"} />
      </div>
      <div className="separator" />

      <div className="channel-section"> 
      {channelList.map((channel, index) => (
          <Link to={`/m/${channel.id}`} key={channel.id}>
          <ChatIcon channel={channel} /> 
          </Link>
        ))}
        {/* {console.log(channelList)} */}
      </div>
      <div className="separator" />
      
      <div
        className="logout-icon-container"
        onMouseEnter={handleLogoutHover}
        onMouseLeave={handleLogoutLeave}
        onClick={handleLogoutClick}
      >
        <LogOut color={logoutHovered ? "white" : "#23A559"} strokeWidth={2} />
      </div>
    </div>
  );
}
