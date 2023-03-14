import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Operations.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import Donut from "./DonutChart.tsx"
import Chart from './DateChart.tsx';


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        getData();
        
      }, []);


    const Zort = (rowA, rowB) => {
        const a = rowA.Date;
        const b = rowB.Date;

        if (a > b) {
            return -1;
        }
    
        if (b > a) {
            return 1;
        }
    
        return 0;
    };

    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    Com_name: el.Com_name,
                    Cab_name: el.Cab_name,
                    Date: el.Date,
                    Card_id: el.Card_id,
                    Operation: el.Operation,
                }  
            })) 
        }
        
    }, [datas])

    const getData = () =>{
      if(id === "9"){
        Axios.post(`${process.env.REACT_APP_URL}/api/getAdminOperations`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    else{
        Axios.post(`${process.env.REACT_APP_URL}/api/getOperations`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    }


    const columns = [{
        name: 'Şirket Adı',
        selector: row => row.Com_name,
        sortable: true,
        style: {
            
        },
    },
    {
      name: 'Kabin Adı',
      selector: row => row.Cab_name,
      sortable: true,
      style: {
        			
        		},
    },
    {
        name: 'Tarih',
        selector: row => row.Date,
        sortable: true,
        sortFunction: Zort,
        style: {
                      
                  },
      },
      {
        name: 'Kart',
        selector: row => row.Card_id,
        sortable: true,
        style: {
                      
                  },
      },
      {
        name: 'Operasyon',
        selector: row => row.Operation,
        sortable: true,
        style: {
                      
                  },
      }
    
    ]

    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
            <div className={maincss.donut}>
           {id === "9" ? null : <Donut id = {id}></Donut> }
            </div>
            <div>
            {id === "9" ? null : <Chart id = {id}></Chart> }
            </div>
            
            <div className={maincss.partialcontainer}>
            <p >İşlemler</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        defaultSortFieldId={3}
    />
    
    </div>
            </div>
        </div>
        
        
    );
}
