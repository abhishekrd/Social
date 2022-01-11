import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from '../../App'

const Profile = () => {

    const[mypics,setPics] = useState([])
    const{state,dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
           setPics(result.mypost)
        })
    },[])
    return (
        <div style={{maxWidth:"50rem", margin:"0rem auto"}}>
        <div style={{display:"flex",
            gap:"1rem",
            alignItems: "center",
            padding:"2rem",
            borderBottom:"0.1rem solid grey"}}>
            <div>
              <img className="profilepic" src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'/>
            </div>
            <div>
             <h2>{state?state.name:"Loading"}</h2>
             <div style={{
                 display:"flex",
                 alignItems:"center",
                 gap:"1rem"
             }}>
                 <h6>25 posts</h6>
                 <h6>200 followers</h6>
                 <h6>150 following</h6>
             </div>
            </div>
        </div>


        <div className='gallery'>

            {
                mypics.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                    )
                })
            }
            
           
            
        </div>
        </div>
    )
}

export default Profile
