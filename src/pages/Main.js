import { useEffect, useState } from "react";
import Axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
  import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import DataTable from 'react-data-table-component';
import Company from "../Company/Company"



function Main () {
    const navigate = useNavigate();
    
    const {id} = useParams();
    const [cabinNames, setnames] = useState([]); //Kabin isimlerini tutan array
    var cabinNumber = 0;

    const AuthPls = () =>{
        Axios.get(`${process.env.REACT_APP_URL}/api/isAuth`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {
          setauthenticated(response.data.auth);
        })
      }
  
      const [datas, setdata] = useState([]); //Operasyon sayılarını tutan array

  
  const [authenticated, setauthenticated] = useState(null);

  

  useEffect(() => {
    AuthPls();

  }, []);

useEffect(() => {
      Axios.post(`${process.env.REACT_APP_URL}/api/GetNumbers`,   //Kullanıcının sahip olduğu kabinlerin ID'leri
        {id: id
        }).then((response) => {
          if(!response.data.done){

          }
          else{
                    cabinNumber = response.data.result.length;
                    for (let i = 0; i < cabinNumber; i++)   //Her kabin için ayrı bir data set
                              {
                                setnames(() => [...cabinNames,response.data.result[i].Cab_name])  
                                Axios.post(`${process.env.REACT_APP_URL}/api/getCabins`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                                cabin: response.data.result[i].Cab_id
                              }).then((response2) => {
                                setdata(() => [...datas,response2.data.result] );
                                
                              })
                                }}
        })

    }, [datas]);
  

  if (!authenticated) {
      navigate("/login");
  } else {
    return (
      
      <div>
        <Navbar/>
        <p>Welcome {id}</p>  
          {datas.map((i)=>(
                      <div key={i}> <Company OneData = {datas[i]}  key={i} name = {cabinNames[i]}/></div>  //Her bir kabin datası için ayrı tablo oluşturabilmek için
                  ))}
      </div>
    );
  }
};

export default Main;