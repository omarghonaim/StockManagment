import React , { useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import axiosIstance from './../../Config/config';


const SilpDetails = ({show,handleClose,id}) => {

   const [silp_detail, setSilp_detail] = useState({})
     
   const getSilpDetails =()=>{
    console.log('silp >id',id)
    axiosIstance.get(`receivingSlips/${id}`).then(response=>{
        setSilp_detail(response.data.data[0])
    })
   }

   useEffect(() => {
    getSilpDetails()
   },[])
   
    return (
     <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> SilpDetails {silp_detail.PO_number} {silp_detail.id} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
 
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">

        </Modal.Footer>
      </Modal>
            
    );
}

export default SilpDetails;
