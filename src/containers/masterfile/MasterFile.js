import React, { useState, useEffect } from "react";
import { BrowserRouter,Route } from 'react-router-dom';
import Index from '../../components/masterfile/Index';

import Header from "../../Header";
function MasterFile() {
   
    return (
        <>

            <div className='col-sm-6 offset-sm-3'>
                {/* < /> */}
                <BrowserRouter>
                    <Route path='/masterfile' exact>
                            <Index/>
                    </Route>
                </BrowserRouter>


                {/* <Store />
                <Edit /> */}
            </div>
        </>
    )
}
export default MasterFile