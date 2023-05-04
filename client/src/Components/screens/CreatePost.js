//import res from 'express/lib/response';
import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const CreatePost = () => {
    
    const navigate = useNavigate()
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");

    useEffect(() => {
      if(url){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/createpost`,{
          method:"post",
          headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              title,
              body,
              pic:url
          })
      }).then(res=>res.json())
      .then(data=>{
       
          if(data.error){
            M.toast({html:data.error,classes:"#e53935 red darken-1"})
          }
          else{
              M.toast({html:"Posted Successfully",classes:"#4caf50 green darken-1"})
              navigate("/")
          }
      }).catch((err) => {
          console.log(err)
      })
  }
      }
      
    , [url])

    const postDetails = () => {
      const data = new FormData();
      data.append("file",image);
      data.append("upload_preset","MERN Social Media Clone");
      data.append("cloud_name","ardavazc3");
      fetch("https://api.cloudinary.com/v1_1/ardavazc3/image/upload",{
        method:"post",
        body:data
      })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })

    }

    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"2rem"
        }}>
        <div className="input-field" style={{padding:"3rem",
        maxWidth:"50rem",
        marginTop:"5rem",
        borderRadius:"1rem",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.233)"}}>
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder='Body' value={body} onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
      <div className="uploadbtn">
        <span>Upload Photo</span>
        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"  placeholder='Select photo to upload'/>
      </div>
    </div>
    <div style={{textAlign:"center"}}>
    <button className="postbtn"
    onClick={() => postDetails()}>POST
                </button>
                </div>
        </div>
        </div>
    )

      }
export default CreatePost
