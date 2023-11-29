import React, { useState } from "react";
import { Slack } from "../../utils/axios";
import FormLabel from "../FormLabel";
import Button from "../Button";
import Select from "react-select";
import { toastSuccess } from "../../utils/toast";

export default function AddMember({ channelID, onClose, onModalSubmit }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  async function fetchUsers() {
    try {
      const res = await Slack.get("/users");
      console.log(res);
      const usersData = Object.values(res.data.data).flat();
      setUsers(usersData);
    } catch (error) {}
  }

  if (users.length === 0) {
    fetchUsers();
  }

  const options = users.map((user) => ({
    value: user.id,
    label: user.uid,
  }));

  function addUser(userOption) {
    if (userOption) {
      setSelectedUser(userOption.value);
    }
  }

  const addPayload = {
    id: channelID,
    member_id: selectedUser,
  };

  function handleSubmit(e) {
    e.preventDefault();
    onModalSubmit(addPayload)
    
  }

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit}>
        <h2> Add a member </h2>
        <FormLabel label={"SELECT USER"} />
        <Select
          options={options}
          placeholder=""
          className="select-dropdown"
          onChange={addUser}
        />
        <div className="buttons">
          <Button
            className={"close-btn"}
            handleClick={onClose}
            text={"CLOSE"}
          />
          <Button
            className={"create-btn"}
            text={"ADD"}
          />
        </div>
      </form>
    </div>
  );
}
