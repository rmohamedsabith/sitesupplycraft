import React, {useEffect, useState } from 'react'
import{MDBCol,MDBIcon}from'mdbreact'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../../actions/productsFilteringActions'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

const Search = ({setIsDistrict,setDistrict,district}) => {
  const {isLoading}=useSelector((state)=>state.productsState)
  const[keyword,setKeyword]=useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const[Districts,setDistricts]=useState([])
  const navigate=useNavigate();
  const dispatch=useDispatch()


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('/districts.json');
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error('Error fetching the file:', error);
      }
    };

    fetchData();
  },[])

 const handleChanges=(e)=>{
  setKeyword(e.target.value)
 }
 const handleSubmit=(e)=>{
  e.preventDefault();
  if((!keyword||keyword==='')&&(district===''||!district)) return navigate('/') 
  navigate(`/search/${keyword}`) 
  
 }

 // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
 const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span style={{cursor:'pointer',border:'2px solid #053B50',padding:'10px 30px',borderRadius:'10px',}}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </span>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
            !value || child.props.children.toLowerCase().startsWith(value.toLocaleLowerCase()),
          ).map((filteredChild)=>React.cloneElement(filteredChild))
          }
        </ul>
      </div>
    );
  },
);
const handleDistrictSelect = (district) => {
  if (district === '') setIsDistrict(false);
  else setIsDistrict(true);
  setDistrict(district);
  setSelectedDistrict(district)
};



  return (
    <div className='search'>
      
      <div className="form-check form-check-inline">
        
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="buy" value="Buy"  onChange={(e)=>{
          dispatch(filter(null,null,null,null,'products/sell'))
          }}/>
        <label className="form-check-label" htmlFor="buy">
          Buy
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="rent" value="Rent" onChange={(e)=>{
          
          dispatch(filter(null,null,null,null,'products/rent'))
          }} />
        <label className="form-check-label" htmlFor="rent">
          Rent
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="laborers" value="Laborers" onChange={(e)=>{
      
          dispatch(filter(null,null,null,null,'laborers'))
          }}/>
        <label className="form-check-label" htmlFor="laborers">
          Laborers
        </label>
      </div>
      
      {/* search bar */}

      <div className='bar'>
        <div className="row">
        <form className='d-flex  justify-content-center' onSubmit={handleSubmit}>
          <MDBCol md="7">
            <div className="input-group md-form form-sm form-1 pl-0">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ backgroundColor: '#053B50' }} id="basic-text1">
                  <MDBIcon className="text-white" icon="search" />
                </span>
              </div>
              <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={(e)=>handleChanges(e)}
                value={keyword?keyword:''}
              />
            </div>
          </MDBCol>
          <MDBCol className="align-self-center">            
              <Dropdown onSelect={handleDistrictSelect}>
                 <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  {selectedDistrict||'Select a District'}
                 </Dropdown.Toggle>              
                 <Dropdown.Menu as={CustomMenu}>
                  
                   <Dropdown.Item eventKey="">Select a District</Dropdown.Item>
                   {Districts.map((District)=>{
                    return(<Dropdown.Item key={District.district} eventKey={District.district}>{District.district}</Dropdown.Item>)
                   })}
                   
                   
                 </Dropdown.Menu>
               </Dropdown>
            
          </MDBCol>
          
          <MDBCol>
            <button type="submit" className="btn btnstyle" disabled={isLoading}>
              Search
            </button>
          </MDBCol>
          </form>
        </div>
      </div>

  </div>
  )
}

export default Search