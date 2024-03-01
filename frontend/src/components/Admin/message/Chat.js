import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessageDetail from './MessageDetail'
import SearchInput from './SearchInput'
import { getMessagesList } from '../../../actions/messagesAction'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../../../slices/authSlice'
import { toast } from 'react-toastify'
import  './Messages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import MetaData from '../../Layouts/MetaData'

const Chat = () => {
  const {isLoading,datas,error}=useSelector((state)=>state.messagesState)    
  const [filterUser,setFilterUser]=useState(datas)  
  const [selectedUser,setSelectedUser]=useState(null)
   
 
  useEffect(()=>{
    if(error)
    {
      toast.error(error,{
        position:'bottom-center',
        onOpen:clearError()
      })
    }
  },[error])

  return (
    <>
      <MetaData title={'Messages'}/>
    <div className="chat">  {/* overflow-hidden flex sm:h-[450px] md:h-[550px] bg-black-500 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 */}
      <div className="messageBar pt-3">
        <SearchInput users={datas?datas:[]} setFilterUser={setFilterUser}/>
        <div className="divider"></div>
        <Messages filterUser={filterUser} setSelectedUser={setSelectedUser} />
      </div>
      <div className='chatContainer'>
        <div className='chatBox'>
          <h2>Chat Box</h2>
        </div>
        <div className='messageDetail'>
        {!selectedUser ? (
              <NoChatSelected />
            ) :
        <MessageDetail selectedUser={selectedUser}/>
        }
      </div>
      </div>
     
    </div>
    </>
  )
}

export default Chat

const NoChatSelected = () => {

return (
  <div className="noChat">
    <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
      <p>Welcome</p>
      <p>Select a chat to start messaging</p>
      <FontAwesomeIcon icon={faComments} className="text-3xl md:text-6xl text-center" style={{fontSize:'40px'}}/>
    </div>
  </div>
);
};