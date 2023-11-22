import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Slack } from "../../utils/axios";
import Loader from "../Loader/Loader";
import "../Home/home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Slack.get("/users");
        if (res.status === 200) {
          const users = Object.values(res.data.data).flat();
          setData(users);
          console.log('loading')
          console.log(users)
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    }

    if (!data) {
      fetchData()}}, 
      [data]);
  
      
  
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        navigate("/m");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [loading, navigate]);
  
  
  return (
    <div className="home-container">
      {loading ? <Loader /> : <Sidebar fetchUsers={data} />}

    </div>
  );
}
