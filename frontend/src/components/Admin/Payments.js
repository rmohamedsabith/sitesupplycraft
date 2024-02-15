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
        label: 'Product ID',
        field: 'product_id',
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
        product_id: 'B03',
        amount: '30',
        details: <div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
      },
      {
        payment_id: '345623722',
        user_id: '12',
        status: 'Fail',
        date: '2011/04/25',
        product_id: 'A03',
        amount: '345',
        details: <div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
      },
      {
        payment_id: '745623722',
        user_id: '11',
        status: 'Success',
        date: '2011/04/25',
        product_id: 'A03',
        amount: '500',
        details: <div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
      },
      {
        payment_id: '745623722',
        user_id: '32',
        status: 'Success',
        date: '2011/04/25',
        product_id: 'A06',
        amount: '500',
        details: <div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
      },
      {
        payment_id: '745623722',
        user_id: '42',
        status: 'Fail',
        date: '2011/04/25',
        product_id: 'A03',
        amount: '544',
        details:<div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
      },
      {
        payment_id: '745623722',
        user_id: '25',
        status: 'Success',
        date: '2011/04/25',
        product_id: 'A09',
        amount: '1220',
        details: <div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
      },
      {
        payment_id: '745623722',
        user_id: '11',
        status: 'Success',
        date: '2011/04/25',
        product_id: 'A05',
        amount: '500',
        details: <div onClick={handleClick} style={{border: '2px solid black', borderRadius: '13px'}}>View</div>
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