import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axiosIstance from "./../../Config/config";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

const SilpItemDetails = ({ id, show, close }) => {
  const [silpItem, setSilpItem] = useState({});

  const getItemDetails = () => {
    axiosIstance.get(`receivingSlipItems/${id}`).then((res) => {
      setSilpItem(res.data.data[0]);
    });
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <React.Fragment>
      <Modal show={show} onHide={close} size="md">
        <Modal.Header closeButton>
          <Modal.Title> {silpItem.description} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tr>
              <th>Item_Code</th>
              <td>{silpItem.item_code}</td>
            </tr>
            <tr>
              <th>status</th>
              <td>{silpItem.status}</td>
            </tr>
            <tr>
              <th>created_at</th>
              <td>{silpItem.created_at}</td>
            </tr>
            <tr>
              <th>QTY</th>
              <td>{silpItem.QTY}</td>
            </tr>
            <tr>
              <th>cost</th>
              <td>{silpItem.cost}</td>
            </tr>
            <tr>
              <th>total</th>
              <td>{silpItem.total}</td>
            </tr>
          </Table>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default SilpItemDetails;
