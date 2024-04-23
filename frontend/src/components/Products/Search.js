import React, {useEffect, useState } from 'react'
import{MDBIcon}from'mdbreact'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../../actions/productsFilteringActions'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { Row,Col } from 'react-bootstrap'
import { clearProducts } from '../../slices/productsSlice'
import { ChatState } from '../../chatContex'


const Search =React.memo( ({setIsDistrict,setDistrict,district,setRefreshSide,refreshSide}) => {
  const {isLoading}=useSelector((state)=>state.productsState)
  const {model}=useSelector((state)=>state.productsFilteringState)
  const[keyword,setKeyword]=useState(null)
  const {currentPage,setCurrentPage}=ChatState()
  

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
 
    if(Districts.length===0)fetchData();
  },[Districts])

 const handleChanges=(e)=>{
  setKeyword(e.target.value)
 }
 const handleSubmit=(e)=>{
  e.preventDefault();
  if((keyword===null||keyword==='')&&(district===''||!district)) return navigate('/') 
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
};

const handleType=async (model)=>{
  setKeyword(null)
  setRefreshSide(!refreshSide);
  await dispatch(clearProducts())
  setCurrentPage(1)
  dispatch(filter(null,null,null,null,model))
  setDistrict('')  
  setIsDistrict(false) 
  navigate('/') 
   
}
  return (
    <div className='search'>
     
      <div className="form-check form-check-inline p-3">
        
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="buy" value="Buy" checked={model==='products/sell'?true:false}  onChange={(e)=>{handleType('products/sell')}}/>
        <label className="form-check-label" htmlFor="buy">
          Buy
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" checked={model==='products/rent'?true:false} name="flexRadioDefault" id="rent" value="Rent" onChange={(e)=>{handleType('products/rent')}} />
        <label className="form-check-label" htmlFor="rent">
          Rent
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" checked={model==='laborers'?true:false} name="flexRadioDefault" id="laborers" value="Laborers" onChange={(e)=>{ handleType('laborers')}}/>
        <label className="form-check-label" htmlFor="laborers">
          Laborers
        </label>
      </div>    
      
      {/* search bar */}

      <div className='bar'>
       <Row>
        <form  onSubmit={handleSubmit}>
          <Col>
            <div className="input-group md-form form-sm form-1 pl-0 searchBar">
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
          </Col>
          
          <Col className="align-self-center" md='auto'>            
              <Dropdown onSelect={handleDistrictSelect}>
                 <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  {district===''?'Select a District':district}
                 </Dropdown.Toggle>              
                 <Dropdown.Menu as={CustomMenu}>
                   <Dropdown.Item eventKey="" active={district===''}>Select a District</Dropdown.Item>
                   {Districts.map((District)=>{
                    return(<Dropdown.Item key={District.district} active={district===District.district} eventKey={District.district}>{District.district}</Dropdown.Item>)
                   })}        
                   
                 </Dropdown.Menu>
               </Dropdown>
            
          </Col>
          
          <Col xs lg="2">
            <button type="submit" className="btn btnstyle" disabled={isLoading}>
              Search
            </button>
          </Col>
          
          </form>
        </Row>
      </div>

  </div>
  )
}
)
export default Search