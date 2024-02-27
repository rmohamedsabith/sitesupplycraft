import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader';
import { getMessagesFromAdmin, sendMessage } from '../../../actions/messagesAction';
import { getMessages } from '../../../actions/messagesAction';
import MetaData from '../../Layouts/MetaData';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import Lottie from 'react-lottie'
import animationData from '../../../animation/lottie.json' 
import { ChatState } from '../../../chatContex';

var socket,selectedChatCompare

const Messages = ({selectedUser}) => {
  const{notification,setNotification}=ChatState()
  const { isLoading, messages:adminMsg,unread} = useSelector((state) => state.messagesState);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef(null);
  const id =selectedUser._id 
  const location = useLocation();
  const[socketConnected,setSocketConnected]=useState(false)
  const[messages,setMessages]=useState([])
  const[isTyping,setIstyping]=useState(false)
  const[typing,setTyping]=useState(false)  
  const [isOnline,setIsOnline]=useState(false)


  
  useEffect(() => {
    setNotification(notification.filter((user) => user._id !== id));
  }, [isTyping]);

  useEffect(()=>{
    socket=io(process.env.REACT_APP_BACKEND_URL)
    socket.emit("setup",user)
    socket.on("connected",()=>setSocketConnected(true))
    socket.emit('join_chat',id)
    socket.emit("online",id)
    socket.on('online',()=>setIsOnline(true))
    socket.on('offline',()=>setIsOnline(false))
    socket.on('typing',()=>setIstyping(true))
    socket.on('stop_typing',()=>setIstyping(false))
    return () => {
      socket.disconnect(); // Cleanup socket connection on component unmount
      socket.emit("offline",id)
    };
  },[id, user])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(()=>{
    setIstyping(false)
  },[isLoading])

  useEffect(() => {
    if (adminMsg) {
      setMessages(adminMsg);
      selectedChatCompare=messages 
    }
    
  }, [adminMsg, setMessages]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(()=>{
    socket.on("message_recieved",(newMsg)=>{
      if(!selectedChatCompare)
        {
          
        }
        else if(newMsg.receiver===id||newMsg.sender===id){ 
          setMessages((prev)=>[...prev, newMsg]) 
        }
        else{         
          setNotification((prevNotifications) => {
            const senderIndex = prevNotifications.findIndex(notification => notification._id === newMsg.sender);
            console.log(senderIndex)
            if (senderIndex !== -1) {
                // If notification from sender exists, update the existing notification
                return prevNotifications.map((notification, index) => {
                    if (index === senderIndex) {
                        return { ...notification, messages: [...notification.messages, newMsg] };
                    }                   
                    return notification;
                });
            } else { 
                // If no notifications from the sender exist, create a new notification object
                return [...prevNotifications, { _id: newMsg.sender, messages: [newMsg] }];
            }
        });
        } 
     
    })
  },[user]);

 /*  console.log(isOnline) */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      socket.emit('stop_typing',id)
     if(isOnline)dispatch(sendMessage({receiver:id,content:newMessage,isViewed:true}))
      else dispatch(sendMessage({receiver:id,content:newMessage}))
      socket.emit('new_message',({content:newMessage,date:new Date(),receiver:id,sender:user._id,user}))
      setMessages([...messages,{content:newMessage,date:new Date(),receiver:id,sender:user._id}])
      setNewMessage('');      
    } else {
      toast.warning('Please type something', {
        position: 'bottom-center',
      });
    }
  };

  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const getChatDay = (index) => {
    const currentMessage = messages[index];
    const prevMessage = messages[index - 1];
    if (!prevMessage) return true; 
    const currentMessageDate = new Date(currentMessage.date);
    const prevMessageDate = new Date(prevMessage.date);
    return (
      currentMessageDate.getDate() !== prevMessageDate.getDate() ||
      currentMessageDate.getMonth() !== prevMessageDate.getMonth() ||
      currentMessageDate.getFullYear() !== prevMessageDate.getFullYear()
    );
  };
  function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto'; // Reset height to auto to adjust dynamically
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the content
  }

  const handleTyping=(e)=>{
    setNewMessage(e.target.value);
    adjustTextareaHeight(e.target);

    ///typing indicator logic
    if(!socketConnected)return
    if(!typing)
    {
      setTyping(true)
      socket.emit("typing",id)
    }

    let lastTypingTime=new Date().getTime()
    var timeLength=10000;
    setTimeout(()=>{
      var TimeNow=new Date().getTime();
      var timeDiff=TimeNow-lastTypingTime;
      if(timeDiff>=timeLength && typing)
      {
        socket.emit('stop_typing',id)
        setTyping(false)
      }
    },timeLength)
  }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Message'} />
          <div className='singleChat'>
              <div className='chatBody flex-1' ref={chatBoxRef}>
              {messages &&
                    messages.map((message, index) => (
                      <>
                         {getChatDay(index) && ( 
                            <div className='chatDate'>
                              {new Date().toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }) === new Date(message.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }) ? 'Today' : new Date(Date.now() - 86400000).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }) === new Date(message.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }) ? 'Yesterday' : new Date(message.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </div>
                          )}

                        <div
                            key={index}
                            className="messageChat"
                            style={
                                message.receiver === null
                                    ? null
                                    : {
                                          justifyContent: 'flex-end',
                                          marginLeft: 'auto',
                                          marginBottom: '10px', // Add some bottom margin for spacing between messages
                                      }
                            }>
                            <div className='nameAdmin'>
                                <p className='text'>
                                    {message.receiver === null ? (
                                            <img className='rounded-circle' src={selectedUser.profile} alt='error' width={30} height={30}/>
                                            
                                    ) : null}
                                </p>
                                <div>
                                <div className={`talk-bubble tri-right round border ${message.receiver !== null ?'right-top':'left-top'} `} style={message.receiver !== null ?{backgroundColor:"rgb(116, 139, 253)"}:null}>
                                    <div className='talktext'><p>{message.content}</p></div>
                                                                      
                                </div>
                                    <div className='text'>{getTimeFromTimestamp(message.date)}</div>
                                </div>  
                                
                            </div>
                        </div>

                      </>
                     
                    ))}
                     
              </div>
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 50}}
                  />
                </div>
              ) : (
                <></>
              )}
              
              <div className='bottomSend'>
                
               
                    <textarea
                      maxLength={256}
                        value={newMessage}
                        onChange={(e) => {
                         handleTyping(e)
                        }}
                        className='inputbox textarea-autosize'
                        placeholder='   Enter Message ..'
                    />
                      <div  onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faPaperPlane} style={{fontSize:'25px'}} />
                      </div>
                  
              </div>
          </div>
                  
        </>
      )}
    </>
  );
};

export default Messages;

