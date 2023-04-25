import React, { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import "./Login.css"

export default function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
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
        console.log(username, password, email, colorA);
        if (!username) {
            setError("Enter user name");
          } else {
            setError("null");
            onUserLogin(username, colorA);
          }
        };
    
    return (
        
        <div className="login-container">
          <div className="login-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="UserName">Username</label>
                <input value={username} onChange ={(e) => setUsername(e.target.value)}type="UserName" placeholder="UserName" id="UserName" name="UserName"/>
                <div className="error-message">{error}</div>
                <label htmlFor="email">email</label>
                <input value={email} onChange ={(e) => setEmail(e.target.value)}type="email" placeholder="yourmail@gmail.com" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange ={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" name="password"/>
                <button className="submit-btn" type="submit">Register</button>
            </form> 
                <button className="link-btn" onClick={()=> props.onFormSwitch('Login')}>Already have an account? Login here.</button>
        </div>
      </div>
    )
}