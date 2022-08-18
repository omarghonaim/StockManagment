import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import Header from "../Header";

function Register() {
    const history = useHistory("");
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/add');
        }
    }, [])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signUp() {
        let data = { name, email, password }
        let result = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem('token', JSON.stringify(result.data[0].access_token));
        history.push("/add");
    }
    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3'>
                <h1>Register site</h1>
                <input type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} className='form-control' />
                <br />
                <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='form-control' />
                <br />
                <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='form-control' />
                <br />
                <button className='btn btn-primary' onClick={signUp} >Submit</button>
            </div>
        </>
    )
}
export default Register