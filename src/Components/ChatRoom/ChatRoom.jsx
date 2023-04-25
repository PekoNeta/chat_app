import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../Context/ChatContext";
import UserContext from "../Context/UserContext";
import ChatHeader from "./ChatHeader";
import ChatMemberList from "./ChatMembersList";
import ChatMessagesList from "./ChatMessagesList";
import ChatMessageInput from "./ChatMessageInput";
import "./ChatRoom.css";

const DEFAULT_ROOM = "observable-default-room";

export default function ChatRoom() {
    const { user, drone, userLogout } = useContext(UserContext);
    const [messageArray, setMessageArray] = useState([]);
    const [membersArray, setMembersArray] = useState([]);

    useEffect(() => {
        if (user) {
          setupRoom(drone);
        }
      }, [user, drone]);

    function setupRoom(scaledrone) {
        scaledrone.on("error", (error) => console.error(error));
    
        const room = scaledrone.subscribe(DEFAULT_ROOM);
    
        room.on("error", (error) => console.error(error));
    
        room.on("members", function (members) {
          setMembersArray([...members]);
        });
    
        room.on("member_join", function (member) {
            setMembersArray(function (current) {
            return [...current, member];
          });
    
           setMessageArray((current) => {
            return [
              ...current,
              {
                message: "has joined the chat!",
                id: Math.random(),
                type: "MEMBER_JOINED",
                user: {
                  username: member.clientData.username,
                  colorA: member.clientData.colorA,
                },
              },
            ];
          });
        });
    
        room.on("member_leave", function (member) {
          setMembersArray((current) => {
            return current.filter((oneMember) => oneMember.id !== member.id);
          });
          setMessageArray((current) => {
            return [
              ...current,
              {
                message: "has left the chat!",
                id: Math.random(),
                type: "MEMBER_LEFT",
                user: {
                  username: member.clientData.username,
                  colorA: member.clientData.colorA,
                },
              },
            ];
          });
        });
    
        room.on("message", (message) => {
          setMessageArray((current) => {
            return [
              ...current,
              {
                message: message.data.message,
                id: message.id,
                type: "MESSAGE",
                currentTime: new Date().toLocaleString(),
                user: {
                  id: message.member.id,
                  username: message.member.clientData.username,
                  colorA: message.member.clientData.colorA
                },
              },
            ];
          });
        });
      }

    function publishMessage(message) {
        drone.publish({
          room: DEFAULT_ROOM,
          message: { message },
        });
      }

    function onClickLogout() {
        userLogout();
      }

    return (
        <div className="chat-room-container">
            <ChatContext.Provider value={{
                publishMessage,
                onClickLogout,
                messageArray,
                membersArray,
                user,
                }}>
              <div className="chat-room">            
                <div className="header">
                  <ChatHeader/>
                </div>        
                <div className="members-list">
                  <ChatMemberList />
                </div>
                <div className="messages-list">
                  <ChatMessagesList />
                </div>
                <div className="input-message">
                  <ChatMessageInput/>
                </div>
              </div>
            </ChatContext.Provider>
        </div>
   );
}
