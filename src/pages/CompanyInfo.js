import React from 'react'
import Company from '../Company/Company'
import Navbar from "../navbar/navbar";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';

export default function CompanyInfo() {

  const {id} = useParams();

  return (
    <div>
        <Navbar />
        <Company id = {id}/>
    </div>
  )
}
