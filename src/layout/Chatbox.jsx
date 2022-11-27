import React, { useContext, useEffect, useState, useRef } from "react";
import { ApiContext } from "../context/apiContext";
import MemberListItem from "../components/MemberListItem";
import AddMemberItem from "../components/AddMemberItem";
import ChatItem from "../components/ChatItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import ChatHeader from "../components/Chatbox/ChatHeader";
import Airplane from "../components/Chatbox/Airplane";
import Messagebox from "../components/Chatbox/Messagebox";

export default function Chatbox() {
  const [members, setMembers] = useState([]);
  const [addMemberSelectionIsShowing, setAddMemberSelectionIsShowing] =
    useState(false);
  const {
    chat,
    setChat,
    chatMessages,
    channelMembers,
    msgType,
    chatBoxHeaderName,
    chatLoading,
    setChatLoading,
    accessData,
  } = useContext(ApiContext);

  const chatFilter = (msg) => {
    let body = [];
    let lastSender = msg.length === 0 ? [] : msg[0].sender.id;
    let count = 0;
    let pictoggle = true;

    body = msg.map((user, index) => {
      let nextPerson =
        msg.length === index + 1 ? msg[0].sender.id : msg[index + 1].sender.id;

      if (user.sender.id === lastSender) {
        pictoggle = count === 0 ? true : false;
        count += 1;
        lastSender =
          user.sender.id === nextPerson ? nextPerson : user.sender.id;
        return (
          <ChatItem
            key={index}
            body={user.body}
            time={user.created_at}
            sender={user.sender}
            toggle={pictoggle}
            pictoggle={pictoggle}
          />
        );
      }
      if (user.sender.id === nextPerson) {
        pictoggle = count === 0 ? true : false;
        count += 1;
        lastSender = user.sender.id;
        return (
          <ChatItem
            key={index}
            body={user.body}
            time={user.created_at}
            sender={user.sender}
            toggle={!pictoggle}
            pictoggle={!pictoggle}
          />
        );
      } else {
        count = 0;
        pictoggle = true;
        return (
          <ChatItem
            key={index}
            body={user.body}
            time={user.created_at}
            sender={user.sender}
            toggle={pictoggle}
            pictoggle={pictoggle}
          />
        );
      }
    });

    setChat(body);
  };

  useEffect(() => {
    if (chatMessages !== undefined) {
      let msg = chatMessages.data;
      msg === undefined ? console.log("undefined") : chatFilter(msg);
    }
  }, [chatMessages]);

  useEffect(() => {
    let mem = channelMembers.channel_members;
    if (mem !== undefined) {
      setMembers(
        mem.map((data, index) => (
          <MemberListItem key={index} id={data.user_id} />
        ))
      );
    }
  }, [channelMembers]);

  const dummy = useRef(null);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "auto" });
  }, [chatBoxHeaderName, chatMessages, chat]);

  return (
    <div className="chat-box chat-body flex flex-col  w-[100%] h-[100%] overflow-hidden isolate z-[4]">
      <ChatHeader
        chatheader={chatBoxHeaderName}
        username={accessData.uid}
        members={members}
      />

      <div className="relative grid auto-rows-max gap-[5px] w-[100%] h-[100vh] overflow-y-auto overflow-x-hidden p-2.5 isolate z-[4]">
        {!chat && !chatLoading && <Airplane />}
        {chatLoading && chat.length === 0 && (
          <div className="absolute inset-0 h-[100%] w-[100%] z-[-1] flex flex-col justify-center gap-[1rem] items-center opacity-[0.5]">
            <FontAwesomeIcon icon={faCommentSlash} className="text-[3rem]" />
            <span className="opacity-[0.5]">No messages</span>
          </div>
        )}
        {chatLoading && chat}
        {chatLoading && chat.length !== 0 ? (
          <div className="chatHere fixed right-0 bottom-0 h-[100%] w-[10%] z-[-3]">
            <FontAwesomeIcon className="creep" icon={faFaceSmile} />
          </div>
        ) : (
          <div className="sr-only"></div>
        )}
        <div className="dummy" ref={dummy}></div>
      </div>

      <Messagebox />
    </div>
  );
}
