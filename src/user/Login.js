import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../user/userContext";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import Header from "../Header";
import "./user.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory("");
  const tokenContext = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/masterfile");
    }
  }, []);
  async function login() {
    setErrorMessage(null);
    setIsLoading(true);
    let item = { email, password };
    try {
      let result = await fetch(
        "http://stockapi.ghonaim.com/api/stock/members/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      result = await result.json();
      setIsLoading(false);
      if (!result) {
        history.push("/login");
      } else {
        if (result.code === 200) {
          handleLoggedSuccessfully(result);
        } else {
          setErrorMessage(result.message);
        }
      }
    } catch (error) {
      setErrorMessage("Error !!");
      setIsLoading(false);
    }
  }

  function handleLoggedSuccessfully(result) {
    tokenContext.setLogged(true);
    localStorage.setItem("token", JSON.stringify(result.data[0].access_token));
    history.push("/masterfile");
  }

  return (
    <>
      {/* <Header /> */}
      <div className="col-sm-6 offset-sm-3 login_page">
        <h1>login</h1>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <br />
        <div className="errorMessage">{errorMessage}</div>
        <Button variant="primary" onClick={login}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "login"
          )}
        </Button>
      </div>
    </>
  );
}
export default Login;
