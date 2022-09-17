import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

function ListProduct() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);
  const [isLoading, setIsLoading] = useState(false);

  console.log("here");
  const config = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  async function getData() {
    setIsLoading(true);
    try {
      let result = await fetch(
        "http://stockapi.ghonaim.com/api/stock/warehouses/index",
        config
      );
      result = await result.json();
      console.log(result);
      setIsLoading(false);
      setData(result.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  //    async function showOper(id){
  //         let result = await fetch('http://stockapi.ghonaim.com/api/stock/warehouses/'id+,config );
  //         result = result.json();
  //         getData();
  //     }
  return (
    <div className="row justify-content-center mt-4">
      <Card className="m-2 p-2 col-lg-6 col-md-8 col-sm-10">
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ACTIVE </th>
                <th>DETAILS</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <Spinner
                  animation="border"
                  role="status"
                  className="centerSpinner"
                />
              )}
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.is_active ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/warehouse/${item.id}`}>
                      {" "}
                      <Button className="m-1">Show warehouse</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* <h1>product list site</h1>
                <div className='col-sm-8 offset-sm-2 '>
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
                                    <td><Link to={`/warehouse/${item.id}`} > <Button className='m-1'>Show warehouse</Button></Link>
                                     
                                     </td>
                                </tr>
                            )
                        }   

                </Table>
                </div> */}
    </div>
  );
}
export default ListProduct;
