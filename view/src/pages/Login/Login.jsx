import { useContext, useRef } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../context/Context'
import './login.css'

export default function Login() {

    const userRef = useRef()
    const passwordRef = useRef()
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'})
        try {
            const res = await axios.post("/auth/login",{
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
        } catch (error) {
            dispatch({type: 'LOGIN_FAILURE'})
            console.log(error);
        }
    } 

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="loginInput" 
                ref={userRef}
                placeholder="Enter your username..." />
                <label>Password</label>
                <input type="password" className="loginInput" 
                ref={passwordRef}
                placeholder="Enter your password..." />
                <button className="loginButton" type="Submit" disabled={isFetching}>Login</button>
            </form>
                <button className="loginRegButton" >
                    <Link to="/register" style={{textDecoration: "none", color: "inherit" }} >Register</Link>
                </button>
        </div>
    )
}
