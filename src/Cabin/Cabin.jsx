import React from 'react'
import DataTable,{ createTheme } from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Cabin.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';


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
    const [selectedRows, setSelectedRows] = React.useState([]);
    const role = localStorage.getItem("top");

    useEffect(() => {
        getCabins();
        
      }, []);


    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                const starter =  el.Cab_id < 10 ? "ABY0000" : el.Cab_id < 100 ? "ABY000" : el.Cab_id < 1000 ? "ABY00" : el.Cab_id < 10000 ? "ABY0" : "ABY";
                return {
                    Name: starter + el.Cab_id,
                    Cab_name: el.Cab_name,
                    Address: el.Cab_address,
                    Phone: el.Com_phone,
                }  
            })) 
        }
        
    }, [datas])

    const handleRowSelected = React.useCallback(state => {
      setSelectedRows(state.selectedRows);
    }, []);

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

    const deleteCabin = () =>{

      const name = selectedRows[0].Cab_name;

      Axios.post(`${process.env.REACT_APP_URL}/api/DeleteCabin`,   //Şirketi sil
                              {name: name,
                              }).then((response2) => {
                                if(response2.data.done){
                                  setdata(differenceBy(datas, selectedRows, 'Cab_name'));
                                }
                                else{
                                  console.log("olduramadık")
                                }
                              })
      
    }
    
    const columns = [{
        name: 'Kabin No',
        selector: row => row.Name,
        compact: false,
        allowOverflow: true,
        sortable: true,
        style: {
            
        },
    },
    {
      name: 'Kabin Adı',
      selector: row => row.Cab_name,
      allowOverflow: true,
      style: {
        			
        		},
    },
    {
        name: 'Kabin Adresi',
        selector: row => row.Address,
        allowOverflow: true,
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


    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
            <div className={maincss.partialcontainer}>
            <p >Kabin Bilgileri</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        backgroundcolor= 'rgba(187, 204, 221, 1)'
        selectableRows = {role === "0"}
        selectableRowsHighlight = {role === "0"}
        onSelectedRowsChange={handleRowSelected}
        selectableRowsSingle = {true}
        theme="solarized"
    />
     {role === "0" ? <button className={maincss.newButton} onClick={deleteCabin}>Sil</button> : null}
    </div>
            </div>
            {role === "0" ? <div className={maincss.newCompany}>
                <p className={maincss.newP}>Yeni Kabin Formu</p>
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
