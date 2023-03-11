import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Company.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';


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
    useEffect(() => {
        if(id === "9"){
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
        
      }, []);


    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    Name: el.Com_name,
                    Address: el.Com_address,
                    Phone: el.Com_phone,
                    Mail: el.Com_mail,
                }  
            })) 
        }
        
    }, [datas])

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
    
    const columns = [{
        name: 'Şirket Adı',
        selector: row => row.Name,
        compact: false,
        style: {
            
        },
    },
    {
      name: 'Adres',
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
        selector: row => row.Mail,
        style: {
                      
                  },
      },
      {

      }
    
    ]

    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
            <div className={maincss.partialcontainer}>
            <p >Şİrket Bİlgİlerİ</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        backgroundcolor= 'rgba(187, 204, 221, 1)'
    /></div>
            </div>
            {id === "9" ? <div className={maincss.newCompany}>
                <p className={maincss.newP}>Yenİ Şİrket Formu</p>
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
