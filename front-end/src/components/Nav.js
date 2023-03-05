import React,{useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
const Nav =()=>{
    const auth = localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{ //to logout and clear data from localstorage
        localStorage.clear();
        navigate('/signup'); //alternate way to redirect on sign up page
    }
    return(
        
        <div>
            <img alt="logo" className="logo" src="https://images-platform.99static.com//wpRpNVHHAEcVppwtrfI4quxaL00=/135x1436:1198x2492/fit-in/590x590/99designs-contests-attachments/101/101749/attachment_101749495"
            />
         {auth ?   <ul className="nav-ul">
                <li><Link to ='/'>products</Link></li>
                <li><Link to ='/add'>add products</Link></li>
                <li><Link to ='/update'>Update products</Link></li>
                
                <li><Link to ='/profile'>user profile</Link></li>
                <li><Link onClick={logout} to ='/signup'> logout({JSON.parse(auth).name})</Link></li>
                
            </ul>

            :<ul className="nav-ul nav-right">
                <li><Link to ='/login'>Login</Link></li>
                    <li><Link to ='/signup'>SignUp</Link></li>
            </ul>
            }
        </div>
        
    )
}
export default Nav;