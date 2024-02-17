import React, { useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import { getMessagesList } from '../../actions/messagesAction';
import {toast} from 'react-toastify'
import { clearError } from '../../slices/messagesSlice';
import { Link } from 'react-router-dom';

const DatatablePage = () => {
  const dispatch=useDispatch()
  const {isLoading,datas,error}=useSelector((state)=>state.messagesState)
  useEffect(()=>{
    dispatch(getMessagesList)
  },[])

  useEffect(()=>{
    if(error)
    {
      toast.error(error,{
        position:'bottom-center',
        onOpen:clearError()
      })
    }
  },[])

  const items=datas?.map(item=>{
    return {
        Date: item.message.date.split("T")[0].replace(/-/g, "/"),
        Name: item.user.firstname + ' ' + item.user.lastname,
        Role: item.user.role,
        Option: <Link to={`/admin/messages/${item.user._id}`}><button style={{ padding:'8px 20px'}} className='btn'>View</button></Link>
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
    rows: items
  };

  return (
    <>
    {
      isLoading?<Loader/>:
      <div style={{padding: '0 150px'}}>
      <h2 style={{textAlign: 'center', margin: '20px 0'}}><u>Message Details</u></h2>
      <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
    </div>
    }
    </>
  );
}

export default DatatablePage;