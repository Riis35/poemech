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
              'rgba(98, 178, 47, 1)',
              'rgba(236, 99, 36, 1)',
              'rgba(243, 163, 183, 1)',
              'rgba(138, 68, 20, 1)',
              'rgba(34, 177, 232, 1)',
              'rgba(0, 204, 171, 1)',
              'rgba(200, 113, 55, 1)',
              'rgba(53, 82, 160, 1)',
            ],
            borderColor: [
              'rgba(98, 178, 47, 1)',
              'rgba(236, 99, 36, 1)',
              'rgba(243, 163, 183, 1)',
              'rgba(138, 68, 20, 1)',
              'rgba(34, 177, 232, 1)',
              'rgba(0, 204, 171, 1)',
              'rgba(200, 113, 55, 1)',
              'rgba(53, 82, 160, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    
    const getData = () => {

        Axios.post(`${process.env.REACT_APP_URL}/api/getForDoughnut`,   //Alınan ID'lere göre her kabindeki operasyon sayıları
                              {id: props.id,
                              }).then((response2) => {
                                if(response2.data.done){
                                  setDbData(response2.data.result)
                                  console.log(response2.data.result)
                                }
                                
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
                  'rgba(98, 178, 47, 1)',
                  'rgba(236, 99, 36, 1)',
                  'rgba(243, 163, 183, 1)',
                  'rgba(138, 68, 20, 1)',
                  'rgba(34, 177, 232, 1)',
                  'rgba(0, 204, 171, 1)',
                  'rgba(200, 113, 55, 1)',
                  'rgba(53, 82, 160, 1)',
                ],
                borderColor: [
                  'rgba(98, 178, 47, 1)',
                  'rgba(236, 99, 36, 1)',
                  'rgba(243, 163, 183, 1)',
                  'rgba(138, 68, 20, 1)',
                  'rgba(34, 177, 232, 1)',
                  'rgba(0, 204, 171, 1)',
                  'rgba(200, 113, 55, 1)',
                  'rgba(53, 82, 160, 1)',
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
