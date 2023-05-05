import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';


const Home = () => {

    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/allpost`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {

                setData(result.posts)
            })
    }, [])


    const likePost = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/like`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ postId: id })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return { ...item, likes: result.likes }
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/unlike`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ postId: id })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return { ...item, likes: result.likes }
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    /*   const makeComment = (text,postId) => {
            fetch(" /comment",{
                method:"put",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    postId,
                    text
                })
            }).then(res=>res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                   if (item._id == result._id) {
                       return { ...item, likes: result.likes }
                   } else {
                       return item
                   }
                   
               })
               setData(newData)
            }).catch(err => {
                console.log(err)
            })
       }*/

    /*  const deleteComment = (postId,commentId)=>{
          fetch(`/deletecomment/${postId}/${commentId}`,{
            method:"delete",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
          }).then(res=>res.json())
          .then(result=>{
            const newData = data.map(item=>{
              if (item._id == result._id) {
                  return { ...item, likes: result.likes }
              } else {
                  return item
              }
          })
          setData(newData);
          toast.error("Comment Deleted Successfully",{position: toast.POSITION.TOP_CENTER});
        })
        }*/

    const deletePost = (postid) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                //console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }

    return (

        <div className='home-big-div'>
            {
                data.map(item => {

                    return (
                        <div className='home' key={item._id}>
                            <h5 style={{ padding: "5px" }}><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>{item.postedBy.name}</Link> {item.postedBy._id == state._id
                                && <i className="material-icons" style={{
                                    float: "right"
                                }}
                                    onClick={() => deletePost(item._id)}
                                >delete</i>

                            }</h5>
                            {/*    <h5 className='postedbyname'>{item.postedBy.name}</h5> */}
                            <div className="card-image">
                                <img className="img" src={item.photo} alt='cardimage' />
                            </div>
                            <div className='card-content'>


                                {item.likes.includes(state._id)
                                    ?
                                    <div className='likeunlike'>
                                        <i className="material-icons" style={{ color: "red" }} onClick={() => { likePost(item._id) }}>thumb_up</i>
                                        <i className="material-icons" onClick={() => { unlikePost(item._id) }}>thumb_down</i>
                                    </div>
                                    :

                                    <i className="material-icons" onClick={() => { likePost(item._id) }}>thumb_up</i>

                                }
                                <h6 style={{ fontWeight: 900 }}>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>

                                {
                                    item.comments.map(record => {
                                        return (
                                            <h5><span key={record._id} style={{ fontWeight: 550 }}>{record.postedBy.name}</span>{record.text}</h5>
                                        )
                                    })

                                }
                            </div>

                        </div>
                    )
                })
            }
        </div>

    )
}

export default Home

