import React,{useEffect} from "react"
import { useHistory } from "react-router-dom";

function UnAuth(props){
    let Cmp = props.Cmp
    const history = useHistory("");
    useEffect(()=>{
        if(!localStorage.getItem('token'))
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
export default UnAuth