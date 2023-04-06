import React, { useContext, useEffect, useState } from 'react';
import './rightbar.css';
import Online from '../online/Online'
import {Users} from '../../dummyData';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {Add} from '@mui/icons-material'

const Rightbar = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
const {user:currentUser} = useContext(AuthContext)
    useEffect(()=>{
        ( async function getFriends(){
            try{
                const friendList = await axios.get("/users/friends/"+ currentUser._id);
                setFriends(friendList.data)
            }catch(err){
                    console.log(err);
            }
        })()
    }, [currentUser._id])

    const HomeRightBar = ()=>{
        return(
            <>
            <div className="birthdayContainer">
             <img src="/assets/gift.png" alt="" className="birthdayImg" />
                <span className="birthdayText">
                    <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
            </div>
            <img src="/assets/ad.png" alt="" className="rigthbarAd" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                <Online users={Users}/>
               
            </ul>
            </>
        )
    };

    const ProfileRightBar = ()=>{
        return(
            <>
            {user.username !== currentUser.username && (
            <button className='rightbarFollowButton'>
               Follow <Add/>
            </button>
            )}
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>

                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>

                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Maried" : "-"}</span>

                </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                {friends && friends.map(friend=>{
                    return(
                        <Link to={"/profile/"+friend.username}>
                        <div className="rightbarFollowing">
                        <img src={friend.profilePicture ? PF+ friend.profilePicture : `${PF}person/noAvatar.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">{friend.username}</span>
                        </div>
                        </Link>
                    )
                })}
                
                

            </div>

            </>
        )
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
            
               {user ? <ProfileRightBar/> : <HomeRightBar/>}
        </div>
        </div>
    );
}

export default Rightbar;
