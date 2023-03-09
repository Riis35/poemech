import React from 'react'
import DataTable from 'react-data-table-component';


export default function company(id) {



const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

    return (
        <DataTable
            columns={columns}
            data={data}
        />
    );
}
