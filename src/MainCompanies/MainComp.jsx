import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "../pages/Main.module.css"
import Cabin from "../image/kabin.png";


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const role = localStorage.getItem("top");
    const starter = props.id < 10 ? "ABY0000" : props.id.length < 100 ? "ABY000" : props.id.length < 1000 ? "ABY00" : props.id.length < 10000 ? "ABY0" : "ABY";

    useEffect(() => {
        if(role === "0"){
            Axios.post(`${process.env.REACT_APP_URL}/api/getAdminCabins`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                                  {id: props.User,
                                    cabin: props.id
                                  }).then((response2) => {
                                    setdata(response2.data.result)
                                  })
        }
        else{
            Axios.post(`${process.env.REACT_APP_URL}/api/getCabins`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                                  {id: props.User,
                                    cabin: props.id
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
                    Operation: el.Operation,
                    Number: el.count
                }  
            })) 
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
      <div >
        <div className={maincss.imagediv}>
            <img src={props.type === "AbyssosV1" ? Cabin : null} className={maincss.leftbannerimage} />
          </div>
        <div className={maincss.partialcontainer}>
          <div>
            {role === "0" ? <p>{props.company} - {props.name} : Makina Kodu : {starter}{props.id}</p> : <p>{props.name}: Makina Kodu: {starter}{props.id}</p>}
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
            </div>
        
    );
}
