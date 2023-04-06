import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Company.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import Cabin from '../Cabin/Cabin'
import { Row } from '@adobe/react-spectrum';


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const [newCompanyName, setnewCompanyName] = useState();
    const [newCompanyAddress, setnewCompanyAddress] = useState();
    const [newCompanyPhone, setnewCompanyPhone] = useState();
    const [newCompanyUser, setnewCompanyUser] = useState();
    const [newCompanyMail, setnewCompanyMail] = useState();
    const [status, setstatus] = useState();
    const {id} = useParams();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const role = localStorage.getItem("top")

    useEffect(() => {
        getData();
        
      }, []);


    const handleRowSelected = React.useCallback(state => {
        		setSelectedRows(state.selectedRows);
        	}, []);

    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    User_name: el.U_name,
                    Com_name: el.Com_name,
                    Address: el.Com_address,
                    Phone: el.Com_phone,
                    Mail: el.Com_mail,
                }  
            })) 
        }
        
    }, [datas])

    const getData = () =>{
      if(role === "0"){
        Axios.post(`${process.env.REACT_APP_URL}/api/CompanyAdminInfo`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    else{
        Axios.post(`${process.env.REACT_APP_URL}/api/CompanyInfo`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    }

    const deleteCompany = () =>{

      const name = selectedRows[0].Com_name;

      Axios.post(`${process.env.REACT_APP_URL}/api/DeleteCompany`,   //Şirketi sil
                              {name: name,
                              }).then((response2) => {
                                if(response2.data.done){
                                  setdata(differenceBy(datas, selectedRows, 'Com_name'));
                                }
                                else{
                                  console.log("olduramadık")
                                }
                              })
      
    }

    const register = () => {

            const user = newCompanyName;
            const address = newCompanyAddress;
            const phone = newCompanyPhone;
            const mail = newCompanyMail;

            const username = newCompanyUser;
    
    
            axios.post(`${process.env.REACT_APP_URL}/api/GetId`,
            {username: username,}).then((response) => {
              if(response.data.done){
                axios.post(`${process.env.REACT_APP_URL}/api/RegisterUser`,
                {name: user,
                address:address,
                phone:phone,
                id:response.data.result[0].U_id, 
                mail:mail}).then((response) => {
                if(response.data.done){
                setstatus("Başarılı")
                getData();
              }
              else{
                setstatus("Kaydedilemedi.");
              }
              
            })
              }
              else{
                setstatus("Böyle bir kullanıcı yok.");
              }
              
            })
            .catch(function (error) {
              
            });
    }

    const deneme = row => 
         <Cabin cab={row}/>;
    
    
    const columns = [
    role === "0" ?
      {
        name: 'Kullanıcı Adı',
        allowOverflow: true,
        selector: row => row.User_name,
        compact: false,
        style: {
            
        },
    } : {width:"0px"},
      {
        name: 'Şirket Adı',
        allowOverflow: true,
        selector: row => row.Com_name,
        compact: false,
        style: {
            
        },
    },
    {
      name: 'Adres',
      allowOverflow: true,
      selector: row => row.Address,
      style: {
        			
        		},
    },
    {
        name: 'Telefon',
        selector: row => row.Phone,
        style: {
                      
                  },
      },
      {
        name: 'Mail Adresi',
        allowOverflow: true,
        selector: row => row.Mail,
        style: {
                      
                  },
        
      },
      {

      }
    
    ]

    createTheme(
      'solarized',
      {
        striped: {
          default: 'rgba(165,228,227,1)',
          text: 'rgba(52,73,102,1)',
        },
        background: {
                default:'rgba(87,197,182,1)',
              },
        text: {
                primary: 'rgba(52,73,102,1)',
              },
              highlightOnHover: {
                default: '#ffffff',
                text: 'rgba(0, 0, 0, 1)',
              },
      },
    );

    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
            <div className={maincss.partialcontainer}>
            <p >Şirket Bilgileri</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        selectableRows = {role === "0"}
        selectableRowsHighlight = {role === "0"}
        onSelectedRowsChange={handleRowSelected}
        selectableRowsSingle = {true}
        expandableRows
        expandOnRowClicked= {true}
        expandableRowsComponent={deneme}
    />
    {role === "0" ? <button className={maincss.newButton} onClick={deleteCompany}>Sil</button> : null}
    
    </div>
            </div>
            {role === "0" ? <div className={maincss.newCompany}>
                <p className={maincss.newP}>Yeni Şirket Formu</p>
                <div className={maincss.grid}>
                <label for="name">Şirket Adı: </label>
                <input type="text" id="name" onChange={(e) => setnewCompanyName(e.target.value)}/>
                <label for="address">Adres: </label>
                <input type="text" id="address" onChange={(e) => setnewCompanyAddress(e.target.value)}/>
                <label for="phone">Telefon: </label>
                <input type="phone" id="phone" onChange={(e) => setnewCompanyPhone(e.target.value)}/>
                <label for="username">Kullanıcı Adı: </label>
                <input type="text" id="username" onChange={(e) => setnewCompanyUser(e.target.value)}/>
                <label for="mail">Mail: </label>
                <input type="email" id="mail" onChange={(e) => setnewCompanyMail(e.target.value)}/>
                <p>{status}</p>
                <button className={maincss.newButton} onClick={register}>Kaydet</button>
                </div>
            </div> : null}
        </div>
        
        
    );
}
