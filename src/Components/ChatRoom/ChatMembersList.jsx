import React, { useContext } from "react";
import ChatContext from "../Context/ChatContext";
import "./ChatRoom.css";

export default function ChatMemberList () {
    const{membersArray}=useContext(ChatContext);

return(
<div className="members-List">
        <div>Members online</div>
        {membersArray.map((member) => (
        <div className="members-list-member" style={{ backgroundColor: member.clientData.colorA }} key={member.id}>
          <span className="members-list-username">
            {member.clientData.username}
          </span>
        </div>
    ))}
</div>
);
}