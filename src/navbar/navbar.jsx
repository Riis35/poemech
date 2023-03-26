import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import { IconContext } from "react-icons";
import banner from "../image/banner.png";
import solbanner from "../image/solbanner.png";

// ROUTING

import { Link, useParams } from "react-router-dom";


// STYLES
import "./navbar.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const {id} =  useParams();
  const role = localStorage.getItem("top");
  
  const SidebarData = [
    {
      title: "Ana Sayfa",
      path: `/main`,
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text"
    },
    {
      title: "Şirket Bilgileri",
      path: `/company`,
      icon: <IoIcons.IoIosBusiness />,
      cName: "nav-text"
    },
    {
      title: "Kabin Bilgileri",
      path: `/cabin`,
      icon: <FaIcons.FaBoxes />,
      cName: "nav-text"
    },
    {
      title: "Kabin Detayları",
      path: `/cabininfo`,
      icon: <FaIcons.FaBox />,
      cName: ["nav-text"]
    },
    {
      title: "Kullanım",
      path: `/card`,
      icon: <FaIcons.FaIdCard />,
      cName: ["nav-text"]
    },
    {
      title: "Kullanıcı Detayları",
      path: `/user`,
      icon: <FaIcons.FaUser />,
      cName: ["nav-text"]
    },
    {
      title: "Çıkış",
      path: "/login",
      icon: <IoIcons.IoMdExit />,
      cName: ["nav-text"]
    }
  ];
  
  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("top");
  };



  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar"> 
          
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

                  {/*   burası navbara bişiler yazmak içim*/}
          <div className="navbarBanner"> <img src={banner} className="bannerimage"/> </div>


        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className= "nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
              <Link to="#">
              <img src={solbanner} className="leftbannerimage"/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              if(item.title !== "Kullanıcı Detayları"){
                return (
                  <li key={index} className={item.cName} onClick = {item.title === "Çıkış" ? logout : null}>
                    <Link to={item.title === "Çıkış" ? item.path : item.path+"/"+id }>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
              else{
                if(role === "0"){
                  return (
                    <li key={index} className={item.cName} onClick = {item.title === "Çıkış" ? logout : null}>
                      <Link to={item.title === "Çıkış" ? item.path : item.path+"/"+id }>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                }
              }
              
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
