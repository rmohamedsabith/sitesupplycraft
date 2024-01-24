import React from 'react'
import './Message.css'
import back from '../../images/back.png'
import { Link } from 'react-router-dom'
import send1 from '../../images/send1.png'



const Messages = () => {
  return (
      <div className='_main'>
        <h1>Contact Admin</h1> 
     <Link to = '../../ProductOwner/DashBoard'><img src = {back} className='im3'></img></Link>

    <div className='Mbox'>
    </div>
    <div className='submit'>
      Message : <input type='text' className='text1'></input>
      <img src={send1} className='im2'></img>
    </div>
    </div>
  )
}

export default Messages