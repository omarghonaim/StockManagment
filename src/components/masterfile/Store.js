import React, { useState } from 'react'
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  

function Store () {
  const token = localStorage.getItem('token');
  const userToken = JSON.parse(token);
    const [item_code, setItemCode] = useState("");
    const [retail_price, setRetailPrice] = useState("");
    const [description, setDescription] = useState("");

    const formData = new FormData();
const  handleItemChange= (e)=> {  
  setItemCode(e.target.value );    
     } 
       
const  handleDescChange= (e)=> {  
  setDescription(e.target.value );    
     } 
     
     const  handlePriceChange= (e)=> {  
      setRetailPrice(e.target.value );    
         } 


       async function add() {
        // console.log(formData.get('item_code'));
        formData.append('item_code',item_code);
        formData.append('retail_price',retail_price);
        formData.append('description',description);
        console.log(formData.get('description'));
        let result = await fetch("http://stockapi.ghonaim.com/api/stock/masterFile/store",{
          method: 'POST', 
          // mode: 'cors', 
          // cache: 'no-cache', 
          // credentials: 'same-origin', 
          headers: {
           'Authorization': `Bearer ${userToken}`,
             'Content-Type': 'multipart/form-data',
              'Accept': '*/*',
              'Accept-Language':'en',
              'Connection': 'keep-alive'
          },
            Body:formData,
        }).then((result) => console.log(result));
    }

        return (  
            <>
            <Container className="App">  
             <h4 className="PageHeading">Add new Item</h4>  
             <Form className="form">  
               <Col>  
                 <FormGroup row>  
                   <Label for="item_code" sm={2}>item code</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="item_code" onChange={e => handleItemChange(e)}  placeholder="Enter item-code" />  
                   </Col>  
                 </FormGroup>  
                 <FormGroup row>  
                   <Label for="description" sm={2}>description</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="description"   onChange={e => handleDescChange(e)} placeholder="Enter description" />  
                   </Col>  
                 </FormGroup>  
                 <FormGroup row>  
                   <Label for="retail_price" sm={2}>retail price</Label>  
                   <Col sm={10}>  
                     <Input type="text" name="retail_price"   onChange={e => handlePriceChange(e)} placeholder="Enter retail price" />  
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