import { useContext, useState, useSyncExternalStore } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from "./user/userContext";
import "./header.css";

function Header() {
  const history = useHistory("");
  const tokenContext = useContext(UserContext);
  console.log("999", tokenContext);

  function logOut() {
    localStorage.clear();
    history.push("/login");
    tokenContext.setLogged(false);
  }
  let user = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="header">
      <Navbar>
        <a href="/" className="logo_text">
          STOCK MANAGEMENT
        </a>
        <Nav className="me-auto navbar_wrapper links">
          {tokenContext.token ? (
            <>
              {/* <Link to="/add">add product</Link>
                                <Link to="/update">update product</Link> */}
              <NavLink
                to="/masterfile"
                className={(isActive) => (isActive ? "" : "unselectedLink")}
              >
                MasterFile
              </NavLink>
              <NavLink
                to="/list"
                className={(isActive) => (isActive ? "" : "unselectedLink")}
              >
                StockCard
              </NavLink>
              <NavLink
                to="/postReceiving"
                className={(isActive) => (isActive ? "" : "unselectedLink")}
              >
                Receiving
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">login</NavLink>
            </>
          )}
        </Nav>
        {localStorage.getItem("token") ? (
          <Nav style={{ marginRight: "120px" }}>
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logOut} className="text-primary">
                logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
}
export default Header;
