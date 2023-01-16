import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Login=() => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');//to check wether the user is already signedup or not 
        //while loading the page
        if (auth) {
            navigate( '/');
        }
    })
    const handleLogin=async()=>{
        console.log(email,password);
        let result = await fetch("http://localhost:6800/login", {
            method: 'post',
            body: JSON.stringify({email, password }),
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name)
        {
            localStorage.setItem("user",JSON.stringify(result));
            navigate( '/');
        }
        else
        {
            alert("please enter valid details");
        }
    }
    return  (
        <div className="login">
           <input className="inputBox" type="text" placeholder="enter email"
           onChange={(e) => setEmail(e.target.value)} value={email}/>
           <input className="inputBox" type="password"  placeholder="enter password"
           onChange={(e) => setPassword(e.target.value)} value={password}/>
           
           <button onClick={handleLogin} className="appButton" type="button">log in</button>
        
        </div>
    )
}

export default Login;