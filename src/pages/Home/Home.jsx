import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatWindow from "../../components/Chat/ChatWindow";
import { Slack } from "../../utils/axios";
import Loader from "../Loader/Loader";
import "../Home/home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Slack.get("/users");
        if (res.status === 200) {
          const users = Object.values(res.data.data).flat();
          if (users.length !== data.length) {
            setData(users);
        }
      }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
      fetchData()
    },[data]);

      console.log(data)


      const recent = data.slice(-500)
      const revRecent = recent.reverse()

      console.log(revRecent)
  
      
  
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        navigate("/m");
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [loading, navigate]);
  
  
  return (
    <div className="home-container">
      {loading ? <Loader /> : <Sidebar fetchUsers={data}  />}
      
    </div>
  );
}
