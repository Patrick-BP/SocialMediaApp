import './topbar.css';
import {SearchTwoTone, Person, Chat, Notifications} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
const Topbar = () => {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                
                    <Link to="/" style={{textDecoration:"none",}}>
                    <span className="logo">Social Media </span>
                    </Link> 
               
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchTwoTone className="searchicon"/>
                    <input type="text" placeholder='Search for friend, post or video' className="searchinput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink" >
                    Homepage
                    
                    </span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbaricons">
                    <div className="topbariconitem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbariconitem">
                        <Chat/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbariconitem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} style={{textDecoration:"none",}}>
                <img src={user.profilePicture ? PF+user.profilePicture : `${PF}person/noAvatar.png`} alt="" className="topbarimg" />
                </Link>
            </div>
        </div>
    );
}

export default Topbar;
