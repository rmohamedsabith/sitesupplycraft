import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../Loader'
import { getMessagesFromAdmin, getMessagesList } from '../../../actions/messagesAction';
import { ChatState } from '../../../chatContex';
import { io } from 'socket.io-client';
import { Fragment } from 'react';

var socket=io(process.env.REACT_APP_BACKEND_URL)

const Messages = ({filterUser,setSelectedUser}) => {
  const{notification,setNotification,users,setUsers}=ChatState()
  const dispatch=useDispatch()
  const {isLoading,datas,error,unread}=useSelector((state)=>state.messagesState)
  const {isAuthenticated,user}=useSelector((state)=>state.authState)
  const initialSelectedState = filterUser.reduce((acc, item) => {
    acc[item.user?._id] = false;
    return acc;
  }, {});  
  const [isSelected, setIsSelected] = useState(initialSelectedState);
  const [checked,setChecked]=useState(false)
  const [clickedID,setClickedID]=useState(null)

  useEffect(()=>{
    setUsers(filterUser)
  },[])

  useEffect(()=>{

    if(checked)setNotification(notification.filter((user)=>user._id!==clickedID))

  },[checked])

  useEffect(()=>{
    setNotification(unread)
  },[unread])

  useEffect(() => {
    const handleSenderDetails = (item) => {      
      setUsers((prevUsers) => {
        // Check if the user is already present in the users array
        if (!prevUsers.some((u) => u.user._id === item.user._id)) {
          console.log("sabith New")
          setIsSelected((pre)=>({...pre,[item.user._id]:false}))
          return [...prevUsers, item];
        }
        console.log("Old user")
        const filteredUser=prevUsers.filter((u) => u.user._id !== item.user._id)
        return [...filteredUser,item];
      });
    };

    socket.on("senderDetails", handleSenderDetails);
   // console.log('Sabith users',users)

    return () => {
      socket.off("senderDetails", handleSenderDetails);
    };
  }, [setUsers]);

  useEffect(() => {
    socket.emit("setup", user);
    socket.emit("adminRoom");
    socket.on('checked',(id)=>{
      setChecked(true)
      setClickedID(id)

    })
    const handleNewMessage =  (data) => {
      if(!isSelected[data.sender])
      {
        setNotification((prevNotifications) => {
          const senderIndex = prevNotifications.findIndex(notification => notification._id === data.sender);
          //console.log(senderIndex)
          if (senderIndex !== -1) {
              // If notification from sender exists, update the existing notification
              return prevNotifications.map((notification, index) => {
                  if (index === senderIndex) {
                      return { ...notification, messages: [...notification.messages, data] };
                  }                   
                  return notification;
              });
          } else { 
              // If no notifications from the sender exist, create a new notification object
              return [...prevNotifications, { _id: data.sender, messages: [data] }];
          }
      });
      }      
  }
    socket.on("message_recieved", handleNewMessage);
    return () => {
      socket.off('message_recieved', handleNewMessage);
    };
  }, [user]);

 


  const handleClick=(id,user,index)=>{
    socket.emit('isChecked',id)
    setSelectedUser(user)
    dispatch(getMessagesFromAdmin(id))
    setIsSelected(prevState => {
      const newState = {};
      for (const key in prevState) {
        newState[key] = key === id ? true : false;
      }
      return newState;
    });
    
  }
 // console.log("notification",notification)
 // console.log(isSelected)
  const trimSentence = (sentence) => {
    if (sentence.length <= 10) {
      return sentence; 
    } else {
      return sentence.slice(0, 10) + "...";
    }
  };


  return (
    <>
    {
      isLoading?<Loader/>:
      <div className="flex-1 overflow-auto" style={{maxHeight:'80vh'}}>
      {users.slice().reverse().map((item, idx) => (
       <div key={idx}>
        <div
        className={`chatBar my-1 ${
          isSelected[item.user?._id] ? "bg-sky-500" : ""
        }`}
        onClick={()=>handleClick(item.user?._id,item.user,idx)}
      >
          <div className="mx-2 profileMsgBar">
            <img src={item.user?.profile} alt="user avatar" width={40} height={40}  className='rounded-circle'/>
          </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{item.user?.firstname+' '+item.user?.lastname}{/* <br/>
            <span style={{color:'rgb(240, 240, 242)'}}>{trimSentence(item.message.content)}</span> */}</p> 
          </div>
        </div>
        
        {notification
          ?.filter((user) => user._id === item.user?._id)
          .map((singleNotification, index) => (
            <Fragment key={index}>
              {isSelected[item.user?._id] === false && (
                <div className="MsgNo rounded-circle">
                  {singleNotification.messages.length}

                </div>
              )}
            </Fragment>
          ))}
                </div>
        {!(idx===filterUser.length-1)? <div className="divider my-0 py-0 h-1"></div>:null}
       </div>

     
      ))}
    </div>
    }
    </>
  );
}

export default Messages;