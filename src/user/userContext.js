
import { useState, createContext,useEffect } from "react";

export const UserContext = createContext("def");

function UserContextProvider(props) {
	const [token, setToken] = useState('');
	const [logged, setLogged] = useState(false);
	useEffect(() => {
        if (localStorage.getItem('token')) {
			setToken(localStorage.getItem('token'));
			setLogged(true);
        }
		else
		{
			setToken('');
			setLogged(false);
		}
    }, [logged])
	console.log('logged', logged);
	return (
	  <UserContext.Provider value={{token,setLogged}} >
		{props.children}
	  </UserContext.Provider>
	);
  }
  export default UserContextProvider;
