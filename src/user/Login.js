import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
// import Header from "../Header";
import './user.css';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory("");
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/masterfile');
        }
    }, [])
    async function login() {
        let item = { email, password }
        let result = await fetch("http://stockapi.ghonaim.com/api/stock/members/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        if (!result) {
            history.push('/login')
        } else {
            // localStorage.setItem("user-info", JSON.stringify(result))
            localStorage.setItem("token", JSON.stringify(result.data[0].access_token))
            history.push('/masterfile')
        }

    }
    return (
        <>
            {/* <Header /> */}
            <div className='col-sm-6 offset-sm-3 login_page'>
                <h1>login</h1>
                <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='form-control' />
                <br />
                <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='form-control' />
                <br />
                <button className='btn btn-primary' onClick={login} >login</button>
            </div>
        </>
    )
}
export default Login