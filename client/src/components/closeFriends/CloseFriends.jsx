import React from 'react'
import './closeFriends.css'
export default function CloseFriends({users}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    {users.map(user=>{
        return(
           <li key={user.id} className="sidebarFriend">
                        <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName">{user.username}</span>
    </li> 
        )
    })

    } 
    </>
  )
}
