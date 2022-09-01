import React , { useState, useEffect }from 'react';
import Modal from 'react-bootstrap/Modal';
import WarehouseItemDetails from './WarehouseItemDetails';
import axiosIstance from './../../Config/config';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

const WarehouseItems = ({show,close,wareHouseItems}) => {

   // const [wareHouseItems,wareHouseItems] = useState({})
   const [warehouseItem_detail, setWarehouseItem_detail] = useState({});
   const [warehouse_item_id,setWarehouse_item_id] = useState(0);
   const [showWarehouse_detail, setShowWarehouse_detail] = useState(false);

 
    const handleShow_warehouse_item = () => {
        setShowWarehouse_detail(true)
      };
      const handleClose_warehouse_item = () => {
        setShowWarehouse_detail(false)};
    

    return (
        <React.Fragment>
        <Modal show={show} onHide={close} size="md">
        <Modal.Header closeButton>
          <Modal.Title> testing  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table>
            <th>ID</th>
            <th>item Code</th>
            <th>description</th>
            <th>Price</th>
            <th>location</th>
            <th>Actions</th>
        {
                    wareHouseItems.map((item,index)=>{
                        return (
                            <tr key={index}>
                               <td>{item.id}</td>
                               <td>{item.item_code}</td>
							   <td>{item.description}</td>
                               <td>{item.retail_price}</td>
                               <td>{item.location}</td>
                               <td>
                                <div className='d-flex'>
                                <Button className='m-1' onClick={()=> {setWarehouse_item_id(item.id);handleShow_warehouse_item();}}>Details</Button>
                                </div>
                               </td>
                            </tr>
                        )
                    })
                }
            </Table> 
             
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">

        </Modal.Footer>
      </Modal>
      {showWarehouse_detail ?
        <WarehouseItemDetails warehouse_item_id={warehouse_item_id}   show={showWarehouse_detail} close={()=> handleClose_warehouse_item()} warehouseItem_detail={warehouseItem_detail} ></WarehouseItemDetails> : ''
      }
        </React.Fragment>
    );
}

export default WarehouseItems;
