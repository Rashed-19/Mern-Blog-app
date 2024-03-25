import { useState, useRef, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context'
import './write.css'

export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title: title,
            description: desc,
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append("name",filename)
            data.append("file", file)
            newPost.photo = filename;
            try {
                await axios.post("/upload", data)
            } catch (error) {
               console.log(error); 
            }
        }
        try {
            const result = await axios.post("/posts/",newPost)
            window.location.replace("/post/" + result.data._id)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="write">
            {file && 
            <img 
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt="writeImg"
            />
        }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                    <i class="writeIcon far fa-file-image"></i>
                    </label>
                    <input type="file" id="fileInput" 
                    style={{display: 'none'}} onChange={(e)=> setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" onChange={(e)=> setTitle(e.target.value)}
                    className="writeInput" autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                    placeholder="Your story here..."
                    type="text"
                    className="writeInput writeText"
                    onChange={(e)=> setDesc(e.target.value)}
                    >
                    </textarea>
                </div>
                <button className="writeSubmit" type="Submit" >Publish</button>
            </form>
        </div>
    )
}
