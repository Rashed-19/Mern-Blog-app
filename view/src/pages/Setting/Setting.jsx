import { useContext, useState } from 'react'
import axios from 'axios'
import './setting.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import {Context} from '../../context/Context'

export default function Setting() {
    const { user, dispatch } = useContext(Context) 
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

   console.log(user);

    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch({type: 'UPDATE_START'})
        try {
            const res = await axios.put(`/users/${user._id}`, {
                userId: user._id,
                username,
                email,
                password,
            });
            setSuccess(true)
            dispatch({type: 'UPDATE_SUCCESS', payload: res.data})
        } catch (error) {
            console.log(error);
            dispatch({type: 'UPDATE_FAILURE'})
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${user._id}`)
            window.location.replace("/")         
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="setting">
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">Update Your Account</span>
                    <span className="settingDeleteTitle">Delete Your Account</span>
                </div>
                <form className="settingForm" onSubmit={handleUpdate}>
                    <label>Profile Picture</label>
                    <div className="settingPP">
                        <img 
                        src={user.profilPic}
                        alt="userPP" 
                        />
                    <label htmlFor="fileInput">
                        <i className="settingPPIcon fas fa-user-circle"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: 'none'}} />
                    </div>
                    <label> Username </label>
                    <input type="text" placeholder={user.username} onChange={(e)=> setUsername(e.target.value)} />
                    <label> Email </label>
                    <input type="eamil" placeholder={user.email} onChange={(e )=> setEmail(e.target.value)} />
                    <label> Password </label>
                    <input type="password" onChange={(e )=> setPassword(e.target.value)} />
                    <button className="settingSubmit" type="Submit" >Update</button>
                    {success && 
                    <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated....</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
