import React, { useState, useEffect } from "react";
import Input from "../../Input";
import FormLabel from "../../FormLabel";
import Button from "../../Button";
import Select from "react-select";
import { Slack } from "../../../utils/axios";
import "../Modal/modal.css";

export default function Modal({ onClose, fetchUsers, onStanleySubmit }) {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [channelName, setChannelName] = useState("")

  const options = fetchUsers.map((user) => {
    return {
      value: user.id,
      label: user.uid,
      };
    });


   function addUser(userOptions) {
     const selectedUID = userOptions.map((option) => option.label);
     setSelectedUsers(selectedUID)
     console.log('setselectedUsers', selectedUID)
  }

    function nameChannel(e){
      setChannelName(e.target.value)
    }

  const payload = {
    name: channelName,
    user_ids: selectedUsers
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    onStanleySubmit(payload)
  } 

  

console.log(channelName)

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit}>
        <h2> Add a server </h2>
        <FormLabel label={"SERVER NAME"} />
        <Input className={"server-input"} onChange={nameChannel} value={channelName} />
        <FormLabel label={"SELECT USERS"} />
        <Select
          options={options}
          placeholder=""
          className="select-dropdown"
          isMulti
          onChange={addUser}
        />
        <div className="buttons">
          <Button
            className={"close-btn"}
            handleClick={onClose}
            text={"CLOSE"}
          />
          <Button className={"create-btn"} text={"CREATE"} />
        </div>
      </form>
    </div>
  );
}
