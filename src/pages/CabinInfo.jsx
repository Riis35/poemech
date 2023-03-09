import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import DeviceList from "../components/DeviceList";
import cabinInfoCss from "./CabinInfo.module.css"


function CabinInfo() {
  const {id} = useParams();

  return (
    <div >
      <Navbar />
      <DeviceList id={id}/>
    </div>
  );
}

export default CabinInfo;

