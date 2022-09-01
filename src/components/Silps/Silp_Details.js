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
   ////////////////////////////////
   const [cancel_item,setcancel_item] = useState(false)
   const [show_upadate,setshow_upadate] = useState(false)
   const [update_item,setupdate_item] = useState({})

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


//////////////////////////////////
const handleClose_update_item = () => {
  setupdate_item({});
  setshow_upadate(false)
}

 const handleShow_update_item = (item) => {
  console.log('asd')
  setupdate_item(item);
  setshow_upadate(true)
};

  const cancel_item_from_silp = ()=>{

    let cancel_item ={
      _method : 'put',
      receivingSlip_item_id : silp_item_id
    }

    axiosIstance.post('receivingSlipItems/delete',cancel_item).then((response)=>{
      console.log('delete',response)
      setcancel_item(false);
      getSilpItems()
    })

  }

  const update_silp_item = () => {
      let update = {
        _method : 'put',
        receivingSlip_item_id : update_item.id,
        QTY : parseInt(update_item.QTY)
      }

      console.log('put',update)

      axiosIstance.post('receivingSlipItems/update',update).then((response)=>{
        console.log('update',response)
        handleClose_update_item()
        getSilpItems()
      })
  }



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

                                  <Button className='m-1' onClick={()=> {handleShow_update_item(item)} }> Update </Button>

                                  <Button className='m-1' onClick={()=>{setSilp_items_id(item.id);setcancel_item(true)}}>Cancel</Button>

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


      <Modal show={cancel_item} onHide={()=> setcancel_item(false)} size="md">
        <Modal.Header closeButton>
           <Modal.Title> delete item from silp </Modal.Title>
        </Modal.Header>
        <Modal.Body className='row justify-content-center align-item-center'>
           are you sure you want to delete this item ?
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-space-between">
            <Button className='m-1 btn-success' onClick={()=> {cancel_item_from_silp()}}>Yes</Button>
            <Button className='m-1 btn-danger' onClick={()=> {setcancel_item(false)}}>No</Button>
          </div>
        </Modal.Footer>
      </Modal>


      <Modal show={show_upadate} onHide={handleClose_update_item} size="md">
        <Modal.Header closeButton>
           <Modal.Title> update item from silp </Modal.Title>
        </Modal.Header>
        <Modal.Body className='row justify-content-center align-item-center'>
        <div class="mb-3">
          <label for="qty" class="form-label">Email address</label>
          <input type="text" class="form-control" id="qty" value={update_item.QTY} onInput={(e)=>{setupdate_item({...update_item,QTY :e.target.value })}}  ></input>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-space-between">
            <Button className='m-1 btn-success' onClick={()=> {update_silp_item()}}>update</Button>
          </div>
        </Modal.Footer>
      </Modal>


   
    </React.Fragment>
    );
}

export default SilpDetails;
