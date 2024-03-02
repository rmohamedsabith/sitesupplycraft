
import 'bootstrap/dist/css/bootstrap.min.css';   
import { Link } from 'react-router-dom'; 
import './Verifications.css'
import React, { useEffect} from 'react';
import { MDBDataTable } from 'mdbreact';
import {useDispatch,useSelector} from 'react-redux'
import { getProcessingOwners } from '../../actions/adminActions';
import Loader from '../Loader.js'
import { clearError } from '../../slices/adminSlice.js';
import { toast } from 'react-toastify';
import MetaData from '../Layouts/MetaData.js';



function Verifications() {  
  const dispatch=useDispatch()
  const {isLoading,users,error,message}=useSelector((state)=>state.adminState)

  useEffect(()=>{
    dispatch(getProcessingOwners)
  },[dispatch])



  const items=users?.map(user=>{
    let statusColor = user.status === 'processing' ? 'green' : user.status === 'verified' ?null: 'red';
    return {
        Date: user.createdAt.split("T")[0].replace(/-/g, "/"),
        Name: user.firstname + ' ' + user.lastname,
        Status: <span style={{ color: statusColor }}>{user.status}</span>,
        Option: <Link to={`/admin/verification/${user._id}`}><button style={{ padding:'8px 20px'}} className='btn'>View</button></Link>
    }
  })
  const data = {
    columns: [
      {
        label: 'Date',
        field: 'Date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Name',
        field: 'Name',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Status',
        field: 'Status',
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
    rows: items
  };

  return (
    <>
    {
      isLoading?<Loader/>:
      <>
      <MetaData title={'Verifications'}/>
      <div style={{padding: '0 150px'}}>
      <h2 style={{textAlign: 'center', margin: '20px 0'}}><u>Verifications</u></h2>
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
export default Verifications;  