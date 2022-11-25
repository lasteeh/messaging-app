import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/apiContext";
import { fetchSendMessage, fetchRetrieveMessage } from '../api/Apicall';
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
  faL,
} from "@fortawesome/free-solid-svg-icons";

export default function Chatbox() {
  const [members, setMembers] = useState([]);
  const [messagebox, setMessagebox] = useState([]);
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
    accessData
  } = useContext(ApiContext);

  const chatFilter = (msg) => {
    let body =[];
    let lastSender = msg.length === 0 ? [] : msg[0].sender.id;
    let count = 0;
    let pictoggle = true
    
    body = msg.map((user, index) => {
      let nextPerson = msg.length === index+1 ? msg[0].sender.id : msg[index+1].sender.id
           
      if (user.sender.id === lastSender){
        pictoggle = count === 0 ? true : false
        count += 1
        lastSender = user.sender.id === nextPerson ? nextPerson : user.sender.id
        return (
          <ChatItem
            key={index}
            body={user.body}
            time={user.created_at}
            sender={user.sender}
            toggle={pictoggle}
            pictoggle={pictoggle}
          />
        )
      } if (user.sender.id === nextPerson){
        pictoggle = count === 0 ? true : false
        count += 1
        lastSender = user.sender.id
        return (
          <ChatItem
            key={index}
            body={user.body}
            time={user.created_at}
            sender={user.sender}
            toggle={!pictoggle}
            pictoggle={!pictoggle}
          />
        )
      } else{
        count = 0
        pictoggle = true
        return (
          <ChatItem
            key={index}
            body={user.body}
            time={user.created_at}
            sender={user.sender}
            toggle={pictoggle}
            pictoggle={pictoggle}
          />
        )
      }
    }) 

    setChat(body)
  }

  const sendMessage = async () => {
    if (messagebox){
      let body = {
        "receiver_id": chatBoxHeaderName.id,
        "receiver_class": chatBoxHeaderName.type,
        "body": messagebox
      }
      await fetchSendMessage(accessData,body)
      setMessagebox('')
      let msg = await fetchRetrieveMessage(accessData, chatBoxHeaderName.id, chatBoxHeaderName.type )
      await setChatMessages(msg)
    }
  }

  useEffect(() => {
    if (chatMessages !== undefined) {
      let msg = chatMessages.data;
      msg === undefined
        ? console.log("undefined")
        : chatFilter(msg)
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

  return (
    <div className="flex flex-col bg-gray-100 w-[100%] h-[100%] overflow-hidden">

      
      <div className="flex flex-row items-center p-2.5 justify-start bg-gray-300 w-[100%] min-h-[80px] gap-[5px] isolate">
        <div className=" aspect-square h-[50px] p-[5px]">
          <FontAwesomeIcon className="h-[100%] w-[100%]" icon={faComments} />
        </div>
        <span className="text-[0.9rem] font-bold">
          {chatBoxHeaderName ? chatBoxHeaderName.name : "Hey there, Welcome!"}
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
          <div className="bg-zinc-500 p-2.5">
            <input
              type="checkbox"
              className="hidden"
              name="add-member"
              id="add-member"
            />
            <label htmlFor="add-member" className="cursor-pointer">
              add member
            </label>
            <div className="add-member w-[100%] flex flex-col justify-start items-stretch gap-[0.5rem]">
              <div>
                <input type="text" className=" w-[70%] p-2 text-black" />
                <button type="button" className="w-[30%]">
                  add
                </button>
              </div>
              <div className="result flex flex-row-reverse flex-wrap justify-start items-start gap-[0.5rem]">
                <AddMemberItem uid="last@email.com" />
                <AddMemberItem uid="daniel@email.com" />
                <AddMemberItem uid="kazel@email.com" />
                <AddMemberItem uid="ceejay@email.com" />
              </div>
            </div>
          </div>
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

      <div className="relative grid auto-rows-max gap-[5px] w-[100%] h-[100vh] overflow-y-auto overflow-x-hidden p-2.5 isolate">
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
          value={messagebox}
          onChange={e => setMessagebox(e.currentTarget.value)}
          onKeyPress={e => {
            if(e.key === 'Enter'){
              sendMessage()
            }
          }}
        />
        <span 
        className="ml-auto text-[1.4rem] cursor-pointer"
        onClick={sendMessage}>
          <FontAwesomeIcon
            className="text-[#e74444] hover:text-[#db2c2c]"
            icon={faPaperPlane}
          />
        </span>
      </div>
    </div>
  );
}
