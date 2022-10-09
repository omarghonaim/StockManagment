import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import WarehouseItemDetails from "./WarehouseItemDetails";
import axiosIstance from "./../../Config/config";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

const WarehouseItems = ({
  show,
  wareHouseItems,
  slipId,
  closeModal,
  itemAddedListener,
}) => {
  // const [wareHouseItems,wareHouseItems] = useState({})
  const [warehouseItem_detail, setWarehouseItem_detail] = useState({});
  const [warehouse_item_id, setWarehouse_item_id] = useState(0);
  const [showWarehouse_detail, setShowWarehouse_detail] = useState(false);
  const [show_Add, setShow_Add] = useState(false);
  const [add_item, setadd_item] = useState({});

  const handleShow_warehouse_item = () => {
    setShowWarehouse_detail(true);
  };
  const handleClose_warehouse_item = () => {
    setShowWarehouse_detail(false);
  };

  const addItemToSlip = () => {
    let add = {
      receiving_slip_id: slipId,
      warehouse_id: add_item.warehouse_id,
      warehouse_item_id: add_item.id,
      QTY: add_item.QTY,
      cost: add_item.stock_cost,
    };

    axiosIstance.post("receivingSlipItems/store", add).then((response) => {
      console.log(response);
      setShow_Add(false);
      itemAddedListener();
    });
  };

  useEffect(() => {
    console.log("WarehouseItems>>>>>>", wareHouseItems);
  }, []);

  return (
    <React.Fragment>
      <Modal show={show} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> WarehouseItems </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <th>ID</th>
              <th>item Code</th>
              <th>description</th>
              <th>Price</th>
              <th>location</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {wareHouseItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.item_code}</td>
                    <td>{item.description}</td>
                    <td>{item.retail_price}</td>
                    <td>{item.location ? item.location : "---"}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          className="m-1"
                          onClick={() => {
                            setWarehouse_item_id(item.id);
                            handleShow_warehouse_item();
                          }}
                        >
                          Details
                        </Button>
                        <Button
                          className="m-1"
                          onClick={() => {
                            setShow_Add(true);
                            setadd_item(item);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
      </Modal>
      {showWarehouse_detail ? (
        <WarehouseItemDetails
          warehouse_item_id={warehouse_item_id}
          show={showWarehouse_detail}
          close={() => handleClose_warehouse_item()}
          warehouseItem_detail={warehouseItem_detail}
        ></WarehouseItemDetails>
      ) : (
        ""
      )}

      <Modal show={show_Add} onHide={() => setShow_Add(false)}>
        <Modal.Header closeButton>
          <Modal.Title>add Item </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label for="number" class="form-label">
              QTY
            </label>
            <input
              type="number"
              class="form-control"
              id="number"
              placeholder="Enter QTY"
              onChange={(e) => {
                setadd_item({ ...add_item, QTY: e.target.value });
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              addItemToSlip();
              closeModal();
            }}
          >
            add
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default WarehouseItems;
