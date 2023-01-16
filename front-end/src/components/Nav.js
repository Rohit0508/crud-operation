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
            <ul className="nav-ul">
                <li><Link to ='/'>products</Link></li>
                <li><Link to ='/add'>add products</Link></li>
                <li><Link to ='/update'>Update products</Link></li>
                
                <li><Link to ='/profile'>user profile</Link></li>

                {
                    auth ?<li><Link onClick={logout} to ='/signup'> logout !</Link></li>
                    :<>
                    <li><Link to ='/login'>login</Link></li>
                    <li><Link to ='/signup'>SignUp user</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}
export default Nav;