import React, { useState, useEffect } from "react";
import axiosIstance from "../Config/config";
import { useParams } from "react-router";
import Header from "../Header";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactLoader from "react-loader";
import SilpDetails from "../components/Silps/Silp_Details";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const WarehouseDetails = () => {
  const [loader, setLoader] = useState(true);
  const [warehouse, setWarehouse] = useState({});
  const [items, setItems] = useState([]);
  const [warehouse_Item, setWarehouse_Item] = useState({});
  const [show_item, setShow_item] = useState(false);
  const [show_item_list, setShow_item_list] = useState(false);
  const [MasterFile_Items, setMasterFile_Items] = useState([]);
  const [attach_Item_Form, setAttach_Item_Form] = useState({
    warehouse_id: "",
    item_code: "",
  });
  const [show_Location, setShow_Location] = useState(false);
  const [search_result, setSearch_result] = useState("");
  ////////////////////////////////////////////////////////////////
  const [silps, setSilps] = useState([]);
  const [silp_detail, setSilp_detail] = useState(false);
  const [silp_detail_id, setSilp_detail_id] = useState(0);
  const [slip, setSlip] = useState({});
  const [add_slip, setAdd_slip] = useState(false);
  ////////////////////////////////////////

  const handleClose = () => {
    setWarehouse_Item({});
    setShow_item(false);
  };

  const handleShow = (id) => {
    getWarehouse_Item(id);
    setShow_item(true);
  };

  const handleClose_List = () => {
    setSearch_result("");
    setShow_item_list(false);
  };

  const handleShow_list = () => {
    getMasterFileItems();
    setShow_item_list(true);
  };

  const handleClose_Location = () => {
    setWarehouse_Item({});
    setShow_Location(false);
  };

  const handleShow_Location = (item) => {
    console.log("item >>>>>", item);
    setWarehouse_Item(item);
    setShow_Location(true);
  };

  const params = useParams();

  const getWarehouse = () => {
    axiosIstance.get(`warehouses/${params.id}`).then((res) => {
      setWarehouse(res.data.data[0]);
      console.log(warehouse);
    });
  };

  const getWarehouseItems = () => {
    axiosIstance
      .post("warehouseItems/index", { warehouse_id: params.id })
      .then((res) => {
        setItems(res.data.data);
        console.log(items);
      });
  };

  const getWarehouse_Item = (id) => {
    axiosIstance.get(`warehouseItems/${id}`).then((res) => {
      setWarehouse_Item(res.data.data[0]);
      console.log(warehouse_Item);
    });
  };

  const getMasterFileItems = () => {
    setLoader(false);
    axiosIstance.post("masterFile/index").then((res) => {
      setMasterFile_Items(res.data.data);
      console.log("items", MasterFile_Items);
      setAttach_Item_Form({
        ...attach_Item_Form,
        item_code: res.data.data[0]?.item_code,
      });
      setLoader(true);
    });
  };

  const change_master_file = (e) => {
    setAttach_Item_Form({ ...attach_Item_Form, item_code: e.target.value });
    console.log(attach_Item_Form);
  };

  const AttachItemToWareHouse = () => {
    console.log(attach_Item_Form);
    axiosIstance.post("warehouseItems/store", attach_Item_Form).then((res) => {
      console.log(res);
      getWarehouseItems();
      handleClose_List();
    });
  };

  const Search_Item = () => {
    axiosIstance
      .post("warehouseItems/checkItemWarehouse", attach_Item_Form)
      .then((res) => {
        console.log(res);
        setSearch_result(res.data.message);

        setTimeout(() => {
          setSearch_result("");
        }, 3000);
      });
  };

  const change_Item_location = (e) => {
    setWarehouse_Item({ ...warehouse_Item, location: e.target.value });
  };

  const updateLocation = () => {
    console.log("item to update location", warehouse_Item);

    var Location = {
      _method: "put",
      warehouse_item_id: warehouse_Item.id,
      location: warehouse_Item.location,
    };

    console.log("Location >>>", Location);
    axiosIstance.post("warehouseItems/update", Location).then((res) => {
      console.log("update >>>>>>>", res);
      getWarehouseItems();
      handleClose_Location();
    });
  };

  const addSlip = () => {
    var NewItem = {
      warehouse_id: params.id,
      PO_number: slip.PO_number,
      supplier_name: slip.supplier_name,
    };

    axiosIstance.post("receivingSlips/store", NewItem).then((res) => {
      getSilpssOfWarehouse();
      handleClose_addSlip();
    });
  };
  const getSilpssOfWarehouse = () => {
    axiosIstance
      .post("receivingSlips/index", { warehouse_id: params.id })
      .then((response) => {
        console.log(response);
        setSilps(response.data.data);
      });
  };

  useEffect(() => {
    getWarehouse();
    getWarehouseItems();
    getSilpssOfWarehouse();
    setAttach_Item_Form({ ...attach_Item_Form, warehouse_id: params.id });
  }, []);

  const handleShow_addSlip = () => {
    setAdd_slip(true);
  };
  const handleClose_addSlip = () => {
    setAdd_slip(false);
  };

  const cancelSlip = (id) => {
    var canceledSlip = {
      _method: "put",
      receivingSlip_id: id,
      status: "Canceled",
    };
    axiosIstance.post("receivingSlips/update", canceledSlip).then((res) => {
      console.log("update >>>>>>>", res);
      getSilpssOfWarehouse();
    });
  };
  return (
    <React.Fragment>
      <div className=" my-3">
        <h1>
          {warehouse.name}{" "}
          <span
            className={` badge ${
              warehouse.is_active ? "text-bg-success" : "text-bg-danger"
            } `}
          >
            {warehouse.is_active ? "Active" : "Disabled"}
          </span>
        </h1>
        <p> created at : {warehouse.created_at}</p>
        <Button className="mx-1" onClick={() => handleShow_list()}>
          Add Item to warehouse
        </Button>
        <Button className="mx-1" onClick={() => handleShow_addSlip()}>
          Add Slip
        </Button>
      </div>

      <div className="row  justify-content-center">
        <Tabs
          defaultActiveKey="items"
          id="justify-tab-example"
          className="my-3 col-12 "
          justify
        >
          <Tab eventKey="items" title="Warehouse Items">
            <div className="row  bg-white">
              <div className="col-12 px-5">
                <Table bordered hover size="lg">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>WareHouseItem_ID</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.masterFile_item_id}</td>
                          <td>{item.description}</td>
                          <td>{item.retail_price}</td>
                          <td>
                            <div className="d-flex">
                              <Button
                                className="m-1"
                                onClick={() => handleShow(item.id)}
                              >
                                Details
                              </Button>
                              <Button
                                className="m-1"
                                onClick={() => handleShow_Location(item)}
                              >
                                {" "}
                                Update{" "}
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
          </Tab>
          <Tab eventKey="silps" title=" WareHouse Silps">
            <div className="row  bg-white">
              <div className="col-12 px-5 ">
                <Table bordered hover size="lg">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>PO_number</th>
                      <th>Supplier Name</th>
                      <th>Status</th>
                      <th>Created_at</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {silps.map((silp, index) => {
                      return (
                        <tr key={index}>
                          <td>{silp.id}</td>
                          <td>{silp.PO_number}</td>
                          <td>{silp.supplier_name}</td>
                          <td>{silp.status}</td>
                          <td>{silp.created_at}</td>
                          <td>
                            <div className="d-flex">
                              <Button
                                className="m-1"
                                onClick={() => {
                                  setSilp_detail_id(silp.id);
                                  setSilp_detail(true);
                                }}
                              >
                                Details
                              </Button>
                              <Button
                                className="m-1"
                                onClick={() => {
                                  cancelSlip(silp.id);
                                }}
                              >
                                {" "}
                                Cancel
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
          </Tab>
        </Tabs>
      </div>

      <Modal show={show_item} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{warehouse_Item.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tr>
              <th>ID</th>
              <td>{warehouse_Item.id}</td>
            </tr>
            <tr>
              <th>Item_Code</th>
              <td>{warehouse_Item.item_code}</td>
            </tr>
            <tr>
              <th>WareHouse_ID</th>
              <td>{warehouse_Item.warehouse_id}</td>
            </tr>
            <tr>
              <th>location</th>
              <td>
                {warehouse_Item.location ? warehouse_Item.location : "--"}
              </td>
            </tr>
            <tr>
              <th>created_at</th>
              <td>{warehouse_Item.created_at}</td>
            </tr>
            <tr>
              <th>retail_price</th>
              <td>{warehouse_Item.retail_price}</td>
            </tr>
            <tr>
              <th>masterFile_item_id</th>
              <td>{warehouse_Item.masterFile_item_id}</td>
            </tr>
          </Table>
        </Modal.Body>
      </Modal>

      <Modal show={show_item_list} onHide={handleClose_List}>
        <Modal.Header closeButton>
          <Modal.Title>List of Items in Masterfile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactLoader loaded={loader} length={10} radius={20} width={10}>
            <Form.Select onChange={($event) => change_master_file($event)}>
              {MasterFile_Items.map((item, index) => {
                return (
                  <option key={index} value={item.item_code}>
                    {" "}
                    {item.description + "-" + item.item_code}{" "}
                  </option>
                );
              })}
            </Form.Select>
            <p className="my-2 text-dark">{search_result}</p>
          </ReactLoader>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="btn btn-success "
            onClick={() => AttachItemToWareHouse()}
          >
            Attach Item to WareHouse
          </Button>
          <Button className="btn btn-primary " onClick={() => Search_Item()}>
            Search Item
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_Location} onHide={handleClose_Location}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item Location </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Location</Form.Label>
            <Form.Control
              value={warehouse_Item.location}
              onInput={($event) => change_Item_location($event)}
              type="Text"
              placeholder="Enter Location"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="btn btn-success " onClick={() => updateLocation()}>
            Update Location
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={add_slip} onHide={handleClose_addSlip}>
        <Modal.Header closeButton>
          <Modal.Title>Store Slip </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>PO Number</Form.Label>
            <Form.Control
              value={slip.PO_number}
              onInput={(e) => {
                setSlip({ ...slip, PO_number: e.target.value });
              }}
              type="Text"
              placeholder="Enter Po Number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              value={slip.supplier_name}
              onInput={(e) => {
                setSlip({ ...slip, supplier_name: e.target.value });
              }}
              type="Text"
              placeholder="Enter Supplier Name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="btn btn-success " onClick={() => addSlip()}>
            add Slip
          </Button>
        </Modal.Footer>
      </Modal>

      {silp_detail ? (
        <SilpDetails
          show={silp_detail}
          silp_id={silp_detail_id}
          handleClose={() => setSilp_detail(false)}
          warehouse_id={params.id}
          wareHouseItems={items}
        ></SilpDetails>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default WarehouseDetails;
