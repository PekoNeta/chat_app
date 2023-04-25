import React, { useState } from "react";
import Login from "./Login/Login";
import Register from "./Login/Register";
import ChatRoom from "./ChatRoom/ChatRoom"
import UserContext from "./Context/UserContext";
import "./Login/Login.css"

/*Your Scaledrone channel ID*/
const CHANNEL_ID = "xxxxxxx";

export default function ChatApp() {
  const [currentForm, setCurrentForm] = useState ('Login');
  const [drone, setDrone] = useState(null);
  const [user, setUser] = useState("");

  function onUserLogin(username, colorA) {
    if (username) {      
      const drone = new window.Scaledrone(CHANNEL_ID, {
        data: { username, colorA },
      });
      drone.on("open", () => {
        setDrone(drone);
        setUser({ id: drone.clientId, username, colorA });
      });
    }
  }

  function userLogout() {
    drone.close();
    setDrone(null);
    setUser(null);
  }

  const toggleForm = (formName) => {
  setCurrentForm (formName);
  }

  return (    
    <div className="ChatApp">
      <UserContext.Provider value={{ user, drone, onUserLogin, userLogout }}>
      {!user && <div className="CurrentForm">{
        currentForm === 'Login' ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>    
      }      
      </div>}
        {user && <ChatRoom/>}
      </UserContext.Provider>
    </div>
  );
  
}



