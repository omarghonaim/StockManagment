import React , { useState, useEffect} from 'react';
import axiosIstance from './../../Config/config';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const WarehouseItemDetails = ({show,close,warehouse_item_id}) => {
    const [warehouseItem_detail,setWarehouseItem_detail] = useState({});

    const getWarehouseItemDetails =()=>{
        axiosIstance.get(`receivingSlipItems/getWarehouseItems/${warehouse_item_id}`).then(res=>{
          setWarehouseItem_detail(res.data.data[0])
        })
      }
      
      useEffect(() => {
        getWarehouseItemDetails()
      },[])

    return (
    <React.Fragment>
     <Modal show={show} onHide={close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Item Warehouse Details  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
          </div>
          <div className="row px-5">
        <div className="col-12">
          <Table bordered hover size="lg">
                 <tr>
                    <th>Item Code</th>
                    <td>{warehouseItem_detail.item_code}</td>
                </tr>
                <tr>
                    <th>description </th>
                    <td>{warehouseItem_detail.description}</td>
                </tr>
                <tr>
                    <th>QTY</th>
                    <td>{warehouseItem_detail.QTY}</td>
                </tr>
                <tr>
                    <th>location</th>
                    <td>{warehouseItem_detail.location}</td>
                </tr>
                <tr>
                    <th>last Cost</th>
                    <td>{warehouseItem_detail.last_cost}</td>
                </tr>
                <tr>
                    <th>AVG Cost</th>
                    <td>{warehouseItem_detail.AVG_cost}</td>
                </tr>
                <tr>
                    <th>retail Price</th>
                    <td>{warehouseItem_detail.retail_price}</td>
                </tr>
                        </Table>
        </div>

          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">

        </Modal.Footer>
      </Modal>
    </React.Fragment>
    );
}

export default WarehouseItemDetails;
