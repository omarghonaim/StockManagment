import Header from "../Header";
import { Table } from 'react-bootstrap';
import React,{ useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function ListProduct() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const userToken = JSON.parse(token);
    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };
    async function getData(){
        let result = await fetch("http://stockapi.ghonaim.com/api/stock/warehouses/index", config);
        result = await result.json();
        console.log(result);
        setData(result.data);
    }

    
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
            <Header />
            
                <h1>product list site</h1>
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
                                    <td><Link to={`/warehouse/${item.id}`} className='btn btn-primary' >Show warehouse</Link>
                                     
                                     </td>
                                </tr>
                            )
                        }   

                </Table>
                </div>
        </>
    )

}
export default ListProduct