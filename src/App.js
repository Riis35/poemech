import React, { useState } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter}
    from 'react-router-dom';



import Main from './pages/Main.jsx';
import CabinInfo from './pages/CabinInfo.jsx';
import Signup from './pages/Signup';
import DeviceList from './components/DeviceList';
import Login from './loginPage/Login';
import CompanyInfo from './pages/CompanyInfo';
import Cabin from './pages/Cabin';
import Operations from './pages/Operations';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={< Login />}></Route>
      <Route path='/main/:id' element={< Main />}></Route>
      <Route path='/cabininfo/:id' element={< CabinInfo />}></Route>
      <Route path='/company/:id' element={< CompanyInfo />}></Route>
      <Route path='/cabin/:id' element={< Cabin />}></Route>
      <Route path='/card/:id' element={< Operations />}></Route>
    </Routes>
  </BrowserRouter>

  );
}
export default App;
