import React, {useEffect} from 'react'
import Input from '../../Input'
import FormLabel from '../../FormLabel'
import Button from '../../Button'
import Select from 'react-select'
import '../Modal/modal.css'

export default function Modal({ onClose }) {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://206.189.91.54/api/v1/users', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  

  const options = [
    { value: 'hehe' , label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
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