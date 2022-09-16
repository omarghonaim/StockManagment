import Header from "../Header";
import { Table } from 'react-bootstrap';
import React,{ useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';

function ListProduct() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const userToken = JSON.parse(token);
    const [show_item, setShow_item] = useState(true);

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };
    async function getData(){
        let result = await fetch("http://stockapi.ghonaim.com/api/stock/warehouses/index", config);
        result = await result.json();
        console.log(result);
        setData(result.data);
    }

    const handleClose = () => {
        setShow_item(false)};
    
    useEffect(async ()=> {
            getData()
    }, [])
//    async function showOper(id){
//         let result = await fetch('http://stockapi.ghonaim.com/api/stock/warehouses/'id+,config );
//         result = result.json();
//         getData();
//     }
    return (

        
        <>
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
                                    <td><Link to={`/warehouse/${item.id}`} > <Button className='m-1'>Show warehouse</Button></Link>
                                     
                                     </td>
                                </tr>
                            )
                        }   

                </Table>
        </Modal.Body>
      </Modal>

            
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
        </>
    )

}
export default ListProduct