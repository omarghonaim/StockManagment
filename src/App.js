import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import AddProduct from './products/AddProduct';
import UpdateProduct from './products/UpdateProduct';
import ListProduct from './products/ListProduct';
import MasterFile from './containers/masterfile/MasterFile';
import Protect from './Protect';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/login'>
          <Login/>
        </Route>
        {/* <Route path='/register'>
          <Register/>
        </Route> */}
        <Route path='/masterfile'>
          <MasterFile/>
        </Route>

        <Route path='/add'>
          <Protect Cmp={AddProduct}/>
        </Route>
        <Route path='/update'>
          <Protect Cmp={UpdateProduct}/>
        </Route>
        <Route path='/list'>
          <Protect Cmp={ListProduct}/>
        </Route>
    </BrowserRouter>
    </div >
  );
}

export default App;
