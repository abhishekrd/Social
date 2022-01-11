import React,{useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
     
     const {state,dispatch} = useContext(UserContext)
     const navigate =  useNavigate()
     const renderList = () => {
       if(state){
         return[
          <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Createpost</Link></li>,
        <button className="logout" onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        navigate("/login")
        }}>LOGOUT
        </button>,
         
         ]
       }
       else{
         return[
          <li><Link to="/login">Login</Link></li>,
          <li className="signuplink"><Link to="/signup">SignUp</Link></li>
         ]
       }
     }
    return(
  <div className="navbar-fixed">
    <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/login"} className="brand-logo"><img className="brandphoto" src={process.env.PUBLIC_URL + '/Social.png'} /> </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
       {renderList()}
      </ul>
      
      <div className="responsive">
      {renderList()}
      </div>
    </div>
  </nav>
    </div>

    
    )
}

export default NavBar