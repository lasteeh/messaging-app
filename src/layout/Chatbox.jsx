import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/apiContext";
import { fetchSendMessage, fetchRetrieveMessage } from "../api/Apicall";
import MemberListItem from "../components/MemberListItem";
import AddMemberItem from "../components/AddMemberItem";
import ChatItem from "../components/ChatItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {
  faCloud,
  faEllipsis,
  faComments,
  faPlane,
  faCommentSlash,
  faPoo,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

export default function Chatbox() {
  const [members, setMembers] = useState([]);
  const [messagebox, setMessagebox] = useState([]);
  const [addMemberSelectionIsShowing, setAddMemberSelectionIsShowing] =
    useState(false);
  const {
    chat,
    setChat,
    chatMessages,
    setChatMessages,
    channelMembers,
    msgType,
    chatBoxHeaderName,
    chatLoading,
    setChatLoading,
    accessData,
    showSideBarMembersList,
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

  const sendMessage = async () => {
    if (messagebox) {
      let body = {
        receiver_id: chatBoxHeaderName.id,
        receiver_class: chatBoxHeaderName.type,
        body: messagebox,
      };
      await fetchSendMessage(accessData, body);
      setMessagebox("");
      let msg = await fetchRetrieveMessage(
        accessData,
        chatBoxHeaderName.id,
        chatBoxHeaderName.type
      );
      await setChatMessages(msg);
    }
  };

  useEffect(() => {
    if (chatMessages !== undefined) {
      let msg = chatMessages.data;
      msg === undefined ? console.log("undefined") : chatFilter(msg);
    }
  }, [chatMessages]);

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

  const handleAddMemberField = () => {
    console.log("changed");
  };

  return (
    <div className="chat-box chat-body flex flex-col  w-[100%] h-[100%] overflow-hidden isolate z-[4]">
      <div className="chat-box-header flex flex-row items-center p-2.5 justify-start w-[100%] min-h-[80px] gap-[5px] isolate z-[6]">
        <div className="icon aspect-square h-[50px] p-[5px]">
          <FontAwesomeIcon
            className="h-[100%] w-[100%]"
            icon={
              chatBoxHeaderName === undefined ||
              chatBoxHeaderName === `Welcome, User ${accessData.id}!`
                ? faPoo
                : chatBoxHeaderName !== undefined &&
                  chatBoxHeaderName.type === "Channel"
                ? faHashtag
                : faComments
            }
          />
        </div>
        <div className="grid auto-rows-auto">
          <span className="text-[0.9rem] font-bold">
            {chatBoxHeaderName && chatBoxHeaderName.name
              ? chatBoxHeaderName.name
              : `Welcome, User ${accessData.id}!`}
          </span>
          <span className="text-[0.8rem] block">
            {chatBoxHeaderName === `Welcome, User ${accessData.id}!`
              ? accessData.uid
              : ""}
          </span>
        </div>
        <input
          className="hidden"
          type="checkbox"
          name="more-options"
          id="more-options"
        />
        <label
          className="h-[40px] w-[40px] hover:bg-gray-400/25 text-center ml-auto z-[5] p-[0.6rem] grid place-items-center rounded-full z-[101]"
          htmlFor="more-options"
        >
          <FontAwesomeIcon className="w-[100%] h-[100%]" icon={faEllipsis} />
        </label>

        <div className="more-options fixed min-w-[270px] max-w-[30%] h-[100vh]  top-0 right-0 z-[4]  p-4 pt-[70px] pb-[70px] overflow-y-auto z-[100] isolate">
          {showSideBarMembersList ? (
            <div>
              <span className="font-semibold text-[0.9rem] uppercase">
                Members - {members.length}
              </span>
              <div className="flex flex-col justify-start items-stretch">
                {members}
              </div>

              <div className="channel-exist-add-member absolute bottom-0 left-0 w-[100%] p-4">
                <input
                  className="w-[100%] rounded-[5px] p-2 focus:outline-none indent-[0.5rem]"
                  type="text"
                  onChange={() => {
                    handleAddMemberField();
                  }}
                  placeholder="UID or Email"
                />
                <button
                  className="w-[100%] rounded-[5px] text-center p-2 mt-[5px] capitalize font-bold shadow-md"
                  type="button"
                >
                  add member
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-[100%] text-right max-w-[70%] ml-auto h-[max-content] p-5">
              <p className="text-[0.8rem]">by:</p>
              <p className="text-[2rem] font-bold">DANIEL & LAST</p>
              <p className="text-[0.9rem]">
                Non-commercial project. All pictures belong to their authors.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative grid auto-rows-max gap-[5px] w-[100%] h-[100vh] z-[5] overflow-y-auto overflow-x-hidden p-2.5 isolate z-[4]">
        {!chat && !chatLoading && (
          <div className="chatLoading absolute inset-0 h-[100%] w-[100%] z-[-1] h-[100%] overflow-hidden">
            <FontAwesomeIcon icon={faPlane} />
            <FontAwesomeIcon icon={faCloud} className="cloud one " />
            <FontAwesomeIcon icon={faCloud} className="cloud two " />
            <FontAwesomeIcon icon={faCloud} className="cloud three " />
            <FontAwesomeIcon icon={faCloud} className="cloud four " />
          </div>
        )}
        {chatLoading && chat.length === 0 && (
          <div className="absolute inset-0 h-[100%] w-[100%] z-[-1] flex flex-col justify-center gap-[1rem] items-center opacity-[0.5]">
            <FontAwesomeIcon icon={faCommentSlash} className="text-[3rem]" />
            <span className="opacity-[0.5]">No messages</span>
          </div>
        )}
        {chatLoading && chat}
        {chatLoading && chat.length !== 0 ? (
          <div className="chatHere fixed right-0 bottom-0 h-[100%] w-[10%] z-[-3] h-[100%]">
            <FontAwesomeIcon className="creep" icon={faFaceSmile} />
          </div>
        ) : (
          <div className="sr-only"></div>
        )}
      </div>

      <div className="message-sender flex flex-row items-center justify-start w-[100%] min-h-[80px]  p-6 gap-[1em] z-[5]">
        <input
          type="text"
          className="message-field max-h-[40px] grow  p-[1rem] active:outline-none focus:outline-none rounded-[0.5rem]"
          placeholder="Type a message..."
          value={messagebox}
          onChange={(e) => setMessagebox(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <span
          className="ml-auto text-[1.4rem] cursor-pointer"
          onClick={sendMessage}
        >
          <FontAwesomeIcon
            className="text-[#e74444] hover:text-[#db2c2c]"
            icon={faPaperPlane}
          />
        </span>
      </div>
    </div>
  );
}
