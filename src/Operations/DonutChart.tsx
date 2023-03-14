import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect } from "react";
import Axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend);



export default function Donut(props) {

    const[DbData, setDbData] = useState<any[]>([]);
    let Operations : string[] = [];
    let Count : number[] = [];
    const[data, setData] = useState({
        labels: Operations,
        datasets: [
          {
            label: 'Kullanım ',
            data: Count,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(120, 78, 90, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(120, 78, 90, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    
    const getData = () => {

        Axios.post(`${process.env.REACT_APP_URL}/api/getForDoughnut`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: props.id,
                              }).then((response2) => {
                                setDbData(response2.data.result)
                              })
    }

    useEffect(() => {
        getData();
        
    }, [])
    
    useEffect(() => {
        

        for (let index = 0; index < DbData.length; index++) {
            Operations.push(DbData[index].Operation)
            Count.push(DbData[index].count)
            
        }
        setData({
            labels: Operations,
            datasets: [
              {
                label: 'Kullanım ',
                data: Count,
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(120, 78, 90, 1)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(120, 78, 90, 1)',
                ],
                borderWidth: 1,
              },
            ],})
        
    }, [DbData])




  return <Doughnut data={data} options={{
    responsive: true,
    maintainAspectRatio: false,
  }}/>;
}
