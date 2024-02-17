import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { useNavigate } from 'react-router-dom';

const DatatablePage = () => {
  
  let navigate = useNavigate();

  function handleClick(){
    navigate('/admin/payments/details');
  }

  const data = {
    columns: [
      {
        label: 'Payment ID',
        field: 'payment_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'User ID',
        field: 'user_id',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 100
      },
      
      {
        label: 'No. of Products',
        field: 'no_of_products',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Details',
        field: 'details',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        payment_id: '215623722',
        user_id: '12',
        status: 'Fail',
        date: '2011/04/25',
        no_of_products: '300',
        amount: '30',
        details: <button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        payment_id: '345623722',
        user_id: '12',
        status: 'Fail',
        date: '2011/04/25',
        no_of_products: 'A03',
        amount: '345',
        details: <button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        payment_id: '745623722',
        user_id: '11',
        status: 'Success',
        date: '2011/04/25',
        no_of_products: 'A03',
        amount: '500',
        details: <button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        payment_id: '745623722',
        user_id: '32',
        status: 'Success',
        date: '2011/04/25',
        no_of_products: 'A06',
        amount: '500',
        details: <button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        payment_id: '745623722',
        user_id: '42',
        status: 'Fail',
        date: '2011/04/25',
        no_of_products: 'A03',
        amount: '544',
        details:<button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        payment_id: '745623722',
        user_id: '25',
        status: 'Success',
        date: '2011/04/25',
        no_of_products: 'A09',
        amount: '1220',
        details: <button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
      {
        payment_id: '745623722',
        user_id: '11',
        status: 'Success',
        date: '2011/04/25',
        no_of_products: 'A05',
        amount: '500',
        details: <button onClick={handleClick} style={{width: '68px', borderRadius: '5px'}}>View</button>
      },
     
      
    ]
  };

  return (
   <div style={{padding: '0 150px'}}>
          <h2 style={{textAlign: 'center', margin: '20px 0'}}><u>Payment Details</u></h2>
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