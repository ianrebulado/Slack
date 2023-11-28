import React from "react";
import DMIcon from '../../DM/DMIcon'
import { Link } from "react-router-dom";

import {
  Users2,
  Rocket,
  User2,
  Settings,
  Mic,
  Headphones,
  Minus
} from "lucide-react";
import "../SideB/side-b.css";

export default function SideB({selectedUsers}) {
const name = localStorage.getItem('uid')

  return (
    <div className="side-b">
      <div className="top-separator" />
      <div className="sideb-header">
        <Users2 strokeWidth={2.5} /> Friends
      </div>
      <div className="sideb-header">
        <Rocket strokeWidth={2.5} /> Turbo
      </div>

      <div className="message-header">
        Direct Messages <Minus  size={18} strokeWidth={2} />
      </div>
      <section className="messages">

        {selectedUsers.map((user, index) =>(
          <Link to={`chat/${user.value}`} key={index}>
          <DMIcon id={user.label} />
          </Link>
        ))}

      </section>
      <section className="user">
        <div className="username">
          <User2 size={18}/> {name}
        </div>
        <Mic size={17} cursor={"pointer"} />
        <Headphones size={17} cursor={"pointer"} />
        <Settings size={17} cursor={"pointer"} />
      </section>
    </div>
  );
}
