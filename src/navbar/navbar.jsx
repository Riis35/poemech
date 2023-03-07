import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import { IconContext } from "react-icons";

// ROUTING

import { Link, useParams } from "react-router-dom";


// STYLES
import navbarCss from "./navbar.module.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const {id} =  useParams();
  

  const SidebarData = [
    {
      title: "Ana Sayfa",
      path: `/main`,
      icon: <AiIcons.AiFillHome />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Şirket Bilgileri",
      path: `/company`,
      icon: <IoIcons.IoIosPaper />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Kabin Bilgileri",
      path: `/cabin`,
      icon: <FaIcons.FaCartPlus />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Kabin Detayları",
      path: `/cabininfo`,
      icon: <IoIcons.IoMdPeople />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Kart Bilgileri",
      path: `/card`,
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Raporlar",
      path: `/reports`,
      icon: <IoIcons.IoMdHelpCircle />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Kullanıcı Detayları",
      path: `/user`,
      icon: <IoIcons.IoMdHelpCircle />,
      cName: navbarCss["nav-text"]
    },
    {
      title: "Çıkış",
      path: "/login",
      icon: <IoIcons.IoMdExit />,
      cName: navbarCss["nav-text"]
    }
  ];
  
  const logout = () =>{
    localStorage.removeItem("token");
  };



  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className={navbarCss.navbar}>
          <Link to="#" className={navbarCss["menu-bars"]}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? navbarCss["nav-menu active"] : navbarCss["nav-menu"]}>
          <ul className= {navbarCss["nav-menu-items"]} onClick={showSidebar}>
            <li className={navbarCss["navbar-toggle"]}>
              <Link to="#" className={navbarCss["menu-bars"]}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick = {item.title === "Çıkış" ? logout : null}>
                  <Link to={item.title === "Çıkış" ? item.path : item.path+"/"+id }>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
