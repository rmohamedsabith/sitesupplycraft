import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { getProduct, reviews } from '../../actions/productActions'

const Product = ({product}) => {
  const{model}=useSelector((state)=>state.productsFilteringState)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleClick=async()=>{
    dispatch(getProduct(product._id))    
    navigate(`/${model==='laborers'?'laborer':'product'}/${product._id}`)
  }


  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 ">    
    <div className="card p-3 rounded">
    {model!=='laborers'?<span id="no_of_reviews" style={{fontSize:'small',marginLeft:'0',color:'#ff9933',textAlign:'right'}}>{"To "+product.type.replace(/\b\w/g, (char) => char.toUpperCase())}</span>:null}

      {(model==='laborers'?product.profile&&
        <img
          className="card-img-top mx-auto"
          src={product.profile} alt='error on profile'
        />
        
      :product.images&&
      <img
        className="card-img-top mx-auto"
        src={product.images[0].image} alt='error on product'
      />
      )}

      <div className="card-body d-flex flex-column">
      {model!=='laborers'?<span id="no_of_reviews" style={{fontSize:'x-small',marginLeft:'0'}}>{product.owner.shopName}</span>:<span id="no_of_reviews" style={{fontSize:'x-small',marginLeft:'0'}}>{product.job}</span>}
        <h5 className="card-title" onClick={handleClick}>
          {model==='laborers'?product.firstname+' '+product.lastname : product.name}
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
          </div>
          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
        </div>
        <p className="card-text">Rs.{product.price}{model!=='laborers'?<span style={{color:'red',textDecoration:'line-through',fontSize:'large',paddingLeft:'30px'}}>{product.discount>0?'Rs.'+product.discount:null}</span>:null}
</p>
          
         <button id="view_btn" type='submit' className="btn btn-block" onClick={handleClick}>View Details</button>
         
      </div>
    </div>
  </div>
  )
}

export default Product