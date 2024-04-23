import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../Layouts/MetaData'
import Loader from '../Loader'
import { toast } from 'react-toastify'
import {clearProductsError, getProducts } from '../../actions/productsActions'
import Product from './Product'
import Pagination from 'react-js-pagination'
import { ChatState } from '../../chatContex'


const ProductList = () => {
  const dispatch=useDispatch()
  const {currentPage,setCurrentPage}=ChatState()
  const {products,totalCount,count,error,isLoading,resPerPage}=useSelector((state)=>state.productsState)
  const{price,category,rating,model}=useSelector((state)=>state.productsFilteringState)
  /* const [currentPage,setCurrentPage]=useState(1) */


  const setCurrentPageNo=(pageNo)=>{
    setCurrentPage(pageNo)
  }

  /* useEffect(()=>{

    toast.success("welcome to Site Supply Craft",{
      position:toast.POSITION.BOTTOM_CENTER
    })
  },[]) */

  useEffect(()=>{ 
    if(error) {
        return toast.error(error,{
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: ()=> { dispatch(clearProductsError) }
        })
    } 
    dispatch(getProducts(null, price, category, rating,null,null, currentPage,model))
  }, [error,dispatch,currentPage,price,category,rating,model])
  return (
    <>
    {isLoading? <Loader/>:
       count>0?<div className='productlist'>
       <MetaData title={'Home'}/>
       <h1>{model==='products/sell'?'Buying Products':model==='products/rent'?'Hiring Products':model==='laborers'?'Laborers':'Products'}</h1>
       <div className='frames'>
      <section id="products" className="container mt-2">
        <div className="row">
         {products&&products?.map(product=>(
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
     </div>:<h2 style={{color:"red",textAlign:'center',padding:"100px"}}>There is no product</h2>
      
      
    }
    </>     
  
    
  )
}

export default ProductList