import React from 'react'
import Cabin from '../Cabin/Cabin'
import Navbar from "../navbar/navbar";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';

export default function CompanyInfo() {

  const {id} = useParams();

  return (
    <div>
        <Navbar />
        <Cabin id = {id}/>
    </div>
  )
}
