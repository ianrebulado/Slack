import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Slack } from '../../utils/axios'
import '../Home/home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  // if(!loading) {
  //   console.log('Loading...')
  // }

  async function fetchData() {
    setLoading(true)
    console.log('Loading...')
    try {        
      const res = await Slack.get('/users')
      if(res.status === 200){
        const users = Object.values(res.data.data).flat()
        console.log('users data', users)
        setData(users)
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
      console.log('Loading done')
    }
  };


  useEffect(() => {
   if (!data){
     fetchData()
    }
  },[data]);


  return (
    <div className='home-container'>
      <Sidebar fetchUsers={data}/>
      
    </div>
  )
}
