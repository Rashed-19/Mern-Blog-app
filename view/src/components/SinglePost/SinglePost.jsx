import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './singlePost.css'
import { Context } from '../../context/Context'

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({})
    const { user } = useContext(Context)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const result = await axios.get("/posts/" + path);
            setPost(result.data);
            setTitle(result.data.title);
            setDescription(result.data.description);
        }
        getPost();
    },[path])

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: {username: user.username},
            })
            window.location.replace("/")
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                description
            });
            //window.location.reload();
            setUpdateMode(false);
        } catch (error) {
            console.log(error);
        }
    }
    const PF = "http://localhost:5000/images/"
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img 
                    width="100%"
                    src={PF+post.photo}
                    alt="postImage" 
                    className="singlePostImg"
                    />
                )}
                {updateMode ? <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                autoFocus className="singlePostTitleInput" /> :
                 <h1 className="singlePostTitle">
                     {title}
                     {post.username === user?.username && 
                     <div className="singlePostEdit">
                     <i className="singlePostIcon far fa-edit" onClick={()=> setUpdateMode(true)}></i>
                     <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                     </div>
                    }
                 </h1>
                    }
                 <div className="singlePostInfo">
                     <Link to={`/?user=${post.username}`} className="link" >
                     <span className="singlePostAuthor"> Author: <b>{post.username}</b>
                      </span>
                      </Link>
                      <span className="singlePostDate">
                      {new Date(post.createdAt).toDateString()}
                          </span>
                 </div>
                 {updateMode ? <textarea className="singlePostDescInput" value={description} onChange={(e) => setDescription(e.target.value)} /> :
                 <p className="singlePostDesc">
                   {description}
                 </p>
                }
                {updateMode &&
                <button className="singlePostButton" onClick={handleUpdate}>Update Post</button>
                }
            </div>
        </div>
    )
}
