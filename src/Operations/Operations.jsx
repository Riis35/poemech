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
import {ComboBox, Item, Section, Provider,defaultTheme, lightTheme, DatePicker, Flex, Calendar } from '@adobe/react-spectrum'
import * as FaIcons from "react-icons/fa";
import {parseDate} from '@internationalized/date';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const sec = [
  { id: 1, name: 'Şirket Adı' },
  { id: 2, name: 'Makine Kodu' },
  { id: 3, name: 'Kart' },
  { id: 4, name: 'Operasyon' },
]

export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const {id} = useParams();
    const role = localStorage.getItem("top")
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [selectedId, setselectedId] = React.useState(1);
    var dummyDate = new Date();
    var today = new Date();
    dummyDate.setDate(today.getDate() - 8);
    var noTime = dummyDate.toJSON().slice(0,10).replace(/-/g,'-').toString();
    dummyDate.setDate(today.getDate() + 1);
    var noTimeEnd = dummyDate.toJSON().slice(0,10).replace(/-/g,'-').toString();
    const [dateStart, setDateStart] = React.useState(parseDate(noTime));
    const [dateEnd, setDateEnd] = React.useState(parseDate(noTimeEnd));

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
                    Şirket: starter + el.Cab_id,
                    Kabin: el.Com_name,
                    Tarih: el.Date,
                    Kart: el.Card_id,
                    Operasyon: el.Operation,
                    Fiyat: el.Price,
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


    const columns = [
    {
      name: 'Şirket Adı',
      selector: row => row.Kabin,
      sortable: true,
      style: {
        			
        		},
    },
    {
      name: 'Makine Kodu',
      selector: row => row.Şirket,
      left: true,
      sortable: true,
      style: {
          
      },
  },
    {
        name: 'Tarih',
        selector: row => row.Tarih,
        sortable: true,
        sortFunction: Zort,
        style: {
                      
                  },
      },
      {
        name: 'Kart',
        selector: row => row.Kart,
        sortable: true,
        style: {
                      
                  },
      },
      {
        name: 'Operasyon',
        selector: row => row.Operasyon,
        sortable: true,
        style: {
                      
                  },
      },
      {
        name: 'Fiyat',
        selector: row => row.Fiyat,
        style: {
                      
                  },
      }
    
    ]






  const filteredItems = data.filter(
    selectedId === 1 ? item => item.Kabin && item.Kabin.toLowerCase().includes(filterText.toLowerCase()) && item.Tarih >= dateStart && item.Tarih < dateEnd: selectedId === 2 ?
    item => item.Şirket && item.Şirket.toLowerCase().includes(filterText.toLowerCase()) && item.Tarih >= dateStart && item.Tarih < dateEnd : selectedId === 3 ? 
    item => item.Kart && item.Kart.toLowerCase().includes(filterText.toLowerCase()) && item.Tarih >= dateStart && item.Tarih < dateEnd: 
    item => item.Operasyon && item.Operasyon.toLowerCase().includes(filterText.toLowerCase()) && item.Tarih >= dateStart && item.Tarih < dateEnd
  );
      



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

    let options = [
      {id: 1, name: 'Şirket Adı'},
      {id: 2, name: 'Makine Numarası'},
      {id: 3, name: 'Kart'},
      {id: 4, name: 'Operasyon'}
    ];
    
    function downloadCSV(array) {
      const link = document.createElement('a');
      var BOM = "\uFEFF";
      let csv = BOM + convertArrayOfObjectsToCSV(array);
      if (csv == null) return;
    
      const filename = 'export.csv';
    
      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }
      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', filename);
      link.click();
    }

    const ExportExcel = async (excelData, fileName) =>{
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      let number = 2;
      var total = 0;
      const ws = XLSX.utils.json_to_sheet(excelData);
      let dummy = ws[`F${number}`];
      while (dummy != undefined) {
        total = total + dummy['v'];
        number = number + 1;
        dummy = ws[`F${number}`];
      }
      ws["H1"] = { t: "s", v: "Toplam"};
      ws["H2"] = { t: "n", v: `${total}`};
      ws['!ref'] = `A1:H${number-1}`
      console.log(ws);
      const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
      const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
    }

    const Export = ({ onExport }) => <button className={maincss.newButton} onClick={e => onExport(e.target.value)}>Excel</button>;

    return (
        <div className= {maincss.container}>
          <div className={maincss.charts}>
            <div className={maincss.leftpart}>
              <div className={maincss.topleft}>
              <h2 className={maincss.charttext}><FaIcons.FaChartLine className={maincss.icons}></FaIcons.FaChartLine> Günlük Kullanım</h2>
              </div>
              <div className={maincss.leftchart}>
                <Chart id = {id}></Chart> 
              </div>
              
            </div>
            <div className={maincss.rightpart}>
            <div className={maincss.topleft}>
              <h2 className={maincss.charttext}><FaIcons.FaChartPie className={maincss.icons}></FaIcons.FaChartPie> Genel Kullanım</h2>
              </div>
              <div className={maincss.rightchart}>
              <Donut id = {id}></Donut> 
            </div>
            </div>
            </div>
            
            <div className={maincss.filter}>
              <div className={maincss.exportButton}>
            <Export onExport={() => ExportExcel(filteredItems, "Export")}  />  
            </div>
            <div className={maincss.combo}>
              <div className={maincss.dates}>
              <Provider theme={lightTheme}>
              <Flex gap="size-150">
              <DatePicker
                  label="Başlangıç"
                  value={dateStart}
                  onChange={setDateStart}/>
                <DatePicker
                  label="Bitiş"
                  value={dateEnd}
                  onChange={setDateEnd} />
              </Flex>
              </Provider>
              </div>
            <Provider width="size-100" theme={lightTheme} >
              <ComboBox 
                label="Arama kriteri seçin"
                defaultItems={options}
                onSelectionChange={setselectedId}
                defaultInputValue={"Şirket Adı"}
                >
                {item => <Item>{item.name}</Item>}
              </ComboBox>
              </Provider >
              </div>
              <input className={maincss.pdiv} type="text" id="search" placeholder='Arayın' onChange={(e) => setFilterText(e.target.value)}/>
            </div>
            <div className={maincss.partialcontainer}>
            <p >İşlemler</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={filteredItems}
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


