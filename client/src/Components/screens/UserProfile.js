import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'


const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const [followed,setFollowed] = useState(false)
    const {state,dispatch} = useContext(UserContext)

    const {userid} = useParams()
  
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    },[])

    const follow = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/follow`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((previous) => {
                return {
                    ...previous,
                    user:{
                      ...previous.user,
                        followers:[...previous.user.followers, data._id]
                      
                    }
                }
            })
            setFollowed(true);
        })
    }

    const unfollow = () => {
        fetch("${process.env.REACT_APP_BACKEND_URL}/unfollow",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((previous) => {
                const newFollower = previous.user.followers.filter(item => item != data._id)
                return {
                    ...previous,
                    user:{
                      ...previous.user,
                        followers:newFollower
                    }
                }
            })
            setFollowed(false)
        })
    }

    return (
        <>
       {userProfile ?
       <div style={{maxWidth:"550px",margin:"50px auto"}}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               <div>
                   <img className='profilepic'
                   src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                   />
               </div>
               <div>
                   <h4>{userProfile.user.name}</h4>
                   <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6> {userProfile.user.followers.length} followers</h6>
                       <h6> {userProfile.user.following.length} following</h6>
                   </div>

                 {followed ? <button className="postbtn" onClick={()=>unfollow()}>UNFOLLOW
                </button> : <button className="postbtn" onClick={()=>follow()}>FOLLOW
                </button>}
                
               </div>
           </div>
     
           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
       
       
       : 
       <div class="progress" style={{background:"white",height:"1rem",marginTop:"5rem"}}>
       <div class="indeterminate" style={{background:"#2196f3"}}></div>
   </div>}
       
       </> )
   
}

        

export default Profile
