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
        Option: <button  style={{padding:'5px 20px',margin:'0'}} className='btn'>View</button>
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
    <div style={{padding: '0 150px'}}>
      <h2 style={{textAlign: 'center', margin: '20px 0'}}><u>Message Details</u></h2>
      <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
    </div>
  );
}

export default DatatablePage;