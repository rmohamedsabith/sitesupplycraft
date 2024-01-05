import React, { useEffect } from 'react'
import AddReview from '../Reviews/AddReview'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

  const {id}=useParams();

 

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