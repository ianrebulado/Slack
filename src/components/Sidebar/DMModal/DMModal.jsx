import React, { useState, useEffect } from "react";
import Input from "../../Input";
import FormLabel from "../../FormLabel";
import Button from "../../Button";
import Select from "react-select";
import "../Modal/modal.css";

export default function DMModal({ onClose, fetchUsers, onIanSubmit }) {
  const [selectedUser, setSelectedUser] = useState(null)

  const options = fetchUsers.map((user) => {
    return {
      value: user.id,
      label: user.uid,
      };
    });
  
  function handleSubmit(e) {
    e.preventDefault()
    onIanSubmit(selectedUser)
  } 

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit}>
        <h2> Send a message </h2>
      
        <FormLabel label={"SELECT USER"} />
        <Select
          options={options}
          placeholder=""
          className="select-dropdown"
          onChange={(user)=> setSelectedUser(user)}
        />
        <div className="buttons">
          <Button
            className={"close-btn"}
            handleClick={onClose}
            text={"CLOSE"}
          />
          <Button className={"create-btn"} text={"START"} />
        </div>
      </form>
    </div>
  );
}
