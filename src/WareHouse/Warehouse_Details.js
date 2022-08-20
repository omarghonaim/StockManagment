import React,{ useState, useEffect} from 'react';
import axiosIstance from '../Config/config';
import { useParams } from "react-router"
import Header from "../Header"
import { Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactLoader from 'react-loader';


const WarehouseDetails = () => {

    const [loader, setLoader] = useState(true)
    const [warehouse, setWarehouse]= useState({})
    const [items, setItems]= useState([])
    const [warehouse_Item,setWarehouse_Item]= useState({})
    const [show_item, setShow_item] = useState(false);
    const [show_item_list, setShow_item_list] = useState(false);
    const [MasterFile_Items,setMasterFile_Items] = useState([]);
    const [attach_Item_Form, setAttach_Item_Form] = useState({warehouse_id:'',item_code:''})
    const [show_Location, setShow_Location] = useState(false);
    const [search_result, setSearch_result] = useState('')

    const handleClose = () => {
        setWarehouse_Item({})
        setShow_item(false)};

    const handleShow = (id) => {
        getWarehouse_Item(id)
        setShow_item(true)
    };

    const handleClose_List = () => {
        setSearch_result('')
        setShow_item_list(false);}

    const handleShow_list = () => {
        getMasterFileItems()
        setShow_item_list(true)};

  const handleClose_Location = () => {
    setWarehouse_Item({})
    setShow_Location(false)};

  const handleShow_Location = (item) => {
    console.log('item >>>>>',item)
    setWarehouse_Item(item)
    setShow_Location(true);
}

    const params = useParams()

    const getWarehouse = () =>{
        axiosIstance.get(`warehouses/${params.id}`).then((res)=>{
            setWarehouse(res.data.data[0])
            console.log(warehouse)
        })
    }

    const getWarehouseItems = () =>{
      axiosIstance.post('warehouseItems/index',{'warehouse_id':params.id}).then((res)=>{
        setItems(res.data.data);
        console.log(items)
      })
    }

    const getMasterFileItems = () =>{
        setLoader(false)
        axiosIstance.post('masterFile/index').then((res)=>{
            setMasterFile_Items(res.data.data)
            console.log('items',MasterFile_Items)
            setAttach_Item_Form({...attach_Item_Form, item_code: MasterFile_Items[0]?.item_code})
            setLoader(true)
        })
    }

    const getWarehouse_Item = (id) =>{
     axiosIstance.get(`warehouseItems/${id}`).then((res)=>{
        setWarehouse_Item(res.data.data[0])
        console.log(warehouse_Item)
     })
    }

    const change_master_file=(e) =>{
       setAttach_Item_Form({...attach_Item_Form, item_code: e.target.value})
       console.log(attach_Item_Form)
    }

    const AttachItemToWareHouse= () =>{
        console.log(attach_Item_Form)
        axiosIstance.post('warehouseItems/store',attach_Item_Form).then((res)=>{
            console.log(res)
            getWarehouseItems()
            handleClose_List()
        })
    }

    const Search_Item = () =>{
      axiosIstance.post('warehouseItems/checkItemWarehouse',attach_Item_Form).then((res)=>{
        console.log(res)
        setSearch_result(res.data.message)

        setTimeout(() =>{
            setSearch_result('')
        },3000)

      })
    }

    const change_Item_location=(e) =>{
        setWarehouse_Item({...warehouse_Item,location: e.target.value})
    }

    const updateLocation = () =>{

        console.log('item to update location',warehouse_Item)

        var Location ={
            _method :"put",
            warehouse_item_id : warehouse_Item.id,
            location : warehouse_Item.location
        }

        console.log('Location >>>', Location)
        axiosIstance.post('warehouseItems/update',Location).then((res)=>{
            console.log('update >>>>>>>', res)
            getWarehouseItems()
            handleClose_Location()
        })
    }

    useEffect(()=> {
        getWarehouse()
        getWarehouseItems()
        setAttach_Item_Form({...attach_Item_Form,warehouse_id:params.id})
    },[])


    return (
        <React.Fragment>
            <Header />
            <div className=' my-3'>
                <h1>{warehouse.name} <span className={` badge ${warehouse.is_active ? "text-bg-success" : "text-bg-danger"} `}>{warehouse.is_active? 'Active' : 'Disabled'}</span></h1>
                <p> created at : {warehouse.created_at}</p>
                <Button onClick={()=>handleShow_list()}>Add Item to warehouse</Button>
            </div>

            <div className='row justify-content-center'>
                <h2>warehouse items</h2>
                <div className='col-7'>
                <Table bordered hover size="lg">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>WareHouse_ID</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    items.map((item,index)=>{
                        return (
                            <tr key={index}>
                               <td>{item.id}</td>
                               <td>{item.masterFile_item_id}</td>
                               <td>{item.description}</td>
                               <td>{item.retail_price}</td>
                               <td>
                                <div className='d-flex'>
                                <Button className='m-1' onClick={()=> handleShow(item.id)}>Details</Button>
                                <Button className='m-1' onClick={()=> handleShow_Location(item) }> Update </Button>
                                </div>
                               </td>
                            </tr>
                        )
                    })
                }
                </tbody>
           </Table>
            </div>
            </div>


    <Modal show={show_item} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{warehouse_Item.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table>
                <tr>
                    <th>ID</th>
                    <td>{warehouse_Item.id}</td>
                </tr>
                <tr>
                    <th>Item_Code</th>
                    <td>{warehouse_Item.item_code}</td>
                </tr>
                <tr>
                    <th>WareHouse_ID</th>
                    <td>{warehouse_Item.warehouse_id}</td>
                </tr>
                <tr>
                    <th>location</th>
                    <td>{warehouse_Item.location? warehouse_Item.location : '--'}</td>
                </tr>
                <tr>
                   <th>created_at</th>
                   <td>{warehouse_Item.created_at}</td>
                </tr>
                <tr>
                  <th>retail_price</th>
                  <td>{warehouse_Item.retail_price}</td>
                </tr>
                <tr>
                  <th>masterFile_item_id</th>
                  <td>{warehouse_Item.masterFile_item_id}</td>
                </tr>
            </Table>        
        </Modal.Body>
      </Modal>


      <Modal show={show_item_list} onHide={handleClose_List}>
        <Modal.Header closeButton>
          <Modal.Title>List of Items in Masterfile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ReactLoader loaded={loader}  length={10}  radius={20}  width={10} >
              <Form.Select  onChange={($event)=> change_master_file($event)}>
                {MasterFile_Items.map((item,index)=>{
                    return(
                        <option key={index} value={item.item_code} > {item.description+ '-'+ item.item_code } </option>
                    )
                })}
              </Form.Select>
              <p className="my-2 text-dark">{search_result}</p>
           </ReactLoader> 
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
            <Button className="btn btn-success " onClick={()=> AttachItemToWareHouse()}>Attach Item to WareHouse</Button>
            <Button className="btn btn-primary " onClick={()=> Search_Item()}>Search Item</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show_Location} onHide={handleClose_Location}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item Location </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
             <Form.Label>Location</Form.Label>
             <Form.Control value={warehouse_Item.location} onInput={($event)=> change_Item_location($event)} type="Text" placeholder="Enter Location" />
           </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
            <Button className="btn btn-success " onClick={()=> updateLocation()}>Update Location</Button>
        </Modal.Footer>
      </Modal>
        </React.Fragment>
    );
}

export default WarehouseDetails;
