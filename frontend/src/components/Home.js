import { MDBCol } from 'mdbreact'
import React, { useCallback, useEffect, useState } from 'react'
import Search from './Products/Search'
import ProductList from './Products/ProductsList'
import Side from '../components/Layouts/Side'
import SearchedProducts from './Products/SearchedProducts'
import { useLocation } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'




const Home = ({isDistrict,district,setDistrict,setIsDistrict,hide,isHumClicked,setIsHumClicked}) => {
   
    const location=useLocation()
    const [refreshSide, setRefreshSide] = useState(false);

    
  const handleClose = useCallback(() => setIsHumClicked(false),[setIsHumClicked])
  return (
    <div className='row'>
      {
        !hide?
        <MDBCol>
          <Side isDistrict={isDistrict} district={district} refreshSide={refreshSide}/>
        </MDBCol>:
        <Offcanvas show={isHumClicked} onHide={handleClose} style={{backgroundColor:'#176B87',color:'#ffff'}}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Side isDistrict={isDistrict} district={district} refreshSide={refreshSide}/>
          </Offcanvas.Body>
        </Offcanvas>
      }
      <MDBCol md={!hide?'10':null}>
      <Search setDistrict={setDistrict} setIsDistrict={setIsDistrict} district={district} setRefreshSide={setRefreshSide} refreshSide={refreshSide}/>
        {location.pathname==='/'?<ProductList/>:
        <SearchedProducts  district={district}/>}
      </MDBCol>
      

    </div>
  )
}

export default Home