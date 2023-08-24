import React from 'react'
import DataTable,{ createTheme } from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Cabin.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function Cabin(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const [newCompanyName, setnewCompanyName] = useState();
    const [newCompanyAddress, setnewCompanyAddress] = useState();
    const [newCompanyPhone, setnewCompanyPhone] = useState();
    const [newCompanyUser, setnewCompanyUser] = useState();
    const [newCompanyMail, setnewCompanyMail] = useState();
    const [status, setstatus] = useState();
    const {id} = useParams();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const role = localStorage.getItem("top");

    useEffect(() => {
        getCabins();
        
      }, []);


    useEffect(() => {
        if(datas === undefined){
        }
        else{
          const filter = datas.filter(item => item.Com_name && item.Com_name.toLowerCase().includes(props.cab.data.Com_name.toLowerCase()))
            setRows(filter.map(el => {  //alınan verileri mapleme
                const starter =  el.Cab_id < 10 ? "ABY0000" : el.Cab_id < 100 ? "ABY000" : el.Cab_id < 1000 ? "ABY00" : el.Cab_id < 10000 ? "ABY0" : "ABY";
                return {
                    Name: starter + el.Cab_id,
                    Cab_name: el.Cab_name,
                    Address: el.Cab_address,
                    Phone: el.Com_phone,
                    F30: el.f30,
                    F50: el.f50,
                    F50cocuk: el.f50cocuk,
                    Dus: el.dus,
                    nemlendirici: el.nemlendirici,
                    dezenfektan: el.dezenfektan,
                }  
            })) 
        }
        
    }, [datas])

    const handleRowSelected = React.useCallback(state => {
      setSelectedRows(state.selectedRows);
    }, []);

    

    const getCabins = () => {
        if(role === "0"){
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

    const deleteCabin = row =>{

      const name = row.Cab_name;

      Axios.post(`${process.env.REACT_APP_URL}/api/DeleteCabin`,   //Şirketi sil
                              {name: name,
                              }).then((response2) => {
                                if(response2.data.done){
                                  setdata(differenceBy(datas, selectedRows, 'Cab_name'));
                                  getCabins();
                                }
                                else{
                                  console.log("olduramadık")
                                }
                              })
      
    }

    const updateCab = row =>{

      const oldname = row.Cab_name;
      const name = document.getElementById("Upname").value;
      const address = document.getElementById("Upaddress").value;
      const f30 = document.getElementById("Upf30").value;
      const f50 = document.getElementById("Upf50").value;
      const f50cocuk = document.getElementById("Upf50cocuk").value;
      const dus = document.getElementById("dus").value;
      const nemlendirici = document.getElementById("nemlendirici").value;
      const dezenfektan = document.getElementById("dezenfektan").value;


      Axios.post(`${process.env.REACT_APP_URL}/api/UpdateCab`,  //Şirket update
                              { oldname: oldname,
                                name: name,
                                address: address,
                                f30: f30,
                                f50: f50,
                                f50cocuk: f50cocuk,
                                dus: dus,
                                nemlendirici: nemlendirici,
                                dezenfektan: dezenfektan,
                              }).then((response2) => {
                                if(response2.data.done){
                                  getCabins();
                                }
                                else{
                                  console.log("olduramadık")
                                }
                              })
      
    }
    
    const columns = [{
        name: 'Kod',
        selector: row => row.Name,
        compact: false,
        allowOverflow: true,
        sortable: true,
        style: {
            
        },
    },
    {
      name: 'Ad',
      selector: row => row.Cab_name,
      allowOverflow: true,
      style: {
        			
        		},
    },
    {
        name: 'Adres',
        selector: row => row.Address,
        allowOverflow: true,
        style: {
                      
                  },
      },
      {
        name: 'F30',
        selector: row => row.F30,
        allowOverflow: true,
        style: {
                
              },
      },
      {
        name: 'F50',
        selector: row => row.F50,
        allowOverflow: true,
        style: {
                
              },
      },
      {
        name: 'F50 Çocuk',
        selector: row => row.F50cocuk,
        allowOverflow: true,
        style: {
                
              },
      },
      {
        name: 'Duş',
        selector: row => row.Dus,
        allowOverflow: true,
        style: {
                
              },
      },
      {
        name: 'Nemlendirici',
        selector: row => row.nemlendirici,
        allowOverflow: true,
        style: {
                
              },
      },
      {
        name: 'Dezenfektan',
        selector: row => row.dezenfektan,
        allowOverflow: true,
        style: {
                
              },
      },
      role === "0" ? {
        name: '',
        allowOverflow: true,
        button: true,
        maxwidth: "1px",
        cell: (props) => <Popup contentStyle={{width: "40%", height: "45%"}} trigger=
        {<button className={maincss.newButton}>Güncelle</button>}
        modal nested>
        {
            close => (
                <div className={maincss.modal}>
                    <div className={maincss.grid}>
                <label for="Upname">Makine Adı: </label>
                <input type="text" id="Upname" defaultValue={props.Cab_name}/>
                <label for="Upaddress">Adres: </label>
                <input type="text" id="Upaddress" defaultValue={props.Address}/>
                <label for="Upf30">F30 Fiyatı: </label>
                <input type="text" id="Upf30" defaultValue={props.F30}/>
                <label for="Upf50">F50 Fiyatı: </label>
                <input type="text" id="Upf50" defaultValue={props.F50}/>
                <label for="Upf50cocuk">F50 Çocuk Fiyatı: </label>
                <input type="text" id="Upf50cocuk" defaultValue={props.F50cocuk}/>
                <label for="dus">Duş Fiyatı: </label>
                <input type="text" id="dus" defaultValue={props.Dus}/>
                <label for="nemlendirici">Nemlendirici Fiyatı: </label>
                <input type="text" id="nemlendirici" defaultValue={props.nemlendirici}/>
                <label for="dezenfektan">Dezenfektan Fiyatı: </label>
                <input type="text" id="dezenfektan" defaultValue={props.dezenfektan}/>
                <p className={maincss.newP}>{status}</p>
                <div className={maincss.buttondiv}>
                        <button className={maincss.PopButtonDel} onClick={() => {updateCab(props); close();}}>
                                Güncelle
                        </button>
                        <button className={maincss.newButton} onClick=
                            {() => close()}>
                                İptal
                        </button>
                    </div>
                </div>
                </div>
            )
        }
    </Popup>,
        
      } : {maxwidth :'0px'},
      role === "0" ?{
        name: '',
        allowOverflow: true,
        button: true,
        right: true,
        maxwidth: "1px",
        cell: (props) => <Popup contentStyle={{width: "20%"}} trigger=
        {<button className={maincss.newButtonDel}>Sil</button>}
        modal nested>
        {
            close => (
                <div className={maincss.modal}>
                    <div className={maincss.content}>
                        Kabin "{props.Cab_name}" silinecek, emin misiniz?
                    </div>
                    <div className={maincss.buttondiv}>
                        <button className={maincss.PopButtonDel} onClick={() => deleteCabin(props)}>
                                Sil
                        </button>
                        <button className={maincss.newButton} onClick=
                            {() => close()}>
                                İptal
                        </button>
                    </div>
                </div>
            )
        }
    </Popup>,
        
        
      }: {maxwidth:'0px'},
    
    ]

    createTheme(
      'solarized',
      {
        striped: {
          default: 'rgba(239, 241, 243,1)',
          text: 'rgba(52,73,102,1)',
        },
        background: {
                default:'rgba(252, 245, 222,1)',
              },
        text: {
                primary: 'rgba(0,0,0,0.9)',
              },
              highlightOnHover: {
                default: '#ffffff',
                text: 'rgba(0, 0, 0, 1)',
              },
      },
    );


    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
<DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        backgroundcolor= 'rgba(187, 204, 221, 1)'
        onSelectedRowsChange={handleRowSelected}
        selectableRowsSingle = {true}
        noDataComponent="Şirkete ait kabin bulunmuyor"
        theme='solarized'
    />

        </div>
        
        
    );
}
