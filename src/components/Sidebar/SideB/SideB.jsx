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

export default function SideB({ conversations }) {
  const username = localStorage.getItem("uid");

  console.log('con', conversations)

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
        Direct Messages <Minus size={18} strokeWidth={2} />
      </div>
      <section className="messages">

      {conversations.map((conversation, index) => (
          <Link to={`chat/${conversation.id}`} key={index}>
          <DMIcon conversations={conversations} /> 
          </Link>
        ))}

        
      </section>

      <section className="user">
        <div className="username">
          <User2 size={18}/> {username}
        </div>
        <Mic size={17} cursor={"pointer"} />
        <Headphones size={17} cursor={"pointer"} />
        <Settings size={17} cursor={"pointer"} />
      </section>
    </div>
  );
}
