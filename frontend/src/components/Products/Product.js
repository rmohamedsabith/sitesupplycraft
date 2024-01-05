import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
  const{model}=useSelector((state)=>state.productsFilteringState)


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
        <h5 className="card-title">
        <Link to={`/${model==='laborers'?'laborer':'product'}/${product._id}`}>{model==='laborers'?product.firstname+' '+product.lastname : product.name}</Link>
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
          </div>
          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
        </div>
        <p className="card-text">Rs.{product.price}{model!=='laborers'?<span style={{color:'red',textDecoration:'line-through',fontSize:'large',paddingLeft:'30px'}}>{product.discount>0?'Rs.'+product.discount:null}</span>:null}
</p>
          
         <Link to={`/${model==='laborers'?'laborer':'product'}/${product._id}`}><button id="view_btn" type='submit' className="btn btn-block">View Details</button></Link>
         
      </div>
    </div>
  </div>
  )
}

export default Product