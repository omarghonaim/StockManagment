import React , { useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import axiosIstance from './../../Config/config';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import SilpItemDetails from './Silp_Item_Details';
import WarehouseItems from './WarehouseItems';


const SilpDetails = ({show,handleClose,silp_id , warehouse_id,wareHouseItems}) => {

   const [silp_detail, setSilp_detail] = useState({})
   const [silp_items , setSilp_items] = useState([])
   ///////////////////////////////
   const [silp_items_detail, setSilp_items_detail] = useState(false)
   const [silp_item_id,setSilp_items_id] = useState(0)
   ////////////////////////////////////
   const [warehouseItems, setWarehouseItems] = useState(false)

   //////////////
   const handleClose_silp_item = () => {
    setSilp_items_detail(false)};

   const handleShow_silp_item = () => {
    setSilp_items_detail(true)
  };

////////////////////////
  const handleShow_warehouse_items = () => {
    setWarehouseItems(true)
  };
  const handleClose_warehouse_items = () => {
    setWarehouseItems(false)};



   const getSilpDetails =()=>{
    console.log('silp >id',silp_id)
    axiosIstance.get(`receivingSlips/${silp_id}`).then(response=>{
        setSilp_detail(response.data.data[0])
    })
   }

   const getSilpItems = () => {
    axiosIstance.post('receivingSlipItems/index',{warehouse_id : warehouse_id , receiving_slip_id :silp_id }).then((response) => {
      console.log('Received >>>',response)
      setSilp_items(response.data.data)
    })
   }

   useEffect(() => {
    getSilpDetails();
    getSilpItems();
   },[])
   
    return (
    <React.Fragment>
     <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> SilpDetails  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <p>silp_Id {silp_detail.id}</p>
            <p>PO_number {silp_detail.PO_number} - supplier_name {silp_detail.supplier_name} </p>
            
            <p> <span className={`badge ${silp_detail.status === 'Canceled' ? "text-bg-danger" : "text-bg-success"}`}>{silp_detail.status}</span></p>
          </div>
          <Button className='m-1' onClick={()=> {handleShow_warehouse_items();}}>add items to slip</Button>

          <div className="row px-5">
        <div className="col-12">
          <Table bordered hover size="lg">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>item_code</th>
                        <th>description</th>
                        <th>QTY</th>
                        <th>cost</th>
                        <th>total</th>
                        <th>Actions</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                    silp_items.map((item,index)=>{
                        return (
                            <tr key={index}>
                               <td>{item.id}</td>
                               <td>{item.item_code}</td>
                               <td>{item.description}</td>
                               <td>{item.QTY}</td>
                               <td>{item.cost}</td>
                               <td>{item.total}</td>
                               <td>
                                <div className='d-flex'>
                                  <Button className='m-1' onClick={()=> {setSilp_items_id(item.id);handleShow_silp_item();}}>Details</Button>

                                </div>
                               </td>
                            </tr>
                        )
                    })
                }

                    </tbody>
            </Table>
        </div>

          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">

        </Modal.Footer>
      </Modal>

      {silp_items_detail ?
        <SilpItemDetails id={silp_item_id}  show={silp_items_detail} close={()=> handleClose_silp_item()} ></SilpItemDetails> : ''
      }
      
      {warehouseItems ?
        <WarehouseItems   show={warehouseItems} close={()=> handleClose_warehouse_items()} wareHouseItems={wareHouseItems} ></WarehouseItems> : ''
      }

    </React.Fragment>
    );
}

export default SilpDetails;
