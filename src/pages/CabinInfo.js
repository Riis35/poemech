import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
  import { useNavigate } from "react-router-dom";



function CabinInfo () {
    const navigate = useNavigate();
    
    const {id} = useParams();
    const data = () =>{


        axios.post(`${process.env.REACT_APP_URL}/api/CabinInfo`,
        {id: id,
        }).then((response) => {
          console.log(response);

        })
      };

  const logout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
  data();

  }, []);

    return (
      <div>
        <p>Welcome {id}</p>
        <button onClick={logout}>Çıkış</button>
      </div>
    );
  
};

export default CabinInfo;