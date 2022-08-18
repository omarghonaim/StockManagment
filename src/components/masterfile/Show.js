import { Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";
function Show() {
    const { id } = useParams()
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const userToken = JSON.parse(token);
    async function getData(){
        const response =   await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/"+ id, {
            method: 'GET', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
               'Authorization': `Bearer ${userToken}`,
               'Content-Type': 'application/json'
           
            },
          }).then((response) => response.json())
          .then((response) => {setData(response.data)});
    }

  
    //  getData();
    console.log('data', data[0]);

    return (
        <>
            
                <h1>Single file</h1>
                <div className='col-sm-8 offset-sm-2 '>
                <Table >
                        <tr>
                            <th>item_code</th>
                            <th>description</th>
                            <th>retail_price</th>
                            
                        </tr>
                                <tr>
                                    {/* <td>{data[0].id}</td>
                                    <td>{data[0].description}</td>
                                    <td>{data[0].retail_price}</td>                                       */}
                                    
                                </tr>
                </Table>
                </div>
        </>
    )

}
export default Show