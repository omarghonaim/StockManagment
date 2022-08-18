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
             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDI1MmZiYWIzZjQ3MzliN2NhNDhlMzY2MzBmMzYyMDdkNTgzZjAwYWYxOTY4ZTk0MWJhMDFhNTI3YjE2ZWNkMjE2YmJhMzNmMjQwY2NhZGUiLCJpYXQiOjE2NjA2Nzg3NDIuNTUwNzA0LCJuYmYiOjE2NjA2Nzg3NDIuNTUwNzA2LCJleHAiOjE2OTIyMTQ3NDIuNTQ5ODQ0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.blnCR3XyI4F1ONPrinQHEkXM1TAfnQvQCvb54zDwDtN3_PLx7ZxiiibLGK-Y1nzpO6pXfEg7QiBP_Wd5f5y5w1s1kr3ACB3mrH5wRfvNgoxASkYOmplTMj4T-WToGwY2Jgn6Zf293vRpzb2VRP3L0zEjImwbN2wefBEXcYsMM4M07o_2Vh-_mzF9Ynishx4-c6-bNIyVlUTDUbQlzNrko94QofjFUykRZTnL_GznMJBTZKJlVAnonedJE8ieUQl_9Fjy5XGr3PFf0STmdZ4lr7Ma2pirIlyNzEQBxIHWR9Ci3lYmN9B3jyyWAzDDQSZgtPAEtJ-LvDHxvRpI8l9ZwTtKiVr5Xbyrj4xJlQ67X9gi-Ao7jE2OIAXFywk6zW6H1nkWy11e3S3prBnqSFHsU0R8iwKP9Za6fqbenBXj_ZeDvkbLeqxINshmVjrBs09fMtYQnmD-xEaMZWExMYQUckeQ1bSnynh9pEPIP3mY7BaIV4HpScR3kj8lsbDAMl5qJ1Y6f49JD2UE81XjRMO-OUrlQYWL4y11maZXlK6wcCDQWzvAfQESJNveItwHqXPBDaJFJzT4NhtLYX3J1TwRFu8siBnq21yHscaXGaWGlliTmHC7iT5p0QmjnwBjgMoa9d_CxjeCChpvkM-YjzjFokckDC-YT4oUTSir-pp4Kys',
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