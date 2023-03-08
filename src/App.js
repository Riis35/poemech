import React, { useState } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter}
    from 'react-router-dom';
import Main from './pages/Main';


import CabinInfo from './pages/CabinInfo.jsx';
import Signup from './pages/Signup';
import DeviceList from './components/DeviceList';
import Login from './loginPage/Login';
import CompanyInfo from './pages/CompanyInfo';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={< Login />}></Route>
      <Route path='/main/:id' element={< Main />}></Route>
      <Route path='/cabininfo/:id' element={< CabinInfo />}></Route>
      <Route path='/company/:id' element={< CompanyInfo />}></Route>
    </Routes>
  </BrowserRouter>

  );
}
export default App;
