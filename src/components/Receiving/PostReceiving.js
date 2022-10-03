import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axiosIstance from "../../Config/config";
import Button from "react-bootstrap/Button";
import "./PostReceiving.css";
const PostReceiving = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);
  const [show_item, setShow_item] = useState(true);

  const config = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  async function getData() {
    try {
      let result = await fetch(
        "http://stockapi.ghonaim.com/api/stock/warehouses/index",
        config
      );
      result = await result.json();
      console.log(result);
      setData(result.data);
    } catch (error) {}
  }

  const handleClose = () => {
    setShow_item(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const [receivingSlip_id, setReceivingSlip_id] = useState("");
  const [resMsg, setResMsg] = useState("");
  // var slip = {
  //   _method: "put",
  //   receivingSlip_id: receivingSlip_id,
  // };
  // const PostSlip = () => {
  //   try {
  //     axiosIstance.post(`receivingSlips/post`, slip).then((res) => {
  //       console.log("rec slip res", res);
  //       setResMsg(res.data.message);
  //     });
  //   } catch (error) {}
  // };

  // useEffect(() => {
  // getItemDetails()
  // },[])


    return (
      <React.Fragment>
                <Modal show={show_item} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table >
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>is_active</th>
                            
                        </tr>
                    
                        {
                            data.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.is_active}</td>
                                    <td><Link to={`/postReceiving/warehouse/${item.id}`} onClick={handleClose} > <Button className='m-1' >Show warehouse</Button></Link>
                                     
                                     </td>
                                </tr>
                            )
                        }   

                </Table>
        </Modal.Body>
      </Modal>
{/* 
      <div className="col-sm-4 offset-sm-4 PostReceiving_wrapper">
        <h1>PostReceiving</h1> */}
        {/* <div className="row justify-content-center">
          <input
            className="form-control mx-1"
            list="datalistOptions"
            type="number"
            onInput={(e) => {
              setReceivingSlip_id(e.target.value);
            }}
            placeholder="Enter Reciving Slip Id"
          ></input>
          <Button className="btn btn-primary mb-3" onClick={PostSlip}>
            Post
          </Button>
        </div> */}
        {/* {resMsg ? <h5>{resMsg}</h5> : ""} */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default PostReceiving;
