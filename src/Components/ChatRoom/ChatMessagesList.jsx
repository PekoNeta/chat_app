import React, { useContext } from "react";
import ChatContext from "../Context/ChatContext";
import UserContext from "../Context/UserContext";
import "./ChatRoom.css";

export default function ChatMessageList() {
    const { messageArray } = useContext(ChatContext);
    const { user } = useContext(UserContext);
  
    function getWrapperClass(message) {
      return `message-itemone ${
        user.id === message.user.id ? "my-item" : "others-item"
      }`;
    }
  
    function getUserNameClass(message) {
      return `message-username ${
        user.id === message.user.id ? "my-username" : "others-username"
      }`;
    }
  
    function getMessageClass(message) {
      return `message-text ${
        user.id === message.user.id ? "my-message" : "others-message"
      }`;
    }
  
    return (
      <div className="messages-inputs">
        <div>
          {messageArray.map((msg) => {
            if (msg.type === "MEMBER_JOINED") {
            return (
                <div className="message-item-joined-left" key={msg.id}>
                  <div className="message-joined">
                    {msg.user.username} {msg.message}
                  </div>
                </div>
                );
            } else if (msg.type === "MEMBER_LEFT") {
            return (
                <div className="message-item-joined-left" key={msg.id}>
                  <div className="message-left">
                    {msg.user.username} {msg.message}
                  </div>
                </div>
              );
            } else {
            return (
                <div className={getWrapperClass(msg)} key={msg.id}>
                  <div className="message-get-username">
                    <div className={getUserNameClass(msg)}>
                      <div>{msg.user.username}</div>
                    </div>
                    <div className={getMessageClass(msg)}>{msg.message}</div>
                    <div className="message-time">{msg.currentTime}</div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
  