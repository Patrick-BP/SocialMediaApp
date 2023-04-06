import React, { useRef, useState } from 'react';
import {PermMedia, Label, Room, EmojiEmotions} from '@mui/icons-material';
import axios from 'axios';
import './share.css';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
const Share = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState();

    const submithandler = async (e)=>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = "post/" +Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try{
                await axios.post('/upload', data)
            }catch(err){
                console.log(err);
            }
        }
        try{
           await axios.post("/posts", newPost)
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="share">
            <div className="shareContainer">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PF+user.profilePicture : `${PF}person/noAvatar.png`}  alt="" />
                    <input placeholder={"What's in your mind " + user.username + " ?"} type="text" className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submithandler}>
                    <label htmlFor='file' className="shareOption">
                        <PermMedia className="shareIcon" htmlColor='tomato'/>
                        <span className="shareOptionText">
                            Photo or Video
                        </span>
                        <input type="file" style={{display:"none"}} id="file" accept=".png, .jpeg, jpg." onChange={(e)=>setFile(e.target.files[0])} />
                    </label>
                    <div className="shareOption">
                        <Label className="shareIcon" htmlColor='blue'/>
                        <span className="shareOptionText">
                            Tag
                        </span>
                    </div>
                    <div className="shareOption">
                        <Room className="shareIcon" htmlColor='green'/>
                        <span className="shareOptionText">
                           Location
                        </span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className="shareIcon"/>
                        <span className="shareOptionText">
                            Feelings
                        </span>
                    </div>
                    <button className="shareButton" type='submit'>Share</button>
                </form>
                
            </div>
            
        </div>
    );
}

export default Share;
