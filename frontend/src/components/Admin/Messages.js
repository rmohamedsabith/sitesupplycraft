import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Date',
        field: 'Date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Role',
        field: 'Role',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Option',
        field: 'Option',
        sort: 'asc',
        width: 200
      },
      
    ],
    rows: [
      {
        Date: "14/12/2023",
        Role: "Product Owner",
        Option: <button  style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        Date: "20/12/2023",
        Role: "Labourer",
        Option: <button  style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        Date: "30/12/2023",
        Role: "Product Owner",
        Option: <button  style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        Date: "29/12/2023",
        Role: "Product Owner",
        Option: <button style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;
