// import logo from './logo.svg';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./user/Login";
// import Register from './user/Register';

import Header from './Header';
import ListProduct from './WareHouse/Warehous_List';
import MasterFile from './containers/masterfile/MasterFile';
import PostReceiving from './components/Receiving/PostReceiving';
import UnAuth from './Guard/UnAuth';
import Auth from './Guard/Auth';
import UserContextProvider from './user/userContext';
import WarehouseDetails from './WareHouse/Warehouse_Details';
import WarehouseReceivig from './components/Receiving/WarehouseReceivig';

import './App.css';



function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Header />
          {/* {localStorage.getItem('token') ? : ''} */}
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          <Route path="/login">
            <Auth Cmp={Login} />
          </Route>

          {/* <Route path='/register'>
        <Auth Cmp={Register}/>
        </Route> */}

<<<<<<< movements
        <Route path='/'>
          <Redirect to='/masterfile' />
        </Route>

        <Route path='/masterfile'>
          {/* <MasterFile/> */}
          <UnAuth Cmp={MasterFile} />
        </Route>
        <Route path='/postReceiving'>
          {/* <MasterFile/> */}
          <UnAuth Cmp={PostReceiving} />
        </Route>
        <Route path='/postReceiving/warehouse/:id'>
          {/* <MasterFile/> */}
          <UnAuth Cmp={WarehouseReceivig} />
        </Route>

        <Route path='/list'>
          <UnAuth Cmp={ListProduct}/>
        </Route>

        <Route path='/warehouse/:id'>
          <UnAuth Cmp={WarehouseDetails}/>
        </Route>

    </BrowserRouter>
	</UserContextProvider>
    </div >
=======
          <Route path="/">
            <Redirect to="/masterfile" />
          </Route>

          <Route path="/masterfile">
            {/* <MasterFile/> */}
            <UnAuth Cmp={MasterFile} />
          </Route>
          <Route path="/postReceiving">
            {/* <MasterFile/> */}
            <UnAuth Cmp={PostReceiving} />
          </Route>

          <Route path="/list">
            <UnAuth Cmp={ListProduct} />
          </Route>

          <Route path="/warehouse/:id">
            <UnAuth Cmp={WarehouseDetails} />
          </Route>
        </BrowserRouter>
      </UserContextProvider>
    </div>
>>>>>>> master
  );
}

export default App;
