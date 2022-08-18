import { Table } from 'react-bootstrap';
import React,{ useEffect, useState } from "react";
function Index() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNTIxN2E3MDBmZDFmMWQ3NTFlNmY2YWZkNzhmYzA2ZDAxZjVmOWQzM2MzZjhkODg4YjRiNTE1OTEyNzIyZDk2NzdhOGI3MDZkNjMyNWM1NmQiLCJpYXQiOjE2NTkwMDgzNjcuOTY0MTEzLCJuYmYiOjE2NTkwMDgzNjcuOTY0MTE1LCJleHAiOjE2OTA1NDQzNjcuOTYyMTIyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.M71c9vgWWlZyLOk-nJhcukV3F-4JzFjgaF91YwGpQF9-2dLvVtMo_U4e7iI-_8cLH2VVyxFVjwn_PlV6gXGlCyfmrgDeyJCHsWAlzKcSkPBAZCFE3xMimW2BHep8FXR66CbGTvG0tMcA7v2gD9wNGOGivDV0UppXmzwEc83-xLreThc3EuhITjIcrTRQKepwPJyAxx3B1OXDiDjbFPqVVRHaW1eTAJNBBxrE4MINghhOQd3-5Ga38IuPRcY22h6VpWky8yIdmlaIncWmv6Gv78zObMvtNqt2SPhCCLrsqrfnpTtcW9j6YFpnRCAZ8KeRz4PqMPa6RZQEVaHdsiQWOuWF2gAWp2EAygA_rLWPF7C587FSmlyFBbL9eLTuo77bYSwDJuq4qWjCwOzIhPBU-JOO9oLoimG68JaHclMQuFOqBeWmW-LArHt51NuXG3gHMk8sH_AuOE1uuMInqEEkQAouB5HbqN0hJIsgfaq7HFRfB1KHMNdIJAgzW-GQ6alV38zbSuLTFHdtyMAHzpXbg59IGiD80tMrkOCERyJUx1clW1SH2KXaJJSJtTI1Xj4YbEbWPlRMUBo5FNr12q4BkKb8QH0f4SoV-OsP0ZfikEozSRxu1CkFugEYdjCAycQNZIe2uWiwJKZTRQMrsMjI_IGuTeD6N7tLf-_HOrO5CIY"
    // const config = {
    //     headers: { 
    //         Authorization: `Bearer ${userToken}`,
    //         Accept: "application/json",
    //         'Content-Type': 'application/json'
    //      }
    // };
    async function getData(){
        let result = await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/index", {
            Authorization: `Bearer ${userToken}`,
            method: 'GET',
            Accept: "application/json",
            'Content-Type': 'application/json'
        });
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
            
                <h1>Master Filesss</h1>
                <div className='col-sm-8 offset-sm-2 '>
                <Table >
                        <tr>
                            <th>item_code</th>
                            <th>description</th>
                            <th>retail_price</th>
                            
                        </tr>
                    
                        {
                            data.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.retail_price}</td>
                                    <td><a href={`/warehouse/${item.id}`} className='btn btn-primary' >Show warehouse</a>
                                     
                                     </td>
                                </tr>
                            )
                        }   

                </Table>
                </div>
        </>
    )

}
export default Index