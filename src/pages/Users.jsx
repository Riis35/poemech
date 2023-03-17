import React from 'react'
import User from '../User/Users'
import Navbar from "../navbar/navbar";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';

export default function CompanyInfo() {

  const {id} = useParams();

  return (
    <div>
        <Navbar />
        <User id = {id}/>
    </div>
  )
}
