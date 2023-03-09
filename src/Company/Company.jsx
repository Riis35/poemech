import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    var data = [];

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
            data = datas.map(el => {  //alınan verileri mapleme
                return {
                    Operation: el.Operation,
                    Number: el.count
                }  
            })
            
        }
        
    }, [datas])
    
    const columns = [{
        name: 'İşlem',
        selector: row => row.title,
    },
    {
      name: 'Sayı',
      selector: row => row.year,
      sortable: true,
    },
    
    ]

    

    return (
        <div>
            <p>{props.name}</p>
            <DataTable
        columns={columns}
        data={data}
    /></div>
        
    );
}
