import React , { useState, useEffect} from 'react';
import axiosIstance from '../../Config/config';
import Button from 'react-bootstrap/Button';
import './PostReceiving.css'
const PostReceiving = () => {
  
  const [receivingSlip_id, setReceivingSlip_id] = useState('');
  const [resMsg, setResMsg] = useState('');
    var slip ={
        _method :'put',
        receivingSlip_id:receivingSlip_id
    }
  const PostSlip =()=>{
    axiosIstance.post(`receivingSlips/post`,slip).then(res=>{
      console.log("rec slip res", res);
      setResMsg(res.data.message);
    })
  }
  
  // useEffect(() => {
  // getItemDetails()
  // },[])


    return (
      <React.Fragment>
               

        <div className='col-sm-4 offset-sm-4 PostReceiving_wrapper'>
        <h1>PostReceiving</h1>
            <div className='row justify-content-center'>

            <input className="form-control mx-1" list="datalistOptions" type="number" onInput={(e)=>{setReceivingSlip_id(e.target.value)}} placeholder="Enter Reciving Slip Id"></input>
            <Button className='btn btn-primary mb-3'onClick={PostSlip} >Post</Button>
            </div>
            {resMsg ? <h5>{resMsg}</h5> : ''}
        </div>

      </React.Fragment>      
    );
}

export default PostReceiving;
