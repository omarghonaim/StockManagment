import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  

function Edit () {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const userToken = JSON.parse(token);

const [currentItem,setCurrentItem] = useState([]);
const [updatedmasterfile,setUpdatedmasterfile] = useState(currentItem);

const onChangeItemCode= (e)=> {  
    setUpdatedmasterfile({...updatedmasterfile, item_code: e.target.value})
}  
  
  const onChangeItemDesc= (e)=> {  
    setUpdatedmasterfile({...updatedmasterfile, description: e.target.value})
}  
 
  const onChangeItemRetial= (e)=> {  
    setUpdatedmasterfile({...updatedmasterfile, retail_price: e.target.value})
} 
async function getData(){
  const response =   await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/update", {
      method: 'post', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
         'Authorization': `Bearer ${userToken}`,
         'Content-Type': 'application/json'
     
      },
    }).then((response) => response.json())
    .then((response) => {setCurrentItem(response.data)});
}
 
  
const onSubmit = (e) => {  
    debugger;  
    e.preventDefault();  
}

        return (  
            <>
            <Container className="App">  
             <h4 className="PageHeading">Edit item</h4>  
             <Form className="form">  
               <Col>  
                 <FormGroup row>  
                   <Label for="item_code" sm={2}>item code</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="item_code" value={updatedmasterfile.item_code} onChange={onChangeItemCode}  placeholder="Enter item-code" />  
                   </Col>  
                 </FormGroup>  
                 <FormGroup row>  
                   <Label for="description" sm={2}>description</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="description" value={updatedmasterfile.description}  onChange={onChangeItemDesc} placeholder="Enter description" />  
                   </Col>  
                 </FormGroup>  
                 <FormGroup row>  
                   <Label for="retail_price" sm={2}>retail price</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="retail_price" value={updatedmasterfile.retail_price}  onChange={onChangeItemRetial} placeholder="Enter retail price" />  
                   </Col>  
                 </FormGroup>  
               </Col>  
               <Col>  
                 <FormGroup row>  
                   <Col sm={5}>  
                   </Col>  
                   <Col sm={1}>  
                   <button type="button"  className="btn btn-success" >Submit</button>  
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
export default Edit;