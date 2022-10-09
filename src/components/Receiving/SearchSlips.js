import React , { useState, useEffect }from 'react';
import axiosIstance from './../../Config/config';
import { useParams } from "react-router";
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

const SearchSlips = ({searchedKey,setSearchSlipIsLoading,setSearchSlipError,Search_slip}) => {
    const [searchedSlips,setSearchedSlips] = useState({})
    
    console.log('testing from seacrh slip');
    // const [searchSlipIsLoading, setSearchSlipIsLoading] = useState(false);
    // const [searchSlipError, setSearchSlipError] = useState(null);
    const params = useParams();

const getSilpssOfWarehouse = () => {
      // if (!searchedKey) {
      //   console.log('testing from seacrh slip 2');
      //   setSearchSlipError("Please Enter Po Number !!");
      //   return;
      // }
        var searched_item = 
        {
            warehouse_id : params.id,
            key : searchedKey,
        }
        try {
          console.log('testing from seacrh slip 3');
          axiosIstance.post('receivingSlips/index',searched_item).then((res) => {
            setSearchSlipIsLoading(false);
            console.log(res);
            if (res.data.status && res.data.data.length > 0) {
              // setOpenSlip(false);
              setSearchedSlips(res.data.data) 
            } else {
              // setLoadedSlip("");
              setSearchSlipError(res.data.message);
            }
          });
        } catch (error) {
          setSearchedSlips("");
          // setSearchSlipIsLoading(false);
          setSearchSlipError("Error !!");
        }
        // try {    
        //       axiosIstance.post('receivingSlips/index',searched_item).then(response=>{
        //         console.log('searched', response)
        //             if ( response) {
        //             // setOpenSlip(false);
        //             setSearchedSlips(response.data.data)      
        //             }
        //             else {
        //               setSearchedSlips("");
        //             // setSearchSlipError(response.data.message);
        //           }
        //         });
        //   }

  };   
  useEffect(() => { 
    getSilpssOfWarehouse()
  }, [searchedKey]);

    return (
        <React.Fragment>
 
 <Table bordered hover size="lg">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>PO_number</th>
						<th>Supplier Name</th>
                        <th>Status</th>
                        <th>Created_at</th>
                        <th>Actions</th>
                    </tr>

                    </thead>
                    <tbody>
                    { searchedSlips.length > 1 ?
                    searchedSlips.map((silp,index)=>{
                        return (
                            <tr key={index}>
                               <td>{silp.id}</td>
                               <td>{silp.PO_number}</td>
							   <td>{silp.supplier_name}</td>
                               <td>{silp.status}</td>
                               <td>{silp.created_at}</td>
                               <td>
                                <div className='d-flex'>
                                <Button className='m-1' onClick={()=> {Search_slip(silp.id);}}>Details</Button>
                                </div>
                               </td>
                            </tr>
                        )
                    }) : ''
                }

                    </tbody>
                 </Table>
             
        </React.Fragment>
    );
}

export default SearchSlips;
