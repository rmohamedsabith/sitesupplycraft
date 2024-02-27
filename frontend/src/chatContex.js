import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnreadMessages } from "./actions/messagesAction";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const{user}=useSelector((state)=>state.authState)
  const [notification, setNotification] = useState([]);
  const dispatch=useDispatch()
  const [users,setUsers]=useState([])

  useEffect(()=>{
    //if(user.role==='Product Owner')dispatch(getUnreadMessages)
  },[])

  return (
    <ChatContext.Provider
      value={{       
        notification,
        setNotification,
        users,setUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;