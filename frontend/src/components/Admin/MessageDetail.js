import React, { useEffect } from 'react'
import '../Product Owner/Message.css'
import back from '../../images/back.png'
import { Link, useParams } from 'react-router-dom'
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import{useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import {sendMessage} from '../../actions/messagesAction'
import {getMessages} from '../../actions/messagesAction'
import { getMessagesFromAdmin } from '../../actions/messagesAction'
import MetaData from '../Layouts/MetaData'
import {toast} from 'react-toastify'


const MessageDetails = () => {
  const{isLoading,messages} = useSelector((state)=> state.messagesState)
  const{user} = useSelector((state)=>state.authState)
  const dispatch=useDispatch()
  const [content,setcontent] = useState([])
  const[currentchat,setcurrentchat] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const{id}=useParams()

  useEffect(()=>{
    dispatch(getMessagesFromAdmin(id))
  },[dispatch])

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== '' ) {
      dispatch(sendMessage(null,user.role,newMessage));
      dispatch(getMessages);
      setNewMessage('');      
    }
    else{
      toast.warning('Please type something',{
        position:'bottom-center',
      })
    }
  };

  
  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}`;
  };

  return (
      <>
      {
        isLoading?<Loader/>:
        <>
        <MetaData title={'Message'}/>
          <div className='_main'>
        <h1>Contact Admin</h1> 
     <Link to = '/ProductOwner/DashBoard'><img src = {back} className='im3'></img></Link>

    <div className='Mbox'>
      <table>
      <tbody>
        <tr>
            <div className='chat1'>
                <p>Chat Box </p>
            </div>
        </tr>

        <tr>
            <div className='cbox'>
            <div className="chat-body" >
              {messages && messages.map((message) => (             
              message.receiver === null ? (
                    <p className='msg'>
                      {message.content}<br/>
                      {getTimeFromTimestamp(message.date)}
                    </p>                    
                      ) : (
                      <p className='msg1'>
                      {message.content}<br/>
                      {getTimeFromTimestamp(message.date)}
                   </p>
              )))}
            </div>
            </div>
            
        </tr>

      <tr>
        <div className='submit'>
              Message : <input type='text' value={newMessage}   onChange={handleChange} className='text1'></input>
                        <button className='btnicon'  onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} className='tt'/></button>
        </div>
      </tr>
    </tbody>
    </table>

      </div>

        </div>
        </>
      }
      </>
  )
}


export default MessageDetails