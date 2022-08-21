import React,{useEffect} from "react"
import { useHistory } from "react-router-dom";

function Auth(props){
    let Cmp = props.Cmp
    const history = useHistory("");
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
            history.push('/');
        }
    },[])

    return(
        <div>
            <Cmp />
        </div>
    )
}
export default Auth