import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";

import useFetchSlipItems from "../../hooks/useFetchSlipItems";
import UpdateSlipItemModal from "./UpdateSlipItemModal";
import axiosInstance from "../../Config/config";

function SlipItems({ warehouseId, receivingSlipId, refreshSlipItems }) {
  const { slipItems, isLoadingItems, refresh } = useFetchSlipItems(
    warehouseId,
    receivingSlipId
  );

  useEffect(() => {
    if (refreshSlipItems !== 0) {
      refresh();
    }
  }, [refreshSlipItems]);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  const hideUpdateModalHandler = (wasUpdated) => {
    setItemToUpdate(null);
    if (wasUpdated) refresh();
  };

  const deleteItem = (id) => {
    const cancelItem = {
      _method: "put",
      receivingSlip_item_id: id,
    };

    axiosInstance
      .post("receivingSlipItems/delete", cancelItem)
      .then((response) => {
        console.log("delete", response);
        refresh();
      })
      .catch(() => {});
  };

  return (
    <>
      {itemToUpdate && (
        <UpdateSlipItemModal
          itemToUpdate={itemToUpdate}
          hideModalAndRefresh={hideUpdateModalHandler}
        />
      )}
      {isLoadingItems ? (
        <Spinner
          as="span"
          animation="border"
          size="md"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <>
          {slipItems && slipItems.length > 0 && (
            <div className="row px-5">
              <div className="col-12">
                <caption>items</caption>

                <Table bordered hover size="lg" className="bg-white">
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
                    {slipItems.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.item_code}</td>
                          <td>{item.description}</td>
                          <td>{item.QTY}</td>
                          <td>{item.cost}</td>
                          <td>{item.total}</td>
                          <td>
                            <div className="d-flex">
                              <Button
                                className="m-1"
                                onClick={() => {
                                  setItemToUpdate(item);
                                }}
                              >
                                Update
                              </Button>

                              <Button
                                className="m-1"
                                onClick={() => {
                                  deleteItem(item.id);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SlipItems;
