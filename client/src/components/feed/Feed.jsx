import React, { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/share';
import './feed.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const Feed = ({username}) => {
    const {user} = useContext(AuthContext)
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
       (async function fetchPosts(){
            const res = username 
            ? await axios.get(`/posts/profile/${username}`) 
            : await axios.get(`/posts/timeline/${user._id}`) ;
            setPosts(res.data.sort((p1, p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            })) 
        })();
    },[username, user._id])
    return (
        <div className='feed'>
            <div className="feedWrapper">
                {username === user.username && <Share/>}
                {posts && posts.map(post=>{
                    
                   return <Post key={post._id} post={post}/>
                })}
               

            </div>

        </div>
    );
}

export default Feed;
