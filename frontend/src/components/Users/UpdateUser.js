import React from 'react'
import { useSelector } from 'react-redux'

const UpdateUser = () => {
  const{isLoading,user}=useSelector((state)=>state.authState)
  return (
    <div>UpdateUser</div>
  )
}

export default UpdateUser