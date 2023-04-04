import React from 'react'
import DataTable, {createTheme} from 'react-data-table-component';
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
    const role = localStorage.getItem("top")

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
                const starter =  el.Cab_id < 10 ? "ABY0000" : el.Cab_id < 100 ? "ABY000" : el.Cab_id < 1000 ? "ABY00" : el.Cab_id < 10000 ? "ABY0" : "ABY";
                return {
                    Com_name: starter + el.Cab_id,
                    Cab_name: el.Cab_name,
                    Date: el.Date,
                    Card_id: el.Card_id,
                    Operation: el.Operation,
                }  
            })) 
        }
        
    }, [datas])

    const getData = () =>{
      if(role === "0"){
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
        name: 'Kabin Numarası',
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
    
      const paginationComponentOptions = {
        rowsPerPageText: 'Sayfa Başı Satır Sayısı',
        rangeSeparatorText: 'total',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Hepsi',
    };

    //<div className={maincss["line-1"]}></div>

    function convertArrayOfObjectsToCSV(array) {
      let result;
    
      const columnDelimiter = ',';
      const lineDelimiter = '\n';
      const keys = Object.keys(data[0]);
    
      result = '';
     result += keys.join(columnDelimiter);
      result += lineDelimiter;
    
      array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
          if (ctr > 0) result += columnDelimiter;
    
          result += item[key];
          
          ctr++;
        });
        result += lineDelimiter;
      });
    
      return result;
    }
    
    function downloadCSV(array) {
      const link = document.createElement('a');
      let csv = convertArrayOfObjectsToCSV(array);
      if (csv == null) return;
    
      const filename = 'export.csv';
    
      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }
    
      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', filename);
      link.click();
    }

    const Export = ({ onExport }) => <button className={maincss.newButton} onClick={e => onExport(e.target.value)}>Excel</button>;

    return (
        <div className= {maincss.container}>
            <div className={maincss.donut}>
           {role === "0" ? null : <Donut id = {id}></Donut> }
            </div>
            <div>
            {role === "0" ? null : <Chart id = {id}></Chart> }
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
        pagination
        paginationComponentOptions={paginationComponentOptions}
    />
    
    </div>
            </div>
        </div>
        
        
    );
}
