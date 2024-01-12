import React, { useEffect, useState } from 'react'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider'
import Tolltip from'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faStar} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import {filter} from '../../actions/productsFilteringActions'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

const Side = ({isDistrict,district}) => {
  const {model}=useSelector((state)=>state.productsFilteringState)

  const dispatch=useDispatch()
  const{isLoading}=useSelector((state)=>state.productsState)

  const[price,setPrice]=useState([1,100000]);
  const[priceChange,setPriceChanged]=useState(price);
  const[category,setCategory]=useState(null);
  const[rating,setRating]=useState(0);
  const[city,setCity]=useState("");
  
 useEffect(()=>{
  dispatch(filter(priceChange,rating,category,city,model))
 },[dispatch,priceChange,rating,category,city])

 const [selectedCity, setSelectedCity] = useState('');
 const[Districts,setDistricts]=useState([])



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
   setSelectedCity('')
   setCity('')
 },[district])

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
 <span style={{cursor:'pointer',border:'2px solid #053B50',padding:'10px 20px',borderRadius:'10px',}}
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
const handleCitySelect = (city) => {
 setCity(city);
 setSelectedCity(city)
};

  

  const Categories=[
    'Masonry',
    'Metal',
    'Wood',
    'Plastics',
    'Glass',
    'Electrical',
    'Paints',
    'Tiles',
    'Machines',
    'Tools',
    'Plumbing'
  ]

  const jobs=[
    'Electrician',
    'Plumber',
    'Painter',
    'Tiles',
    'A/C Repair',
    'LandScaping',
    'Engineer',
    'Capenders',
    'Curtain',
    'Cleaner',
    'Concerete Slap',
    'Interior Designer',
    'Movers',
    'CCTV Technician',
    'Cieling',
    'Architect',
    'Contractors'
  ]

  return (
    <div className='side'>    
      <div>
          {/* Categories */}
          <h4>Categories</h4>        
              <span
               className={`d-block ${category===null?'selectedCategory':''}`} 
               style={{cursor:'pointer', paddingBottom:'5px'}}  disabled={isLoading} onClick={()=>{
                    setCategory(null)
                  }}>All</span>
            {model!=='laborers'? Categories.map(
              cat=>(            
                  <span className={`d-block ${category===cat?'selectedCategory':''}`} key={cat} style={{cursor:'pointer', paddingBottom:'5px'}} id={cat} disabled={isLoading} onClick={()=>{
                    setCategory(cat)
                  }}>{cat}</span>
          
              ))
              : jobs.map(
              job=>(
                <span className={`d-block ${category===job?'selectedCategory':''}`} key={job} style={{cursor:'pointer', paddingBottom:'5px'}} id={job} disabled={isLoading} onClick={()=>{
                  setCategory(job)
                }}>{job}</span>
              )
            )}
      </div>
      <hr/>
      <div>
          {/* price filter */}
          <h4>Price</h4>
          <div className='mb-5 px-4' onMouseUp={()=>setPriceChanged(price)}>
          <Slider 
          range={true}
          marks={
            {
              1:"Rs1",
              100000:"Rs100000"
            }
          }
          min={1}
          max={100000}
          defaultValue={price}
          onChange={(price)=>{
            setPrice(price)
          }}
          handleRender={
            renderProps=>{
              return (
                <Tolltip overlay={`Rs${renderProps.props['aria-valuenow']}`}>
                  <div {...renderProps.props}></div>
                </Tolltip>
              )
            }
          }
          trackStyle={{ backgroundColor: 'yellow' }}
         
          />
          </div>                  
      </div>
      {isDistrict?<div>
          <h4>Hometown</h4><br/>
            
            <Dropdown onSelect={handleCitySelect}>
                 <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  {selectedCity||'Select a City'}
                 </Dropdown.Toggle>              
                 <Dropdown.Menu as={CustomMenu}>
                  
                   <Dropdown.Item eventKey="">Select a City</Dropdown.Item>
                   {
                    Districts.map((District)=>{
                      if(District.district===district)
                      { 
                        return (District.cities.map((city,index)=>{
                          return(<Dropdown.Item key={index} eventKey={city}>{city}</Dropdown.Item>)
                         }))
                      }                  
                   })
                  
                   }                   
                 </Dropdown.Menu>
            </Dropdown>
          </div>:null}

      {/* Ratings */}                
      <div>
         <br/> <h4>Ratings</h4>
          <ul className="pl-0">
          {[5,4,3,2,1,0].map(star =>
            <li
            style={{
                cursor:"pointer",
                listStyleType: "none"
            }}
            key={star}
            onClick={()=>{
               setRating(star)
            }}
            >             
              {star===0?<FontAwesomeIcon icon={faStar}/>
                :Array.from({ length: star }).map((_, index) => (
               <FontAwesomeIcon style={{color:'#f8ce0b'}} icon={faStar} key={index} className={`${rating===star?'selectedRating':null}`} />
              ))
              }                         
            </li>
          ) }        
          </ul>              
      </div>
    </div>  
  )
}


export default Side