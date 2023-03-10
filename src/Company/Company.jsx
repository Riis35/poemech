import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Company.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        
        Axios.post(`${process.env.REACT_APP_URL}/api/CompanyInfo`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                                  {id: id,
                                  }).then((response2) => {
                                    setdata(response2.data.result)
                                  })
      }, []);


    useEffect(() => {
        if(datas === undefined){
            console.log("hop undefined")
        }
        else{
            console.log("hop defined")
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    Name: el.Com_name,
                    Address: el.Com_address,
                    Phone: el.Com_phone,
                    Mail: el.Com_mail,
                }  
            })) 
            console.log(datas)
        }
        
    }, [datas])
    
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
    
    ]

    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
            <div className={maincss.partialcontainer}>
            <p>Şirketler</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        backgroundcolor= 'rgba(187, 204, 221, 1)'
    /></div>
            </div>
        </div>
        
        
    );
}
