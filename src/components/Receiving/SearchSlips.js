import React , { useState, useEffect }from 'react';
import axiosIstance from './../../Config/config';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

const SearchSlips = ({searchedKey,show,close}) => {

    const [searchedSlip,setSearchedSlip] = useState({})
    // const [searchedKey,setSearchedKey] = useState({})

    const getSilpssOfWarehouse = ()=>{
        var searched_item = 
        {
            warehouse_id : params.id,
            key : searchedKey,
        }

        axiosIstance.post('receivingSlips/index',searched_item).then(response=>{
          console.log(response)
          setSilps(response.data.data)
        })
      }
    
    useEffect(() => {
    getItemDetails()
    },[])


    return (
        <React.Fragment>
 
        <Table>
                
        </Table> 
             
        </React.Fragment>
    );
}

export default SearchSlips;
