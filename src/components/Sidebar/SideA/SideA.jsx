import React, { useState } from "react";
import "../SideA/side-a.css";
import logo from "../../../images/discordpng.png";
import { Users2, Plus, LogOut } from "lucide-react";

export default function SideA() {
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

  return (
    <div className="side-a">
      <div className="logo-container">
        <img src={logo} className="logo" />
      </div>

      <div className="separator" />

      <div
        className="icon-container"
        onMouseEnter={handleUsersHover}
        onMouseLeave={handleUsersLeave}
      >
        <Users2 color={usersHovered ? "white" : "#23A559"} />
      </div>

      <div
        className="icon-container"
        onMouseEnter={handlePlusHover}
        onMouseLeave={handlePlusLeave}
      >
        <Plus color={plusHovered ? "white" : "#23A559"}  />
      </div>

      <div className="separator" />

      <div
        className="logout-icon-container"
        onMouseEnter={handleLogoutHover}
        onMouseLeave={handleLogoutLeave}
      >
        <LogOut color={logoutHovered ? "white" : "#23A559"} strokeWidth={2} />
      </div>
    </div>
  );
}
