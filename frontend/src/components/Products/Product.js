import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { getProduct,} from '../../actions/productActions'

const Product = ({product}) => {
  const{model}=useSelector((state)=>state.productsFilteringState)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleClick=async()=>{
    let type
    if(model!=='laborers')type='product'
              else type='laborer'
    await dispatch(getProduct(product._id,type))    
    navigate(`/product/${product._id}`)
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 " style={{cursor:'pointer'}} onClick={handleClick}>    
    <div className="card p-3 rounded" style={{minWidth:'220px'}}>
    {model !== 'laborers' && product.type ? (
      <span id="no_of_reviews" style={{ fontSize: 'small', marginLeft: '0', color: '#ff9933', textAlign: 'right' }}>
        {"To " + product.type.replace(/\b\w/g, (char) => char.toUpperCase())}
      </span>
    ) : null}

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
      {model!=='laborers'?
      <span id="no_of_reviews" style={{fontSize:'x-small',marginLeft:'0'}}>{product.owner?.shopName}</span>:<span id="no_of_reviews" style={{fontSize:'x-small',marginLeft:'0'}}>{product.job}</span>}
        <h5 className="card-title">
          {model==='laborers'?product.firstname+' '+product.lastname : product.name}
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width:`${product.ratings/ 5 * 100}%`}}></div>
          </div>
          <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
        </div>
        <p className="card-text" style={{fontSize:'20px'}}>Rs.{product.price}{model!=='laborers'?<span style={{color:'red',textDecoration:'line-through',fontSize:'large',paddingLeft:'30px'}}>{product.discount>0?'Rs.'+product.discount:null}</span>:<span>  {product.priceType}</span>}
</p>
          
         {/* <button id="view_btn" type='submit' className="btn btn-block" style={{border:'none'}}>View Details</button> */}
         
      </div>
    </div>
    </div>
  )
}

export default Product