import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../../Config/config";

function UpdateSlipItemModal({ itemToUpdate, hideModalAndRefresh }) {
  const [updatedItemData, setUpdatedItemData] = useState(itemToUpdate);

  const updateSlipItem = () => {
    let update = {
      _method: "put",
      receivingSlip_item_id: updatedItemData.id,
      QTY: parseInt(updatedItemData.QTY),
    };

    axiosInstance
      .post("receivingSlipItems/update", update)
      .then((response) => {
        console.log("update res", response);
        //   handleClose_update_item();
        hideModalAndRefresh(true);
      })
      .catch(() => {
        hideModalAndRefresh(false);
      });
  };

  return (
    <Modal show={true} onHide={() => hideModalAndRefresh(false)} size="md">
      <Modal.Header closeButton>
        <Modal.Title> update item from slip </Modal.Title>
      </Modal.Header>
      <Modal.Body className="row justify-content-center align-item-center">
        <div class="mb-3">
          <label for="qty" class="form-label">
            Quantity
          </label>
          <input
            type="text"
            class="form-control"
            id="qty"
            value={updatedItemData.QTY}
            onInput={(e) => {
              setUpdatedItemData({ ...updatedItemData, QTY: e.target.value });
            }}
          ></input>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-space-between">
          <Button className="m-1 btn-success" onClick={updateSlipItem}>
            update
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateSlipItemModal;
