import React, { useContext, useState } from "react";
import ChatContext from "../Context/ChatContext";
import "./ChatRoom.css";

export default function ChatMessageInput() {
  const { publishMessage } = useContext(ChatContext);

  const [message, setMessage] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (message && message.replace(/\s/g, "").length > 0) {
      publishMessage(message);
      setMessage("");
    }
  }

  return (
    <div className="input-message-container"> <div>     
      <div className="input-messagetext">Message: </div>
        <div className="input-form">
          <form className="input-message-form-item" onSubmit={sendMessage}>
            <input className="input-form-input" type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}/>
            <button className="input-form-btn">Send</button>
          </form>
        </div>
    </div></div>
  );
}
