import { Table } from 'react-bootstrap';
import React,{ useEffect, useState,useContext } from "react";
import Button from 'react-bootstrap/Button';
import axiosIstance from '../../Config/config';
import Modal from 'react-bootstrap/Modal';
import {UserContext} from '../../user/userContext';
import {  Col, Form , FormGroup, Label, Input, } from 'reactstrap';
import './masterfile.css';

function Index() {
    const [MasterFile_Items, setMasterFile_Items] = useState([]);
    const[Master_Item, setMaster_Item] = useState({})
    const [show_item, setShow_item] = useState(false);
    const [show_update, setShow_update] = useState(false);
    const [show_New_Item, setShow_New_Item] = useState(false);
  	const tokenContext = useContext(UserContext);
    ////////////////////////////////////////////////////////////////////////
    const [search_value,setsearch_value]= useState('')
    const [search_Items,setsearch_Items] = useState([])
    const [search_error,setsearch_error] = useState('')


    const handleClose = () => {
        setMaster_Item({})
        setShow_item(false)};

    const handleShow = (id) => {
        getMaster_Item(id)
        setShow_item(true)
    };

    const handleClose_update = () => {
        setMaster_Item({})
        setShow_update(false)};

      const handleShow_update = (item) => {
        setMaster_Item(item)
        setShow_update(true);
    }


    const handleClose_New_Item = () => {
      setMaster_Item({})
      setShow_New_Item(false)};

    const handleShow_New_Item = () => {
      setShow_New_Item(true);
  }


      const getMasterFileItems = ()=>{
      axiosIstance.post('masterFile/index').then((res)=>{
        console.log(res)
        setMasterFile_Items(res.data.data)
      })
    }

    const getMaster_Item = (id) =>{
        axiosIstance.get(`masterFile/${id}`).then((res)=>{
            setMaster_Item(res.data.data[0])
        })
    }

    const updateItem =()=>{

        var updateItem ={
            _method :'put',
            masterFile_item_id : Master_Item.id,
            item_code : Master_Item.item_code,
            description : Master_Item.description,
            retail_price : Master_Item.retail_price
        }

        axiosIstance.post('masterFile/update',updateItem).then((res)=>{
            getMasterFileItems()
            handleClose_update()
        })
    }

    const Add_New_Item = () => {

      var NewItem ={
        item_code : Master_Item.item_code,
        description : Master_Item.description,
        retail_price : Master_Item.retail_price
    }

    axiosIstance.post('masterFile/store',NewItem).then((res)=>{
        getMasterFileItems()
        handleClose_New_Item()
    })

    }


    const search_Item = ()=>{
      console.log('search_value',search_value)
        let search = MasterFile_Items.filter(item => item.item_code === search_value )
        console.log('search_items',search)
        if(search.length){
        setsearch_Items(search)
        // search_Items.length ? setsearch_error('') : setsearch_error('you Entered invlid item code')
      }else{
        console.log('kharaaaaa')
        setsearch_Items([])
        setsearch_error('you Entered invlid item code')
      }
    }


    useEffect(()=> {
        getMasterFileItems()
    }, [tokenContext.token])

    return (
        <React.Fragment>

                <div className='col-sm-8 offset-sm-2 master_file_wrapper'>
                  <Button className='btn btn-primary mb-3'onClick={()=>{ handleShow_New_Item() }}>ADD New Item</Button>
                {/* <Table  bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>item_code</th>
                            <th>description</th>
                            <th>retail_price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            MasterFile_Items.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.retail_price}</td>
                                    <td>
                                      <div>
                                       <Button className='m-1' onClick={()=> handleShow(item.id)}>View</Button>
                                       <Button className='m-1' onClick={()=> handleShow_update(item)}>Edit</Button>
                                      </div>
                                    </td>

                                </tr>
                            )
                        }

                        </tbody>

                </Table> */}

                <div className='row justify-content-center'>
                 <label for="exampleDataList" class="form-label">Search Items</label>
                 <div className='d-flex justify-content-center'>
                 <input className="form-control mx-1" list="datalistOptions" type="search" onInput={(e)=>{setsearch_value(e.target.value)}} id="exampleDataList" placeholder="Type Item code to search..."></input>
                  <Button className='btn btn-secondary' onClick={()=>{search_Item()}}>search</Button>
                 </div>
                <datalist id="datalistOptions">
                  {
                    MasterFile_Items.map((item)=>
                    <option value={item.item_code}></option>
                    )
                  }
               </datalist>
               <div className="col-12 py-4">
                {search_Items.length ?   
                <Table bordered hover size="lg">
                  <thead>
                   <tr>
                    <th>item_code</th>
                     <th>description</th>
                     <th>retail_price</th>
                     <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>

                      {
                            search_Items.map((item)=>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.retail_price}</td>
                                    <td>
                                      <div>
                                       <Button className='m-1' onClick={()=> handleShow(item.id)}>View</Button>
                                       <Button className='m-1' onClick={()=> handleShow_update(item)}>Edit</Button>
                                      </div>
                                    </td>

                                </tr>
                            )
                        }

                  </tbody>
                </Table>
                : <h4 className="text-danger mt-4">{search_error}</h4>}

               </div>


                </div>

                </div>

     <Modal show={show_item} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Master_Item.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table  bordered>
                <tbody>
                <tr>
                    <th>Status</th>
                    <td><span className={` badge ${Master_Item.is_active ? "text-bg-success" : "text-bg-danger"} `}>{Master_Item.is_active? 'Active' : 'Disabled'}</span></td>
                </tr>
                <tr>
                    <th>ID</th>
                    <td>{Master_Item.id}</td>
                </tr>
                <tr>
                    <th>Item_Code</th>
                    <td>{Master_Item.item_code}</td>
                </tr>
                <tr>
                   <th>created_at</th>
                   <td>{Master_Item.created_at}</td>
                </tr>
                <tr>
                   <th>updated_at</th>
                   <td>{Master_Item.updated_at}</td>
                </tr>
                <tr>
                  <th>retail_price</th>
                  <td>{Master_Item.retail_price}</td>
                </tr>
                </tbody>
            </Table>
        </Modal.Body>
     </Modal>

     <Modal show={show_update} onHide={handleClose_update}>
        <Modal.Header closeButton>
          <Modal.Title> Upate Item </Modal.Title>
        </Modal.Header>
        <Form className="form">
          <Modal.Body>

               <Col>
                 <FormGroup row>
                   <Label for="item_code" sm={3}>item code</Label>
                   <Col sm={9}>
                     <Input type="text" name="item_code" disabled value={Master_Item.item_code} onInput={(e)=>{ setMaster_Item({...Master_Item,item_code: e.target.value}) }}  placeholder="Enter item-code" />
                   </Col>
                 </FormGroup>
                 <FormGroup row>
                   <Label for="description" sm={3}>description</Label>
                   <Col sm={9}>
                     <Input type="text" name="description" value={Master_Item.description}  onInput={(e)=>{ setMaster_Item({...Master_Item,description: e.target.value}) }} placeholder="Enter description" />
                   </Col>
                 </FormGroup>
                 <FormGroup row>
                   <Label for="retail_price" sm={3}>retail price</Label>
                   <Col sm={9}>
                     <Input type="text" name="retail_price" value={Master_Item.retail_price}  onInput={(e)=>{ setMaster_Item({...Master_Item,retail_price: e.target.value}) }} placeholder="Enter retail price" />
                   </Col>
                 </FormGroup>
               </Col>

        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
            <Button className="btn btn-success " onClick={()=> updateItem()}>Update</Button>
        </Modal.Footer>
        </Form>

     </Modal>


     <Modal show={show_New_Item} onHide={handleClose_New_Item}>
        <Modal.Header closeButton>
          <Modal.Title> Add New Item</Modal.Title>
        </Modal.Header>
        <Form className="form">
          <Modal.Body>
               <Col>
                 <FormGroup row>
                   <Label for="item_code" sm={3}>item code</Label>
                   <Col sm={9}>
                     <Input type="text" name="item_code"  value={Master_Item.item_code} onInput={(e)=>{ setMaster_Item({...Master_Item,item_code: e.target.value}) }}  placeholder="Enter item-code" />
                   </Col>
                 </FormGroup>
                 <FormGroup row>
                   <Label for="description" sm={3}>description</Label>
                   <Col sm={9}>
                     <Input type="text" name="description" value={Master_Item.description}  onInput={(e)=>{ setMaster_Item({...Master_Item,description: e.target.value}) }} placeholder="Enter description" />
                   </Col>
                 </FormGroup>
                 <FormGroup row>
                   <Label for="retail_price" sm={3}>retail price</Label>
                   <Col sm={9}>
                     <Input type="text" name="retail_price" value={Master_Item.retail_price}  onInput={(e)=>{ setMaster_Item({...Master_Item,retail_price: e.target.value}) }} placeholder="Enter retail price" />
                   </Col>
                 </FormGroup>
               </Col>

        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
            <Button className="btn btn-success " onClick={()=> Add_New_Item() }>ADD</Button>
        </Modal.Footer>
        </Form>
     </Modal>

        </React.Fragment>



    )

}
export default Index