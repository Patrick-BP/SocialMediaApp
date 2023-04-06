import React from "react";
import './online.css'
export default function online({users}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
     {users.map(user=>{
        return (
            <li key={user.id} className="rigthbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src={PF+user.profilePicture}
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rigthbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li>
        )
     })}
    </>
  );
}
