import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './sidebar.css'

export default function Sidebar() {
    const [cats, setCats] = useState([])

    useEffect(() => {
        const getCats = async () => {
        const result = await axios.get("/categories")
        setCats(result.data);}
        getCats();
    },[])
    return (
        <div className="sidebar">
           <div className="sidebarItem">
              <span className="sidebarTitle">About Me</span>
              <img 
               src="https://pbs.twimg.com/profile_images/1404642845596667904/BEzbeWoh_400x400.jpg" 
               alt="sajib" />
               <p>Hi there, I am Sajib.</p>
            </div> 

            <div className="sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
                {cats.map((cat) => (
                    <Link key={cat._id} to={`/?cat=${cat.name}`} className="link" >
                <li className="sidebarListItem">{cat.name}</li>
                </Link>
                ))}
            </ul>
            </div>
 
            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Me</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-linkedin"></i>
                </div>
            </div>

        </div>
    )
}
