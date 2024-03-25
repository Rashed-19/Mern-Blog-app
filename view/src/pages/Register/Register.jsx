import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const response = await axios.post('/auth/register', {
                username, password, email,
            })
            console.log(response);
            response.data && window.location.replace('/login')
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Usrname</label>
                <input 
                type="text" 
                className="registerInput" 
                placeholder="Enter your username..."
                onChange={e=> setUsername(e.target.value)}
                />
                <label>Email</label>
                <input 
                type="email" 
                className="registerInput" 
                placeholder="Enter your email..."
                onChange={e=> setEmail(e.target.value)}
                />
                <label>Password</label>
                <input 
                type="password" 
                className="registerInput" 
                placeholder="Enter your password..."
                onChange={e=> setPassword(e.target.value)}
                />
                <button 
                className="registerButton"
                type="submit" 
                >Register</button>
            </form>
                <button className="registerLoginButton">
                <Link to="/login" style={{textDecoration: "none", color: "inherit" }} >Login</Link>
                </button>
                {error && <span style={{color: "red", marginTop: "9px"}}>Something went wrong</span>}
        </div>
    )
}
