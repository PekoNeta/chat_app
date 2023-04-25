import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import "./Login.css"

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [colorA, setColorA] = useState(null);
  
    const { onUserLogin } = useContext(UserContext);
    
    function randomColor() {
        var color = "#" + Math.floor(Math.random()*16777215).toString(16);
        setColorA(color);
    }

    useEffect(() => {
        if(!colorA) {
          randomColor();
        }
      }, [colorA]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, colorA);
        if (!username) {
            setError("Enter user name");
          } else {
            setError(null);
            onUserLogin(username, colorA);
          }
        };

    return (
        <div className="login-container">
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">user name</label>
                <input value={username} onChange ={(e) => setUsername(e.target.value)} type="username" placeholder="user name" id="username" name="username"/>
                <div className="error-message">{error}</div>
                <label htmlFor="password">password</label>
                <input value={password} onChange ={(e) => setPassword(e.target.value)} type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" id="password" name="password"/>
                <button className="submit-btn" type="submit">Log in</button>
            </form> 
                <button className="link-btn" onClick={()=> props.onFormSwitch('Register')}>You don't have an account? Register here. </button>
        </div>
      </div>
   );
}