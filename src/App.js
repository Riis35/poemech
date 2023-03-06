import { useState } from 'react';
import Axios from 'axios'
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter}
    from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Login2 from './pages/Login2';
import CabinInfo from './pages/CabinInfo';
import Signup from './pages/Signup';
import DeviceList from './components/DeviceList';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={< Login2 />}></Route>
      <Route path='/main/:id' element={< Main />}></Route>
      <Route path='/cabininfo/:id' element={< DeviceList />}></Route>
      <Route path='/admin/new/signup' element={< Signup />}></Route>
    </Routes>
  </BrowserRouter>

  );
}
export default App;
