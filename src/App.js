import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route , Redirect } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';

import ListProduct from './WareHouse/Warehous_List';
import MasterFile from './containers/masterfile/MasterFile';
import UnAuth from './Guard/UnAuth';
import Auth from './Guard/Auth';
import WarehouseDetails from './WareHouse/Warehouse_Details';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Route path='/login'>
          <Auth Cmp={Login}/>
        </Route>

        {/* <Route path='/register'>
        <Auth Cmp={Register}/>
        </Route> */}

        <Route path='/'>
          <Redirect to='/masterfile' />
        </Route>

        <Route path='/masterfile'>
          {/* <MasterFile/> */}
          <UnAuth Cmp={MasterFile} />
        </Route>

        <Route path='/list'>
          <UnAuth Cmp={ListProduct}/>
        </Route>

        <Route path='/warehouse/:id'>
          <UnAuth Cmp={WarehouseDetails}/>
        </Route>

    </BrowserRouter>
    </div >
  );
}

export default App;
