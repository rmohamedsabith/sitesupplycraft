import React, { useRef,useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../../actions/authActions'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import MetaData from '../Layouts/MetaData'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import profile from '../../images/default_avatar.png'
import Loader from '../Loader'
import { Modal, Button } from 'react-bootstrap'
import PinLocation from '../Google maps/PinLocation';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PinLocation/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Add</Button>
      </Modal.Footer>
    </Modal >
  );
}

const UpdateUser = () => {
  return (
    <div>UpdateUser</div>
  )
}

export default UpdateUser