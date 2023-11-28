import React from 'react';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';


export default function Logout({onClose}) {
    const navigate = useNavigate()

    const handleSubmit = () => {
            navigate("/");
            localStorage.clear();
    }

    return (
        <div className="modal-container">
          <form className="logout" onSubmit={handleSubmit}>
            <h2> Logout? </h2>
            <div className="buttons">
              <Button
                className={"close-btn"}
                handleClick={onClose}
                text={"CLOSE"}
              />
              <Button className={"create-btn"} text={"LOGOUT"} onSubmit={handleSubmit} />
            </div>
          </form>
        </div>
      );
}
