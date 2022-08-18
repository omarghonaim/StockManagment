import React, { useState } from 'react'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  

function Store () {
  const token = localStorage.getItem('token');
  const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNTIxN2E3MDBmZDFmMWQ3NTFlNmY2YWZkNzhmYzA2ZDAxZjVmOWQzM2MzZjhkODg4YjRiNTE1OTEyNzIyZDk2NzdhOGI3MDZkNjMyNWM1NmQiLCJpYXQiOjE2NTkwMDgzNjcuOTY0MTEzLCJuYmYiOjE2NTkwMDgzNjcuOTY0MTE1LCJleHAiOjE2OTA1NDQzNjcuOTYyMTIyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.M71c9vgWWlZyLOk-nJhcukV3F-4JzFjgaF91YwGpQF9-2dLvVtMo_U4e7iI-_8cLH2VVyxFVjwn_PlV6gXGlCyfmrgDeyJCHsWAlzKcSkPBAZCFE3xMimW2BHep8FXR66CbGTvG0tMcA7v2gD9wNGOGivDV0UppXmzwEc83-xLreThc3EuhITjIcrTRQKepwPJyAxx3B1OXDiDjbFPqVVRHaW1eTAJNBBxrE4MINghhOQd3-5Ga38IuPRcY22h6VpWky8yIdmlaIncWmv6Gv78zObMvtNqt2SPhCCLrsqrfnpTtcW9j6YFpnRCAZ8KeRz4PqMPa6RZQEVaHdsiQWOuWF2gAWp2EAygA_rLWPF7C587FSmlyFBbL9eLTuo77bYSwDJuq4qWjCwOzIhPBU-JOO9oLoimG68JaHclMQuFOqBeWmW-LArHt51NuXG3gHMk8sH_AuOE1uuMInqEEkQAouB5HbqN0hJIsgfaq7HFRfB1KHMNdIJAgzW-GQ6alV38zbSuLTFHdtyMAHzpXbg59IGiD80tMrkOCERyJUx1clW1SH2KXaJJSJtTI1Xj4YbEbWPlRMUBo5FNr12q4BkKb8QH0f4SoV-OsP0ZfikEozSRxu1CkFugEYdjCAycQNZIe2uWiwJKZTRQMrsMjI_IGuTeD6N7tLf-_HOrO5CIY"
  // const config = {
  //     headers: { 
  //       Authorization: `Bearer ${userToken}`,
  //       Accept: "application/json",
  //       'Content-Type': 'application/json'
  //      }
  // };
    const [item_code, setItemCode] = useState("");
    const [retail_price, setRetailPrice] = useState("");
    const [description, setDescription] = useState("");
// const formData = new FormData();

const  handleItemChange= (e)=> {  
  setItemCode(e.target.value );    
     } 
       
const  handleDescChange= (e)=> {  
  setDescription(e.target.value );    
     } 
     
     const  handlePriceChange= (e)=> {  
      setRetailPrice(e.target.value );    
         } 
       console.log( );
       async function add() {
        const formData = new FormData();
        formData.append('item_code',item_code);
        formData.append('retail_price',retail_price);
        formData.append('description',description);
       
        let result = await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/store",{
          Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          'Content-Type': 'application/json',
            method:"POST",
            body:JSON.stringify(formData),
        });
        // console.log(Authorization);
    }
// const handleSubmit=()=>{
//     // let result = await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/store", config);
//     // result = await result.json();
//     // console.log(result);
//     // setData(result.data);
//   }

        return (  
            <>
            <Container className="App">  
             <h4 className="PageHeading">Add new Item</h4>  
             <Form className="form">  
               <Col>  
                 <FormGroup row>  
                   <Label for="item_code" sm={2}>item code</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="item_code" value={item_code} onChange={e => handleItemChange(e)}  placeholder="Enter item-code" />  
                   </Col>  
                 </FormGroup>  
                 <FormGroup row>  
                   <Label for="description" sm={2}>description</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="description" value={description}  onChange={e => handleDescChange(e)} placeholder="Enter description" />  
                   </Col>  
                 </FormGroup>  
                 <FormGroup row>  
                   <Label for="retail_price" sm={2}>retail price</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="retail_price" value={retail_price}  onChange={e => handlePriceChange(e)} placeholder="Enter retail price" />  
                   </Col>  
                 </FormGroup>  
               </Col>  
               <Col>  
                 <FormGroup row>  
                   <Col sm={5}>  
                   </Col>  
                   <Col sm={1}>  
                   <button type="button"  className="btn btn-success" onClick={add}>Submit</button>  
                   </Col>  
                   <Col sm={5}>  
                   </Col>  
                 </FormGroup>  
               </Col>  
             </Form>  
           </Container>  
           </>
         )
 
        }
export default Store;