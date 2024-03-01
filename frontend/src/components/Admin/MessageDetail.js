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
        
          <div className='_main' >
          
     <Link to = '/admin/messages'><img src = {back} className='im3'></img></Link>

     <div className='body1'>
            <div className='app'>
            <div className='chat-screen'>
              <div className='header'>
                <div className = 'logo'>Chat Box</div>
                </div>
            </div>
        
            <div className='messages'>

              {messages && messages.map((message) => (    
               
              message.receiver === null ? (
                
                <div className="message msg" >
                    <div className='name'>
                      <p className='person'>You</p>
                      {message.content}</div>
                     <div className='text'> {getTimeFromTimestamp(message.date)}
                     </div> 
                    </div>                 
                      ) : (
                        <div className="message other-message" >
                      <div className='name'>
                        <p className='person'>Admin</p>
                      {message.content}</div>
                      <div className='text'> {getTimeFromTimestamp(message.date)}
                   </div>
                   </div>
              )))}
            </div>
            
      
        <div className='typebox'>
              <input type='text' value={newMessage}   onChange={e => setNewMessage(e.target.value)} className='inputbox' placeholder='   Enter Message ..'></input>
                        <button className='btnicon'  onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} className='tt'/></button>
        </div>
      
    
</div>
      </div>
      </div>
      

        
        </>
      }
      </>
  )
}


export default MessageDetails