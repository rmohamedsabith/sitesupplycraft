import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"


const ProductReviews = () => {
    const{reviews=[]}=useSelector((state)=>state.productState)
  return (
    <>
    <h2 style={{textDecoration:'underline'}}>Reviews</h2>
    {
        reviews.map((review,index)=>(
            <div key={index} className="d-flex">
            <Container key={review._id} className="review" fluid={true}>
                <Row>
                    <Col>
                        <img src={(review.user?.normal?.profile || review.user?.googleUser?.profile)??'../../images/default_avatar.png'} style={{width:'30px',height:'30px',objectFit: 'cover'}} className='rounded-circle' alt='profile'/>
                        <span style={{fontSize:'12px',paddingLeft:'20px'}}>{review.user?.normal?review.user.normal.firstname+" "+review.user.normal.lastname:review.googleUser?.name}</span>
                    </Col>
                    <Col style={{textAlign:'right'}}>
                        <span style={{fontSize:'12px',paddingLeft:'20px'}}>{review.date.slice(0,10)}</span>
                    </Col>
                </Row>
                <Row>                    
                    <div className="ratings mt-auto">
                      <div className="rating-outer">
                        <div className="rating-inner" style={{width:`${review.rating/ 5 * 100}%`}}></div>
                      </div>
                    </div> 
                </Row>
                <Row>
                    <p>
                        {review.comment}
                    </p>
                </Row>
            </Container>
            </div>
            
        ))
    }
    </>
  )
}

export default ProductReviews