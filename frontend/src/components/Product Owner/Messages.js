import React, { useEffect, useRef } from 'react';
import './Message.css';
import back from '../../images/back.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { sendMessage } from '../../actions/messagesAction';
import { getMessages } from '../../actions/messagesAction';
import MetaData from '../Layouts/MetaData';
import { toast } from 'react-toastify';

const Messages = () => {
  const { isLoading, messages } = useSelector((state) => state.messagesState);
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getMessages);
  }, [dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      dispatch(sendMessage(null, user.role, newMessage));
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={'Message'} />
          <div className='_main'>
            <Link to='/ProductOwner/DashBoard'>
              <img src={back} className='im3' alt='back' />
            </Link>
            <div className='body1'>
              <div className='app'>
                <div className='chat-screen'>
                  <div className='header'>
                    <div className='logo'>Chat Box</div>
                  </div>
                </div>
                <div className='messages'>
                  {messages &&
                    messages.map((message, index) => (
                      <div
                        key={index}
                        ref={index === messages.length - 1 ? messagesEndRef : null}
                        className={
                          message.receiver === null ? 'message msg' : 'message other-message'
                        }>
                        {getChatDay(index) && ( 
                          <div className='chat-day'>
                            {new Date(message.date).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            
                            })}
                          </div>
                        )}
                        <div className='name'>
                          <p className='person'>{message.receiver === null ? 'You' : 'Admin'}</p>
                          {message.content}
                        </div>
                        <div className='text'>{getTimeFromTimestamp(message.date)}</div>
                      </div>
                    ))}
                </div>
                <div className='typebox'>
                  <input
                    type='text'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='inputbox'
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
