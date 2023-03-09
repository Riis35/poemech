import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";


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
    },
    {
      name: 'Sayı',
      selector: row => row.Number,
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
