import React, { useEffect, useRef } from 'react';
import './Message.css';
import back from '../../images/back.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { getUnreadMessages, sendMessage } from '../../actions/messagesAction';
import { getMessages } from '../../actions/messagesAction';
import MetaData from '../Layouts/MetaData';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import Lottie from 'react-lottie'
import animationData from '../../animation/lottie.json' 
import { ChatState } from '../../chatContex';


var socket,selectedChatCompare

const Messages = () => {
  const {notification,setNotification}=ChatState()
  const{unreadMessages}=useSelector((state)=>state.messagesState) 
  const { isLoading, messages:adminMsg } = useSelector((state) => state.messagesState);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [messages,setMessages]=useState([])
  const chatBoxRef = useRef(null);
  const[socketConnected,setSocketConnected]=useState(false)
  const[isTyping,setIstyping]=useState(false)
  const[typing,setTyping]=useState(false)  
  const [isOnline,setIsOnline]=useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(()=>{
    socket=io(process.env.REACT_APP_BACKEND_URL)
    socket.emit("setup",user)
    socket.on("connected",()=>setSocketConnected(true))
    socket.emit('join_chat',user._id)
    socket.emit("online",user._id)
    socket.on('online',()=>setIsOnline(true))
    socket.on('offline',()=>setIsOnline(false))
    socket.on('typing',()=>setIstyping(true))
    socket.on('stop_typing',()=>setIstyping(false))
    return () => {
      socket.disconnect(); // Cleanup socket connection on component unmount
      socket.emit("offline",user._id)
    };
  },[user])

  console.log(isOnline)
  
  useEffect(() => {
    /* dispatch(getMessages).then(()=>{
      }) */
      setMessages(adminMsg)
      selectedChatCompare=adminMsg
      
  }, []);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(()=>{
    socket.on("message_recieved",(newMsg)=>{
        if(!selectedChatCompare)
        {
          if(!notification.includes(newMsg))
          {
            setMessages((prev)=>[...prev, newMsg]);
          }
        }
        else{ 
          
          setMessages([...messages,newMsg])
        }
      
    })
  })

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      socket.emit('stop_typing',user._id)
      if(isOnline)dispatch(sendMessage({content:newMessage,isViewed:true}))
      else dispatch(sendMessage({content:newMessage}))
      socket.emit('new_message',({content:newMessage,date:new Date(),receiver:null,sender:user._id,user}));
      setMessages([...messages,{content:newMessage,date:new Date(),receiver:null,sender:user._id}])
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
      socket.emit("typing",user._id)
    }

    let lastTypingTime=new Date().getTime()
    var timeLength=10000;
    setTimeout(()=>{
      var TimeNow=new Date().getTime();
      var timeDiff=TimeNow-lastTypingTime;
      if(timeDiff>=timeLength && typing)
      {
        socket.emit('stop_typing',user._id)
        setTyping(false)
      }
    },timeLength)
  }

  const handleBack=()=>{
    dispatch(getUnreadMessages)
    navigate('/ProductOwner/DashBoard')    
  }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Message'} />
          <div className='_main'>
            <div onClick={handleBack}>
              <img src={back} className='im3' alt='back' />
            </div>
            <div className='body1'>
              <div className='app'>
                <div className='chat-screen'>
                  <div className='header'>
                    <div className='logo'>Chat Box</div>
                  </div>
                </div>
                <div className='messages' ref={chatBoxRef}>
                  {messages &&
                    messages.map((message, index) => (
                      <>
                         {getChatDay(index) && ( 
                            <div className='chat-day'>
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
                        className={
                          message.receiver !== null ? 'message msg' : 'message other-message'
                        }>
                        <div className='name'>
                          <p className='person'>{message.receiver === null ? 'You' : 'Admin'}</p>
                          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'-8px'}}>
                          <div style={{fontSize:'15px'}}>{message.content}</div>
                          <div className='text'>{getTimeFromTimestamp(message.date)}</div>
                          </div>
                        </div>
                        
                      </div>
                      </>
                     
                  ))}         
                </div>   
                {isTyping ? (
                  <div className="typing">
                      <Lottie
                        options={defaultOptions}
                        // height={50}
                        width={70}
                        style={{ marginBottom: 15, marginLeft: 0}}
                      />
                    </div>
                  ) : (
                    <></>
                  )}            

                <div className='typebox'>
                  <textarea
                   maxLength={256}
                    value={newMessage}
                    onChange={(e) => {
                      handleTyping(e)
                    }}
                    className='inputbox textarea-autosize'
                    placeholder='   Enter Message ..'
                  />
                  <button className='btnicon' onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} className='tt' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Messages;