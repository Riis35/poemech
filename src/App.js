import React, { useState } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter}
    from 'react-router-dom';
import Main from './pages/Main';


import CabinInfo from './pages/CabinInfo';
import Signup from './pages/Signup';
import DeviceList from './components/DeviceList';
import Login from './loginPage/Login';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={< Login />}></Route>
      <Route path='/main/:id' element={< Main />}></Route>
      <Route path='/cabininfo/:id' element={< DeviceList />}></Route>
    </Routes>
  </BrowserRouter>

  );
}
export default App;
