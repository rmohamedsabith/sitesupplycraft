import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import MetaData from '../Layouts/MetaData'
import Product from './Product'
import Pagination from 'react-js-pagination'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productsActions'
import { useParams } from 'react-router-dom'
import FilterMap from '../Google maps/FilterMap'
import { ChatState } from '../../chatContex'


const SearchedProducts = ({district}) => {
  const {currentPage,setCurrentPage}=ChatState()
    const dispatch=useDispatch()    
    const {products,totalCount,count,error,isLoading,resPerPage}=useSelector((state)=>state.productsState)
    const{price,category,rating,city,model}=useSelector((state)=>state.productsFilteringState)
    /* const [currentPage,setCurrentPage]=useState(1) */
    const{keyword}=useParams();
    
   
  const setCurrentPageNo=(pageNo)=>{
    setCurrentPage(pageNo)
  }
 
  useEffect(()=>{
    if(error) {
        return toast.error(error,{
            position: toast.POSITION.BOTTOM_CENTER
        })
    }  
      
  dispatch(getProducts(keyword!=='null'?keyword:null, price, category, rating,city,district, currentPage,model)) 
  }, [error,dispatch,currentPage,keyword,price,category,rating,city,district,model])

  return (
    <>
    
    {isLoading? <Loader/>:      
      count>0?
        <div className='productlist'>
        <MetaData title={'Search'}/>
        <h1>Searched {model==='products/sell'?'Buying Products':model==='products/rent'?'Hiring Products':model==='laborers'?'Laborers':'Products'}</h1>
        <FilterMap/>
        <div className='frames'>
       <section id="products" className="container mt-2">
         <div className="row">
          {products&&products.map(product=>(
            <Product key={product._id} product={product}/>
          ))}
         </div>
       </section>
       <div className='d-flex justify-content-center mt-5'>
        {totalCount&&totalCount>resPerPage?
          <Pagination
          activePage={currentPage}
          onChange={setCurrentPageNo}
          totalItemsCount={totalCount}
          itemsCountPerPage={resPerPage}
          nextPageText={'Next'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass={'page-item'}
          linkClass={'page-link'}
          />
          
          :null      
        }
       </div>
        </div>
      </div>
      :<h2 style={{color:"red",textAlign:'center',padding:"100px"}}>There is no product</h2>
    }
    </>   
  )
}

export default SearchedProducts