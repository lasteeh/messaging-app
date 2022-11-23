import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/apiContext";
import MemberListItem from "../components/MemberListItem";
import AddMemberItem from "../components/AddMemberItem";

export default function Chatbox() {
  const [chat, setChat] = useState([]);
  const [members, setMembers] = useState([]);
  const { chatMessages, channelMembers } = useContext(ApiContext);

  useEffect(() => {
    if (chatMessages !== undefined) {
      let msg = chatMessages.data;
      msg === undefined
        ? console.log("undefined")
        : setChat(msg.map((data, index) => <p key={index}>{data.body}</p>));
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
        <div className="bg-gray-400 aspect-square h-[50px]"></div>
        <span>DM Full Name/ CHannel Name</span>
        <input
          className="hidden"
          type="checkbox"
          name="more-options"
          id="more-options"
        />
        <label
          className="h-[40px] w-[40px] bg-gray-400 text-center ml-auto z-[5]"
          htmlFor="more-options"
        >
          ...
        </label>

        <div className="more-options absolute min-w-[300px] max-w-[30%] h-[100%] bg-zinc-900 top-0 right-0 z-[4] text-white p-2.5 pt-[70px] overflow-y-auto">
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
            <span>Members</span>
            <div className="flex flex-col justify-start items-stretch">
              {members}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[100%] grow overflow-y-auto">{chat}</div>

      <div className="flex flex-row items-center justify-start w-[100%] min-h-[80px] bg-gray-300 p-4 gap-[1em]">
        <input type="text" className="max-h-[40px] grow" />
        <span className="ml-auto">button</span>
      </div>
    </div>
  );
}
