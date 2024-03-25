import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './navbar.css'

const Navbar = () => {
    const {user, dispatch} = useContext(Context)

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
    }
    return (
        <div className="top">
           <div className="topLeft">
           <i className="topIcon fab fa-facebook-square"></i>
           <i className="topIcon fab fa-instagram-square"></i>
           <i className="topIcon fab fa-twitter-square"></i>
           <i className="topIcon fab fa-linkedin"></i>
           </div>
           <div className="topCenter">
               <ul className="topList">
                   <li className="topListItem">
                       <Link to="/" style={{textDecoration: "none", color: "inherit" }}>Home</Link>
                   </li>
                   <li className="topListItem">
                   <Link to="/about" style={{textDecoration: "none", color: "inherit" }}>About</Link>
                   </li>
                   <li className="topListItem">
                   <Link to="/contact" style={{textDecoration: "none", color: "inherit" }}>Contact</Link>
                   </li>
                   <li className="topListItem">
                   <Link to="/write" style={{textDecoration: "none", color: "inherit" }}>Write</Link>
                   </li>
                   <li className="topListItem" onClick={handleLogout}>{user && 'Logout'}</li>
               </ul>
           </div>
           <div className="topRight">
               {user ? (
                   <Link to="/setting">
                   <img 
                   className="topImg"
                   src={user.profilPic}
                   alt="sajib" />
                   </Link>
               ): (
                <ul className="topList">
                <li className="topListItem">
                    <Link to="/login" style={{textDecoration: "none", color: "inherit" }}>Login</Link>
                    </li>
                    <li className="topListItem">
                    <Link to="/register" style={{textDecoration: "none", color: "inherit" }}>Register</Link>
                    </li>
                </ul>
               )}
               <i className="topSearchIcon fas fa-search"></i>
           </div>
        </div>
    )
}

export default Navbar
