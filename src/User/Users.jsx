import React from 'react'
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Users.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';



export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const [newName, setnewName] = useState();
    const [newMail, setnewMail] = useState();
    const [newPass, setnewPass] = useState();
    const [selectedRows, setSelectedRows] = useState([]);
    const [status, setstatus] = useState();
    const {id} = useParams();
    useEffect(() => {
        getData();
        
      }, []);

      
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    useEffect(() => {
        if(datas === undefined){
        }
        else{
            setRows(datas.map(el => {  //alınan verileri mapleme
                return {
                    Username: el.U_name,
                    Mail: el.U_mail,
                }  
            })) 
        }
        
    }, [datas])

    const register = () =>{
        const user = newName;
        const pass = newPass;
        const mail = newMail;

        axios.post(`${process.env.REACT_APP_URL}/api/register`,
        {username: user,
        password: pass,
        mail: mail}).then((response) => {
          if(response.data.done){
            setstatus("Başarılı")
            getData();
          }
          else{
            setstatus("Başarısız oldu");
          }
          
        })
        .catch(function (error) {
            setstatus("Başarısız oldu");
        });
      };

    const getData = () =>{
      if(id === "9"){
        Axios.post(`${process.env.REACT_APP_URL}/api/getAdminUsers`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    else{
        Axios.post(`${process.env.REACT_APP_URL}/api/getUsers`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    }

    const deleteUser = () =>{

        const name = selectedRows[0].Username;
  
        Axios.post(`${process.env.REACT_APP_URL}/api/deleteUser`,   //Şirketi sil
                                {username: name,
                                }).then((response2) => {
                                  if(response2.data.done){
                                    setdata(differenceBy(datas, selectedRows, 'Username'));
                                    getData();
                                  }
                                  else{
                                    setstatus("Başarısız")
                                  }
                                })
        
      }

    const columns = [{
        name: 'Kullanıcı Adı',
        selector: row => row.Username,
        sortable: true,
        style: {
            
        },
    },
    {
      name: 'Kullanıcı Maili',
      selector: row => row.Mail,
      sortable: true,
      style: {
        			
        		},
    },
    
    ]

    //<div className={maincss["line-1"]}></div>

    return (
        <div className= {maincss.container}>
         <div className={maincss.partialcontainer}>
            <p >Kullanıcılar</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        defaultSortFieldId={1}
        selectableRows = {id === "9"}
        selectableRowsHighlight = {id === "9"}
        onSelectedRowsChange={handleRowSelected}
        selectableRowsSingle = {true}
    />
    <button className={maincss.newButton} onClick={deleteUser}>Sil</button>
    </div>
    </div>
    <div className={maincss.newCompany}>
                <p className={maincss.newP}>Kullanıcı Bilgileri</p>
                <div className={maincss.grid}>
                <label for="name">Kullanıcı Adı: </label>
                <input type="text" id="name" onChange={(e) => setnewName(e.target.value)}/>
                <label for="pass">Şifre: </label>
                <input type="password" id="pass" onChange={(e) => setnewPass(e.target.value)}/>
                <label for="mail">Mail Adresi: </label>
                <input type="email" id="mail" onChange={(e) => setnewMail(e.target.value)}/>
                <p>{status}</p>
                <button className={maincss.newButton} onClick={register}>Kaydet</button>
                </div>
            </div>
            
            
        </div>
        
        
    );
}
