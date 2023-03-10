import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "../pages/Main.module.css"


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);

    useEffect(() => {
        
        Axios.post(`${process.env.REACT_APP_URL}/api/getCabins`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                                  {id: props.User,
                                    cabin: props.id
                                  }).then((response2) => {
                                    setdata(response2.data.result)
                                  })
      }, []);


    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    Operation: el.Operation,
                    Number: el.count
                }  
            })) 
            console.log(data)
        }
        
    }, [datas])
    
    const columns = [{
        name: 'İşlem',
        selector: row => row.Operation,
        compact: false,
        style: {
            
        },
    },
    {
      name: 'Kullanım Sayısı',
      selector: row => row.Number,
      sortable: true,
      style: {
        			
        		},
    },
    
    ]

    //<div className={maincss["line-1"]}></div>

    return (
        <div className={maincss.partialcontainer}>
            <p>{props.name}</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        backgroundcolor= 'rgba(187, 204, 221, 1)'
    /></div>
            </div>
        
    );
}
