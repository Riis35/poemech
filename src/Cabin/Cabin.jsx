import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Cabin.module.css"
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
        getCabins();
        
      }, []);


    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    Name: el.Com_name,
                    Cab_name: el.Cab_name,
                    Address: el.Cab_address,
                    Phone: el.Com_phone,
                }  
            })) 
        }
        
    }, [datas])

    const register = () => {

            const Cabname = newCompanyAddress;
            const address = newCompanyPhone;

            const username = newCompanyName;
    
    
            axios.post(`${process.env.REACT_APP_URL}/api/GetCompanyId`,
            {username: username,}).then((response) => {
              if(response.data.done){
                axios.post(`${process.env.REACT_APP_URL}/api/RegisterCabin`,
                {
                name:Cabname,
                address:address,
                id:response.data.result[0].Com_id, 
                }).then((response) => {
                if(response.data.done){
                setstatus("Başarılı")
                getCabins();
              }
              else{
                setstatus("Kaydedilemedi.");
              }
              
            })
              }
              else{
                setstatus("Böyle bir şirket yok.");
              }
              
            })
            .catch(function (error) {
              
            });
    }

    const getCabins = () => {
        if(id === "9"){
            Axios.post(`${process.env.REACT_APP_URL}/api/getAdminCabinDefault`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                                  {id: id,
                                  }).then((response2) => {
                                    setdata(response2.data.result)
                                  })
        }
        else{
            Axios.post(`${process.env.REACT_APP_URL}/api/getCabinDefault`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                                  {id: id,
                                  }).then((response2) => {
                                    setdata(response2.data.result)
                                  })
        }
    }
    
    const columns = [{
        name: 'Şirket Adı',
        selector: row => row.Name,
        compact: false,
        sortable: true,
        style: {
            
        },
    },
    {
      name: 'Kabin Adı',
      selector: row => row.Cab_name,
      style: {
        			
        		},
    },
    {
        name: 'Kabin Adresi',
        selector: row => row.Address,
        style: {
                      
                  },
      },
      {
        name: 'Şirket Telefonu',
        selector: row => row.Phone,
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
                <p className={maincss.newP}>Yenİ Kabİn Formu</p>
                <div className={maincss.grid}>
                <label for="name">Şirket Adı: </label>
                <input type="text" id="name" onChange={(e) => setnewCompanyName(e.target.value)}/>
                <label for="Cabname">Kabin Adı: </label>
                <input type="text" id="Cabname" onChange={(e) => setnewCompanyAddress(e.target.value)}/>
                <label for="Address">Kabin Adresi: </label>
                <input type="text" id="Address" onChange={(e) => setnewCompanyPhone(e.target.value)}/>
                <p>{status}</p>
                <button className={maincss.newButton} onClick={register}>Kaydet</button>
                </div>
            </div> : null}
        </div>
        
        
    );
}
