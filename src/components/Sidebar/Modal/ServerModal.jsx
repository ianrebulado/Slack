import React, {useState, useEffect} from 'react'
import Input from '../../Input'
import FormLabel from '../../FormLabel'
import Button from '../../Button'
import Select from 'react-select'
import { Slack } from '../../../utils/axios'
import '../Modal/modal.css'

export default function Modal({ onClose, fetchUsers }) {

  const options = fetchUsers
  
    return (
      <div className="modal-container">
        <div className="modal">
          <h1> Add a server </h1>
          <FormLabel label={'SERVER NAME'} />
          <Input className={'server-input'}/>
          <FormLabel label={'SELECT USERS'} />
          <Select options={options} placeholder='' />
          <div className='buttons'>
          <Button className={'close-btn'} handleClick={onClose} text={'CLOSE'} />
          <Button className={'create-btn'} text={'CREATE'} />
          </div>
        </div>
      </div>
    );
  }