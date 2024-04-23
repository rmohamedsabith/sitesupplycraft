import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faFacebook,faInstagram,faTwitter,faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { Container, Row,Col} from 'react-bootstrap'

const Footer = () => {
  return (
    <div className='footer'>
      <Container fluid={true}>
    <Row>
      <Col>
        <h3 className='info'>More information</h3>
        <p className='contact'>Phone:- +94762345665<br/>
          Email:- <a href={`mailto:${'info@sitesupplycraft.com'}`}>info@sitesupplycraft.com</a></p>
      </Col>

      <Col style={{textAlign:'right'}}>
       <div className="social-icons">
         <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faFacebook} />
         </a>
         <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faTwitter} />
         </a>
         <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faInstagram} />
         </a>
         <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faWhatsapp} />
         </a>
        </div>
      </Col>
    </Row>
        <Col>
          <center>
            Copy Right &copy; SiteSupplyCraft {new Date().getFullYear()}
            </center>
       </Col>
      </Container>
   </div>
  )
}

export default Footer