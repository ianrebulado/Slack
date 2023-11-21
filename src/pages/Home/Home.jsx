import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Slack } from '../../utils/axios'
import '../Home/home.css'

export default function Home() {
  const [usersData, setUsersData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    setLoading(true)
    try {        
      const res = await Slack.get('/users')
      if(res.status === 200){
        const users = Object.values(res.data.data).flat()
        setUsersData(users)
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
   if (!usersData){
     fetchData()
    }
  },[usersData]);

  return (
    <div className='home-container'>
      <Sidebar fetchUsers={usersData}/>
    </div>
  )
}
