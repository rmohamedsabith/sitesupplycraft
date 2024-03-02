import React, {useState } from 'react'
import { Button, Modal,Form} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { useParams } from'react-router-dom'
import { addReview } from '../../actions/productActions'

const AddReview = () => {
  const {model}=useSelector((state)=>state.productsFilteringState)
  
  const [show, setShow] = useState(false);
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState('')
  const {id}=useParams()
  const dispatch=useDispatch()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit=()=>{
    setShow(false)
    let type
    if(model!=='laborers')type='product'
              else type='laborer'
    dispatch(addReview(id,rating,comment,type))      
  }

  return (
    <>
      <span style={{fontStyle:'italic',textDecoration:'underline',cursor:'pointer',color:'#FF5F00',fontWeight:'bolder'}} onClick={handleShow}>
        Add Review
      </span>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <ul className="stars" >
          {
              [1,2,3,4,5].map(star => (
                  <li 
                  key={star}
                  value={star}
                  onClick={()=>setRating(star)}
                  className={`star`}
                  ><i className={`fa fa-star`} style={{color:`${star<=rating?'orange':''}`}}></i></li>
              ))
              
              
          }  
                 
          </ul>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Your Comment</Form.Label>
              <Form.Control as="textarea" value={comment} onChange={(e)=>setComment(e.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" style={{border:'none'}} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" style={{border:'none'}} onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddReview