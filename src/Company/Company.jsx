import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import Axios from 'axios';
import { useEffect, useState } from "react";
import maincss from "./Company.module.css"
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
import axios from 'axios';
import differenceBy from 'lodash/differenceBy';
import Cabin from '../Cabin/Cabin'
import { Row } from '@adobe/react-spectrum';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function Company(props) {  
    const [datas, setdata] = useState([]);
    const [data, setRows] = useState([]);
    const [newCompanyName, setnewCompanyName] = useState();
    const [newCompanyAddress, setnewCompanyAddress] = useState();
    const [newCompanyPhone, setnewCompanyPhone] = useState();
    const [newCompanyUser, setnewCompanyUser] = useState();
    const [newCompanyMail, setnewCompanyMail] = useState();
    const [newCabCom, setnewCabCom] = useState();
    const [newCabName, setnewCabName] = useState();
    const [newCabAddress, setnewCabAddress] = useState();
    const [status, setstatus] = useState();
    const [status2, setstatus2] = useState();
    const {id} = useParams();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const role = localStorage.getItem("top")

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
                    User_name: el.U_name,
                    Com_name: el.Com_name,
                    Address: el.Com_address,
                    Phone: el.Com_phone,
                    Mail: el.Com_mail,
                }  
            })) 
        }
        
    }, [datas])

    const getData = () =>{
      if(role === "0"){
        Axios.post(`${process.env.REACT_APP_URL}/api/CompanyAdminInfo`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    else{
        Axios.post(`${process.env.REACT_APP_URL}/api/CompanyInfo`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: id,
                              }).then((response2) => {
                                setdata(response2.data.result)
                              })
    }
    }

    const updateCompany = row =>{

      const oldname = row.Com_name;
      const name = document.getElementById("Upname").value;
      const address = document.getElementById("Upaddress").value;
      const phone = document.getElementById("Upphone").value;
      const mail = document.getElementById("Upmail").value;

      
      Axios.post(`${process.env.REACT_APP_URL}/api/UpdateCompany`,   //Şirketi güncelle
                              { oldname: oldname,
                                name: name,
                                address: address,
                                phone: phone,
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

    const deleteCompany = row =>{

      const name = row.Com_name;

      console.log(name)
      Axios.post(`${process.env.REACT_APP_URL}/api/DeleteCompany`,   //Şirketi sil
                              {name: name,
                              }).then((response2) => {
                                if(response2.data.done){
                                  setdata(differenceBy(datas, selectedRows, 'Com_name'));
                                  getData();
                                }
                                else{
                                  console.log("olduramadık")
                                }
                              })
      
    }

    const register = () => {

            const user = newCompanyName;
            const address = newCompanyAddress;
            const phone = newCompanyPhone;
            const mail = newCompanyMail;

            const username = newCompanyUser;
    
    
            axios.post(`${process.env.REACT_APP_URL}/api/GetId`,
            {username: username,}).then((response) => {
              if(response.data.done){
                axios.post(`${process.env.REACT_APP_URL}/api/RegisterUser`,
                {name: user,
                address:address,
                phone:phone,
                id:response.data.result[0].U_id, 
                mail:mail}).then((response) => {
                if(response.data.done){
                setstatus("Başarılı")
                getData();
              }
              else{
                setstatus("Kaydedilemedi.");
              }
              
            })
              }
              else{
                setstatus("Böyle bir kullanıcı yok.");
              }
              
            })
            .catch(function (error) {
              
            });
    }

    const registerCab = () => {

      const Cabname = newCabName;
      const address = newCabAddress;

      const username = newCabCom;


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
            setstatus2("Başarılı")
            getData();
        }
        else{
          setstatus2("Kaydedilemedi.");
        }
        
      })
        }
        else{
          setstatus2("Böyle bir şirket yok.");
        }
        
      })
      .catch(function (error) {
        
      });
}

    const deneme = row => 
         <Cabin cab={row}/>;
    
    
    const columns = [
    role === "0" ?
      {
        name: 'Kullanıcı Adı',
        allowOverflow: true,
        selector: row => row.User_name,
        compact: false,
        style: {
            
        },
    } : {width:"0px"},
      {
        name: 'Şirket Adı',
        allowOverflow: true,
        selector: row => row.Com_name,
        compact: false,
        style: {
            
        },
    },
    {
      name: 'Adres',
      allowOverflow: true,
      selector: row => row.Address,
      style: {
        			
        		},
    },
    {
        name: 'Telefon',
        selector: row => row.Phone,
        width: "170px",
        style: {
                      
                  },
      },
      {
        name: 'Mail Adresi',
        allowOverflow: true,
        width: "250px",
        selector: row => row.Mail,
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
                <label for="Upname">Şirket Adı: </label>
                <input type="text" id="Upname" defaultValue={props.Com_name}/>
                <label for="Upaddress">Adres: </label>
                <input type="text" id="Upaddress" defaultValue={props.Address}/>
                <label for="Upphone">Telefon: </label>
                <input type="phone" id="Upphone" defaultValue={props.Phone}/>
                <label for="Upmail">Mail: </label>
                <input type="email" id="Upmail" defaultValue={props.Mail}/>
                <p className={maincss.newP}>{status}</p>
                <div className={maincss.buttondiv}>
                        <button className={maincss.PopButtonDel} onClick={() => {updateCompany(props); close();}}>
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
                        Şirket "{props.Com_name}" silinecek, emin misiniz?
                    </div>
                    <div className={maincss.buttondiv}>
                        <button className={maincss.PopButtonDel} onClick={() => deleteCompany(props)}>
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
            <p >Şirket Bilgileri</p>
            <div className={maincss["line-1"]}></div>
            <div className={maincss.containerinside}><DataTable
        columns={columns}
        data={data}
        highlightOnHover= {true}
        striped = {true}
        /*selectableRows = {role === "0"}
        selectableRowsHighlight = {role === "0"}*/
        onSelectedRowsChange={handleRowSelected}
        selectableRowsSingle = {true}
        expandableRows
        expandOnRowClicked= {true}
        expandableRowsComponent={deneme}
    />
    
    </div>
            </div>
            {role === "0" ? <div className={maincss.newCompany}>
                <p className={maincss.newP}>Yeni Şirket Formu</p>
                <div className={maincss.grid}>
                <label for="name">Şirket Adı: </label>
                <input type="text" id="name" onChange={(e) => setnewCompanyName(e.target.value)}/>
                <label for="address">Adres: </label>
                <input type="text" id="address" onChange={(e) => setnewCompanyAddress(e.target.value)}/>
                <label for="phone">Telefon: </label>
                <input type="phone" id="phone" onChange={(e) => setnewCompanyPhone(e.target.value)}/>
                <label for="username">Kullanıcı Adı: </label>
                <input type="text" id="username" onChange={(e) => setnewCompanyUser(e.target.value)}/>
                <label for="mail">Mail: </label>
                <input type="email" id="mail" onChange={(e) => setnewCompanyMail(e.target.value)}/>
                <p className={maincss.newP}>{status}</p>
                <button className={maincss.newButton} onClick={register}>Kaydet</button>
                </div>
            </div>
             : null}
             {role === "0" ? <div className={maincss.newCompany}>
                <p className={maincss.newP}>Yeni Kabin Formu</p>
                <div className={maincss.grid}>
                <label for="name">Şirket Adı: </label>
                <input type="text" id="name" onChange={(e) => setnewCabCom(e.target.value)}/>
                <label for="Cabname">Kabin Adı: </label>
                <input type="text" id="Cabname" onChange={(e) => setnewCabName(e.target.value)}/>
                <label for="Address">Kabin Adresi: </label>
                <input type="text" id="Address" onChange={(e) => setnewCabAddress(e.target.value)}/>
                <p className={maincss.newP}>{status2}</p>
                <button className={maincss.newButton} onClick={registerCab}>Kaydet</button>
                </div>
            </div> : null}
        </div>
        
        
    );
}
