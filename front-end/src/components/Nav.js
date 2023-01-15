import React from "react";
import { Link } from "react-router-dom";
const Nav =()=>{
    return(
        <div>
            <ul className="nav-ul">
                <li><Link to ='/'>products</Link></li>
                <li><Link to ='/add'>add products</Link></li>
                <li><Link to ='/update'>Update products</Link></li>
                <li><Link to ='/logout'> logout !</Link></li>
                <li><Link to ='/profile'>user profile</Link></li>
                <li><Link to ='/signup'>SignUp user</Link></li>
            </ul>
        </div>
    )
}
export default Nav;