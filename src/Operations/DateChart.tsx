import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
    maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Günlere Göre Kullanım',
    },
  },
};

//var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');

export default function Chart(props) {
    var today = new Date();
    const[DbData, setDbData] = useState<any[]>([]);
    var labels : string[] = []
    var count : number[] = []

    const[data, setData] = useState({
      labels,
        datasets: [
          {
            label: 'Kullanım Sayıları',
            data: count,
            borderColor: 'rgb(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      })

    

    const minusTenDays = () => {
        
    }

    const getData = () => {
        const today = labels[9];
        Axios.post(`${process.env.REACT_APP_URL}/api/getForBar`,   //Alınan ID'lere göre gün bazında toplam işlem sayıları
                              {id: props.id,
                                date: today,
                              }).then((response2) => {
                                if(response2.data.done){
                                    setDbData(response2.data.result)
                                }
                                
                              })
    }

    useEffect(() => {
        if(DbData.length >0){

        for (let index = 8; index >= 0; index--) {
          var dummyDate = new Date();
          dummyDate.setDate(today.getDate() - index);
          labels.push(dummyDate.toJSON().slice(0,10).replace(/-/g,'-'))
          count.push(0);
      }

        for (let index = 0; index < DbData.length; index++) {
            for (let index1 = 0; index1 < 9; index1++) {
                if(DbData[index].OpDate === labels[index1]){
                    count[index1] = DbData[index].count;
                    
                }
                
            }
            
        }

      
        setData(
            {
              labels,
                datasets: [
                  {
                    label: 'Kullanım Sayısı',
                    data: count,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              }
        )
        }
        
      }, [DbData])


    useEffect(() => {
        minusTenDays();
        getData();
    }, [])
    



  return <Line options={options} data={data} />;
}
