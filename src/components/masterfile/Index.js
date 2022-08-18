import { Table } from 'react-bootstrap';
import React,{ useEffect, useState } from "react";
import Show from './Show';
function Index() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const userToken = JSON.parse(token);
    async function getData(){
        const response =  await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/index", {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
           'Authorization': `Bearer ${userToken}`,
           'Content-Type': 'application/json'
       
        },
        // redirect: 'follow',
        // referrerPolicy: 'no-referrer',
      }).then((response) => response.json())
      .then((response) => {setData(response.data)});
      console.log(response);
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
            
                <h1>Master Filesss</h1>
                <div className='col-sm-8 offset-sm-2 '>
                <Table >
                        <tr>
                            <th>item_code</th>
                            <th>description</th>
                            <th>retail_price</th>
                            <th>Show</th>
                        </tr>
                    
                        {
                            data.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.retail_price}</td>
                                    {/* <Show id={item.id}>Show</Show> */}
                                    <td><a href={`/masterFile/${item.id}`} className='btn btn-primary' >view</a></td>
                                    <td><a href="masterfile/edit" className='btn btn-primary' >Edit</a></td>

                                </tr>
                            )
                        }   

                </Table>
                </div>
        </>
    )

}
export default Index