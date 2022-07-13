import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import M from "materialize-css"


const Login = () => {

   const navigate = useNavigate()

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const PostData = () => {


      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html:"Please enter valid email", classes:"#e53935 red darken-1"})
          return
      }

        fetch("/signup",{
            method:"post",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
              M.toast({html:data.error,classes:"#e53935 red darken-1"})
            }
            else{
                M.toast({html:data.message,classes:"#4caf50 green darken-1"})
                navigate("/login")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <div className='signin-card-div' >
            <div className='card signin-card input-field'>

            <img className="brandphoto" src={process.env.PUBLIC_URL + '/Social.png'} />
                <input type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Create your Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button className="postbtn" onClick={()=>PostData()}>SignUp
                </button>
             <h6 className='donthave'>
                <Link to="/login">Already have an account? Login</Link>
                </h6>
            </div>
        </div>
        <div className='foot-div'>
         <h6 className='dev_id'>Coded with ❤️ by Abhishek | </h6>
         <div className='linkicon-div'><h6>
         <a target="_blank" href="https://www.linkedin.com/in/abhishek-dhanke-226354216/"><i class="material-icons">account_circle</i></a>
         </h6></div>
     </div>
</>

    )
}

export default Login
