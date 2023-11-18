import React from 'react'
import Input from '../../Input'
import FormLabel from '../../FormLabel'
import Button from '../../Button'
import '../Modal/modal.css'

export default function Modal({ onClose }) {
    return (
      <div className="modal-container">
        <div className="modal">
          <h1> Add a server </h1>
          <FormLabel label={'SERVER NAME'} />
          <Input className={'server-input'}/>
          <FormLabel label={'SELECT USERS'} />
          
          <Button className={'create-btn'} text={'CREATE'} />
          <Button className={'close-btn'} handleClick={onClose} text={'CLOSE'} />
        </div>
      </div>
    );
  }