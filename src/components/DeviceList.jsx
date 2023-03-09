import React, {useState, useEffect,useMemo} from 'react'
import Navbar from '../navbar/navbar.jsx'
import Device from './Device.jsx'
import DeviceListCss from './DeviceList.module.css'
import axios from 'axios';


//search func 

  const searchFunc = (query,arr) => {
        // eğer input boşsa array
        if(query === ' '){return arr}
        else{return arr.filter(arrElement  =>arrElement.toLocaleLowerCase().includes(query.toLocaleLowerCase()))}
    }


// This component allows search for devices and dynamically list devices
export default function DeviceList(id) {

  const realid = id.id;

  const getDevice = () =>{
    axios.post(`${process.env.REACT_APP_URL}/api/CabinInfo`,
      {id: realid,
      }).then((response) => {
      if(!response.data.done){
        //console.log(response)
        //console.log("başaramadık")
      }
      else{
        var dummy = [];
        for (let i = 0; i < response.data.result.length; i++) {
          dummy[i] = response.data.result[i].Cab_name;
        }
        setDevArr(dummy);
      }
    })
  };
     //list of devices names
     /*
     useEffect(() => {
      getDevice();
          
        }, []);*/
    //prepare hooks
    const [devArr, setDevArr] = useState([]);
    const [query, setQuery] = useState('');
    const [queryMatch, setQueryMatch] = useState(devArr)
   
   
    useEffect(()=>{
      getDevice();
  }, []);

  useEffect(()=>{
    setQueryMatch(searchFunc(" ",devArr));
    setQuery(" ")
}, [devArr]);
    
    //handle events
    const handleQuery =({target})=>{
        
        setQueryMatch(searchFunc(target.value,devArr));
        setQuery(target.value)
        
      
    }

/*
      setQueryMatch(searchFunc(query,devArr));

 */

  return (
    <div className={DeviceListCss.container}>       
        <input className={DeviceListCss.searchBar} value={query} onChange={handleQuery} placeholder="arama yapın..." ></input>
        <p> search is  {query}    queryMatch is {queryMatch}</p>
        {queryMatch.map((device,i)=>(
            <div key={i}> <Device name={device}  key={i} index={i}/></div> 
        ))}

    </div>
  )
}
