import React from 'react'
import { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import M from "materialize-css"
import { UserContext } from '../../App'

const Login = () => {
  
    const {state, dispatch} = useContext(UserContext)
   const navigate = useNavigate()

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const PostData = () => {

      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html:"Please enter valid email", classes:"#e53935 red darken-1"})
          return
      }

        fetch("/signin",{
            method:"post",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
              M.toast({html:data.error,classes:"#e53935 red darken-1"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))

                dispatch({type:"USER", payload:data.user})

                M.toast({html:"Signed in Successfully",classes:"#4caf50 green darken-1"})
                navigate("/")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <div className='signin-card-div'>
            <div className='card signin-card input-field'>

            <img className="brandphoto" src={process.env.PUBLIC_URL + '/Social.png'} />
                
                <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                <button className="postbtn" onClick={()=>PostData()}>LOGIN
                </button>
             <h6 className='donthave'>
                <Link to="/signup">Don't have account? SignUp here</Link>
                </h6>
            </div>
        </div>
         <div className='foot-div'>
         <h5 className='dev_id'>Coded with <i class="material-icons">favorite</i> by Abhishek | </h5>
         <p>
         <Link to={{ pathname: "https://www.linkedin.com/in/abhishek-dhanke-226354216/" }} target="_blank" /><i class="material-icons">account_circle</i>
         </p>
     </div>
     </>
    )
}

export default Login
