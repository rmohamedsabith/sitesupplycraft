import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPayments, paymentDetail } from '../../actions/paymentActions';
import DashboardTile from './DashboardTile';
import Loader from '../Loader';
import MetaData from '../Layouts/MetaData';

const DatatablePage = () => {
  const {isLoading,
    userpayments,
    totalAmount,
    totalCount,
    totalsOfCountAmount,}=useSelector(state=>state.paymentState)
  const navigate = useNavigate()
  const dispatch=useDispatch();

  const handleClick=(id)=>{
    dispatch(paymentDetail(id))
    navigate('/admin/payments/details')
    
  }

  const items=userpayments?.slice().reverse().map(payment=>{
    let statusColor = payment.paymentInfo.status === 'succeeded' ? 'green' : null;
    return {
        payment_id:payment.paymentInfo.id,
        user_name:payment.user?.firstname+' '+payment.user?.lastname,
        status: <span style={{ color: statusColor }}>{payment.paymentInfo.status}</span>,
        date: payment.paidAt.split("T")[0].replace(/-/g, "/"),
        time: payment.paidAt.split("T")[1].split(".")[0],
        no_of_products:payment.count,
        amount:payment.totalPrice,
        details:<button style={{ padding:'8px 20px'}} className='btn' onClick={()=>handleClick(payment._id)}>View</button>
    }
  })
  const data = {
    columns: [
      {
        label: 'Payment ID',
        field: 'payment_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'User Name',
        field: 'user_name',
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
        label: 'Time',
        field: 'time',
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
    rows: items
  };

  const totalsOfCountAmountArray=Object.values(totalsOfCountAmount)
  console.log(totalsOfCountAmountArray)

  return (
    <>
    {
      isLoading?<Loader/>:
      <>
      <MetaData title={'Payment'}/>
      <div style={{padding: '0 50px'}}>
      <div className='d-flex justify-content-between'>
      <div style={{margin: '45px'}} className="">
         <DashboardTile
           categoryTitle={"Paid Product Count"}
           CategotyTotalCount={totalCount}
           graphData={totalsOfCountAmountArray.map(item=>item.no)}
         />
       </div>
       <div style={{margin: '45px'}} className="">
         <DashboardTile
           categoryTitle={"Recieved Total Amount"}
           CategotyTotalCount={totalAmount}
           graphData={totalsOfCountAmountArray.map(item=>item.total)}
         />
       </div>
      </div>
           <h2 style={{textAlign: 'center', margin: '20px 0'}}><u>Payment Details</u></h2>
      <MDBDataTable
       striped
       bordered
       small
       data={data}
     />
    </div>
      </>
    }
    </>
  );
}

export default DatatablePage;