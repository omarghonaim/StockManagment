import { useContext, useState, useSyncExternalStore } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link,useHistory } from 'react-router-dom';
import {UserContext} from './user/userContext';
import './header.css';

function Header() {
    const history = useHistory('');
	const tokenContext = useContext(UserContext);
	console.log("999", tokenContext);

    function logOut(){
        localStorage.clear();
        history.push('/login');
		tokenContext.setLogged(false);
    }
    let user = JSON.parse(localStorage.getItem('token'))
    return (
        <div className='header'>
            <Navbar>

                <a href="/" className='logo_text'>STOCK MANAGEMENT</a>
                <Nav className="me-auto navbar_wrapper links">
                    {
                        tokenContext.token ?
                            <>
                                {/* <Link to="/add">add product</Link>
                                <Link to="/update">update product</Link> */}
                                <Link to="/masterfile">masterfile</Link>
                                <Link to="/list">WareHouse</Link>

                            </>
                             :
                            <>
                                <Link to="/login">login</Link>
                            </>
                    }

                </Nav>
                {
                    localStorage.getItem('token')?
                <Nav style={{marginRight:'120px'}} >
                    <NavDropdown title={user && user.name}>
                        <NavDropdown.Item onClick={logOut} >logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>:null
                }


            </Navbar>
        </div>
    )
}
export default Header