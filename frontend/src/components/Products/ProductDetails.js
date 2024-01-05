import React, { useEffect } from 'react'
import AddReview from '../Reviews/AddReview'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearProductsError, getProduct } from '../../actions/productsActions'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const{isLoading,product,error}=useSelector((state)=>state.productsState)
  const dispatch=useDispatch()

  const {id}=useParams();

  useEffect(()=>{
    if(error) {
      return toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: ()=> { dispatch(clearProductsError) }
      })
  }
  dispatch(getProduct(id))
  },[dispatch,error,id])

 

  return (
    <>
      <div className='card' style={{height:'50%',width:'80%',margin:'30px 80px',borderRadius:'20px'}}>
        <div className='card'>

        </div>
      </div>
       <AddReview/>
    </>
  )
}

export default ProductDetails