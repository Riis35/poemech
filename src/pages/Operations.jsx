import React from 'react'
import Operations from '../Operations/Operations'
import Navbar from "../navbar/navbar";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';

export default function CompanyInfo() {

  const {id} = useParams();

  return (
    <div>
        <Navbar />
        <Operations id = {id}/>
    </div>
  )
}
