import { useEffect, useState } from "react";
import Axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
  import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import DataTable from 'react-data-table-component';
import MainComp from "../MainCompanies/MainComp"
import maincss from "./Main.module.css"



function Main () {
    const navigate = useNavigate();
    
    const {id} = useParams();
    const [cabinNames, setnames] = useState(); //Kabin isimlerini tutan array
    const role = localStorage.getItem("top");


    const Cabins = () => {
      Axios.post(`${process.env.REACT_APP_URL}/api/GetNumbers`,   //Kullanıcının sahip olduğu kabinlerin ID'leri
      {id: id
      }).then((response) => {
      if(!response.data.done){
        setnames([]);
      }
      else{
      setnames(response.data.result);
  }
})
    }

    const AdminCabins = () => {
      Axios.post(`${process.env.REACT_APP_URL}/api/GetAdminNumbers`,   //Kullanıcının sahip olduğu kabinlerin ID'leri
      {id: id
      }).then((response) => {
      if(!response.data.done){
      }
      else{
      setnames(response.data.result);
  }
})
    }

    const Mail = () => {
      Axios.post(`${process.env.REACT_APP_URL}/api/mail/emergencyButton`,   //Kullanıcının sahip olduğu kabinlerin ID'leri
      {id: id,
        mail: "farukozkan56@hotmail.com"
      }).then((response) => {
      if(!response.data.done){
        console.log("atamadık")
      }
      else{
        console.log("attık")
  }
})
    }

    const AuthPls = () =>{
        Axios.get(`${process.env.REACT_APP_URL}/api/isAuth`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {
          setauthenticated(response.data.auth);
        })
      }
  
      //Operasyon sayılarını tutan array

  
  const [authenticated, setauthenticated] = useState(null);

  

 useEffect(() => {
    if(role === "0"){
      AdminCabins();
    }
    else{
      Cabins();
    }
    
  }, []);


  useEffect(() => {

  }, [cabinNames])


  if(cabinNames === undefined){
    return(
      
      <div>
        <p>Yükleniyor...</p>
      </div>
    )
  }
  else{
    //console.log(cabinNames.length)
    var elements=[];
        for(var i=0;i<cabinNames.length;i++){
             // push the component to elements!
            elements.push(<MainComp name = {cabinNames[i].Cab_name} id = {cabinNames[i].Cab_id} User = {id} company = {role === "0" ? cabinNames[i].Com_name : null}/>);
        }



// arrays for test  of table maker code
const name = ["faktor10","faktor45","nem"];
const reps = [1,2,3]




    return (
            <div>
              <Navbar/>
              <div className={maincss.container}>
              <h2>Uygulanan işlem sayıları</h2>
              {elements} 
              </div>
            </div>
          );
  }
    
  
};

export default Main;





 // table maker can create dynmaci tables needed to  styleized 
const tableMaker=(DeviceName,info,num)=> {

  const grayBack = {backgroundColor : '#9692924d'};
  const lightGrayBack = {backgroundColor : "#b4b3b31a" };

  return(
<table>
  <tr>
    <td colSpan={2} className={maincss.tableHeader}> {DeviceName} </td>
   </tr>
  <tr>
    <td>İşlem</td>
    <td>miktar</td>
  </tr>
  {     info.map((element,i) => (<tr style={ i % 2 == 0 ? grayBack : lightGrayBack}>  <td> {element}</td>  <td> {num[i]}</td> </tr>))    }

</table>

  )

}