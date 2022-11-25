import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/apiContext";
import MemberListItem from "../components/MemberListItem";
import AddMemberItem from "../components/AddMemberItem";
import ChatItem from "../components/ChatItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faCloud,
  faEllipsis,
  faComments,
  faPlane,
  faCommentSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function Chatbox() {
  const [members, setMembers] = useState([]);
  const {
    chat,
    setChat,
    chatMessages,
    channelMembers,
    msgType,
    chatBoxHeaderName,
    chatLoading,
    setChatLoading,
  } = useContext(ApiContext);

  useEffect(() => {
    if (chatMessages !== undefined) {
      let msg = chatMessages.data;
      msg === undefined
        ? console.log("undefined")
        : setChat(
            msg.map((data, index) => (
              <ChatItem
                key={index}
                body={data.body}
                time={data.created_at}
                sender={data.sender}
              />
            ))
          );
    }
  }, [chatMessages]);

  console.log("chat information", chatMessages);

  useEffect(() => {
    let mem = channelMembers.channel_members;

    mem === undefined
      ? console.log("undefined")
      : setMembers(
          mem.map((data, index) => (
            <MemberListItem key={index} name={data.user_id} />
          ))
        );
  }, [channelMembers]);

  return (
    <div className="flex flex-col bg-gray-100 w-[100%] h-[100%] overflow-hidden">
      <div className="flex flex-row items-center p-2.5 justify-start bg-gray-300 w-[100%] min-h-[80px] gap-[5px] isolate">
        <div className=" aspect-square h-[50px] p-[5px]">
          <FontAwesomeIcon className="h-[100%] w-[100%]" icon={faComments} />
        </div>
        <span className="text-[0.9rem] font-bold">
          {chatBoxHeaderName ? chatBoxHeaderName : "Hey there, Welcome!"}
        </span>
        <input
          className="hidden"
          type="checkbox"
          name="more-options"
          id="more-options"
        />
        <label
          className="h-[40px] w-[40px] hover:bg-gray-400/25 text-center ml-auto z-[5] p-[0.6rem] grid place-items-center rounded-full"
          htmlFor="more-options"
        >
          <FontAwesomeIcon className="w-[100%] h-[100%]" icon={faEllipsis} />
        </label>

        <div className="more-options fixed min-w-[270px] max-w-[30%] h-[100%] bg-zinc-900 top-0 right-0 z-[4] text-white p-2.5 pt-[70px] overflow-y-auto">
          <div>
            <span className="font-semibold text-[0.9rem] uppercase">
              Members - {members.length}
            </span>
            <div className="flex flex-col justify-start items-stretch">
              {members}
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid auto-rows-auto gap-[5px] w-[100%] h-[100vh] overflow-y-auto overflow-x-hidden p-2.5 isolate">
        {!chat && !chatLoading && (
          <div className="chatLoading absolute inset-0 h-[100%] w-[100%] z-[-1]">
            <FontAwesomeIcon icon={faPlane} />
            <FontAwesomeIcon icon={faCloud} className="cloud one " />
            <FontAwesomeIcon icon={faCloud} className="cloud two " />
            <FontAwesomeIcon icon={faCloud} className="cloud three " />
            <FontAwesomeIcon icon={faCloud} className="cloud four " />
          </div>
        )}
        {chatLoading && chat}
        {chatLoading && chat.length === 0 && (
          <div className="absolute inset-0 h-[100%] w-[100%] z-[-1] flex flex-col justify-center gap-[1rem] items-center opacity-[0.5]">
            <FontAwesomeIcon icon={faCommentSlash} className="text-[3rem]" />
            <span className="opacity-[0.5]">No messages</span>
          </div>
        )}
      </div>

      <div className="flex flex-row items-center justify-start w-[100%] min-h-[80px] bg-gray-200 p-6 gap-[1em]">
        <input
          type="text"
          className="max-h-[40px] grow bg-gray-300 p-[1rem] active:outline-none focus:outline-none rounded-[0.5rem]"
          placeholder="Type a message..."
        />
        <span className="ml-auto text-[1.4rem]">
          <FontAwesomeIcon
            className="text-[#e74444] hover:text-[#db2c2c]"
            icon={faPaperPlane}
          />
        </span>
      </div>
    </div>
  );
}
