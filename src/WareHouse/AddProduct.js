import Header from "../Header";
import React, { useState, useEffect } from "react"
function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
 async function add() {
        const formData = new FormData();
        formData.append('file',file);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('name',name);
        let result = await fetch("http://127.0.0.1:8000/api/addproduct",{
            method:"POST",
            body:formData
        });
    }
    return (
        <>
            <Header />
            <div>
                <h1>AddProduct site</h1>
                <div className='col-sm-6 offset-sm-3'>
                    <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} className='form-control' />
                    <br />
                    <input type='text' placeholder='Price' onChange={(e) => setPrice(e.target.value)} className='form-control' />
                    <br />
                    <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} className='form-control' />
                    <br />
                    <input type='file' onChange={(e) => setFile(e.target.files[0])} className='form-control' />
                    <br/>
                    <button className='btn btn-primary' onClick={add}>add product</button>
                </div>
            </div>
        </>
    )
}
export default AddProduct