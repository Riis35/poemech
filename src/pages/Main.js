import { useEffect, useState } from "react";
import Axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
  import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";



function Main () {
    const navigate = useNavigate();
    
    const {id} = useParams();
    const AuthPls = () =>{
        Axios.get(`${process.env.REACT_APP_URL}/api/isAuth`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {
          setauthenticated(response.data.auth);
        })
      }
  
  
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    AuthPls();
    
  }, []);

  if (!authenticated) {
      navigate("/login");
  } else {
    return (
      
      <div>
        <Navbar/>
        <p>Welcome {id}</p>
      </div>
    );
  }
};

export default Main;