import React from 'react'
import DataTable, {createTheme} from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Users.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const [newName, setnewName] = useState();
    const [newMail, setnewMail] = useState();
    const [newPass, setnewPass] = useState();
    const [newRole, setnewRole] = useState();
    const [selectedRows, setSelectedRows] = useState([]);
    const [status, setstatus] = useState();
    const {id} = useParams();
    const role = localStorage.getItem("top");

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
        const role = newRole;

        axios.post(`${process.env.REACT_APP_URL}/api/register`,
        {username: user,
         password: pass,
         mail: mail,
         role: role}).then((response) => {
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
      if(role === "0"){
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

    const deleteUser = row =>{

        const name = row.Username;
  
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

      const UpdateUser = row =>{

        const name = row.Username;

        const newname = document.getElementById("Upname").value;
        const mail = document.getElementById("Upmail").value;
  
        Axios.post(`${process.env.REACT_APP_URL}/api/UpdateUser`,   //Şirketi güncelle
                              { oldname: name,
                                name: newname,
                                mail: mail,
                              }).then((response2) => {
                                if(response2.data.done){
                                  getData();
                                }
                                else{
                                  console.log("olduramadık")
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
    role === "0" ? {
      name: '',
      allowOverflow: true,
      button: true,
      maxwidth: "1px",
      cell: (props) => <Popup contentStyle={{width: "40%", height: "30%"}} trigger=
      {<button className={maincss.newButton}>Güncelle</button>}
      modal nested>
      {
          close => (
              <div className={maincss.modal}>
                  <div className={maincss.grid}>
              <label for="Upname">Kullanıcı Adı: </label>
              <input type="text" id="Upname" defaultValue={props.Username}/>
              <label for="Upmail">Mail: </label>
              <input type="email" id="Upmail" defaultValue={props.Mail}/>
              <p className={maincss.newP}>{status}</p>
              <div className={maincss.buttondiv}>
                      <button className={maincss.PopButtonDel} onClick={() => {UpdateUser(props); close();}}>
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
                      Kullanıcı "{props.Username}" silinecek, emin misiniz?
                  </div>
                  <div className={maincss.buttondiv}>
                      <button className={maincss.PopButtonDel} onClick={() => {deleteUser(props); close();}}>
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
            <p >Kullanıcılar</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        defaultSortFieldId={1}
    />
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
                <label for="role">Kullanıcı Rolü: </label>
                <input type="email" id="role" onChange={(e) => setnewRole(e.target.value)}/>
                <p className={maincss.newP}>{status}</p>
                <button className={maincss.newButton} onClick={register}>Kaydet</button>
                </div>
            </div>
            
            
        </div>
        
        
    );
}
