import React, { useState, useEffect } from "react";
import { BrowserRouter,Route } from 'react-router-dom';
import Index from '../../components/masterfile/Index';
import Store from '../../components/masterfile/Store';
import Edit from '../../components/masterfile/Edit';
import Show from '../../components/masterfile/Show';

import Header from "../../Header";
function MasterFile() {
   
    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3'>
                <h1>Master File</h1>
                {/* < /> */}
                <BrowserRouter>
                    <Route path='/masterfile' exact>
                            <Index/>
                    </Route>
                    {/* <Route path='/masterfile/:id' exact>
                            <Show/>
                    </Route> */}
                    <Route path='/masterfile/store'>
                            <Store/>
                    </Route>
                    <Route path='/masterfile/edit'>
                            <Edit/>
                    </Route>
                </BrowserRouter>


                {/* <Store />
                <Edit /> */}
            </div>
        </>
    )
}
export default MasterFile