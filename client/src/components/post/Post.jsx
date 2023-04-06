import './post.css'
import {MoreVert } from '@mui/icons-material';
import { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {format} from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';



const Post = ({post}) => {
    const [user, setUser] = useState({});
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext)
 useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
 },[currentUser._id, post.likes])

    useEffect(()=>{
        (async function fetchUser(){
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data) 
        })();
    },[post.userId])


    const likeHandler = ()=>{
        try{
            axios.put("/posts/"+post._id+"/like", {userId:currentUser._id})
        }catch(err){}
        setLike(isLiked? like-1 : like+1)
        setIsLiked(!isLiked)
    }
   
    return (
        <div className='post' >
            <div className="postTopWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" className="postProfileImg" />
                    </Link>
                    
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler} />
                    <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler} />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Post;
