import React, { useContext } from "react";
import ChatContext from "../Context/ChatContext";
import "./ChatRoom.css";

export default function ChatHeader() {
  const { onClickLogout, user } = useContext(ChatContext);

  return (
    <div className= "header">
        <div className="header-logout-container">
          <div className="header-welcome-note">
            <div>Welcome {user.username}!</div>
          </div>
          <div className="header-logout-Form">
            <button className="logout-btn" onClick={onClickLogout} type="submit" >Logout</button>               
          </div>                        
        </div>          
    </div>
  );
}