import React, {useState} from 'react'
import Device from './Device.jsx'
import DeviceListCss from './DeviceList.module.css'


//search func 

  const searchFunc = (query,arr) => {
        // eğer input boşsa array
        if(query === ' '){return arr}
        else{return arr.filter(arrElement  =>arrElement.toLocaleLowerCase().includes(query.toLocaleLowerCase()))}
    }


// This component allows search for devices and dynamically list devices
export default function DeviceList() {


     //list of devices names
     var  devArr = ["Otel","Havuz","Hastane","Ev","Ofis","Spor Salonu"];

    //prepare hooks
    const [query, setQuery] = useState('');
    const [queryMatch, setQueryMatch] = useState(devArr)

   
   

  
    //handle events
    const handleQuery =({target})=>{
        
        setQueryMatch(searchFunc(target.value,devArr));
        setQuery(target.value)
        
        console.log(queryMatch)
      
    }

/*
      setQueryMatch(searchFunc(query,devArr));

 */
console.log(typeof query);


  return (
    <div className={DeviceListCss.container}>

       
       
        <input className={DeviceListCss.searchBar} value={query} onChange={handleQuery} placeholder="arama yapın..." ></input>
        <p> search is  {query}    queryMatch is {queryMatch}</p>
        {queryMatch.map((device,i)=>(
            <div key={i}> <Device name={device}  key={i} /></div> 
        ))}
    </div>
  )
}
