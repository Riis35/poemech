import React from 'react'
import DataTable from 'react-data-table-component';


export default function company(props) {  



    const columns = [{
        name: 'İşlem',
        selector: row => row.title,
    },
    {
      name: 'Sayı',
      selector: row => row.year,
      sortable: true,
    },
    
    ]
console.log(props)
const data = props.OneData.map(el => {  //alınan verileri mapleme
    return {
        Operation: el.Operation,
        Number: el.count
    }  
})

    return (
        <div>
            <p>{props.name}</p>
            <DataTable
        columns={columns}
        data={data}
    /></div>
        
    );
}
