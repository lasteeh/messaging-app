import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faComments,
  faPoo,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/apiContext";
import MemberListSidebar from "../MemberListSidebar";
import { randomGreeting } from "../../helper/functions";

export default function ChatHeader(props) {
  const { showSideBarMembersList } = useContext(ApiContext);
  const [greet, setGreet] = useState(randomGreeting());
  const dateToday = new Date().toLocaleDateString();

  return (
    <div className="chat-box-header flex flex-row items-center p-2.5 justify-start w-[100%] min-h-[80px] gap-[5px] isolate z-[6]">
      <div className="icon aspect-square h-[50px] p-[5px]">
        <FontAwesomeIcon
          className="h-[100%] w-[100%]"
          icon={
            !props.chatheader || !props.chatheader.type
              ? faPoo
              : props.chatheader.type === "Channel"
              ? faHashtag
              : props.chatheader.type === "User"
              ? faComments
              : faPoo
          }
        />
      </div>
      <div className="grid auto-rows-auto ">
        <p className="text-[0.9rem] font-bold flex flex-col justify-start items-start">
          {props.chatheader && props.chatheader.name ? (
            props.chatheader.name
          ) : (
            <>
              <span className="font-normal text-[75%]">
                Today is: {dateToday}
              </span>
              <quote className="random-quote italic">"{greet}"</quote>
            </>
          )}
        </p>
      </div>
      <div className="header-sign-in-info ml-auto mr-[0rem] grid auto-cols-auto text-right text-[clamp(0.6rem,1vw,1rem)] pr-[0.5rem] rounded-[5px] border-r-[5px]">
        <span className="uppercase text-[70%]">signed in as</span>
        <span className="font-bold ">{props.username}</span>
      </div>
      <input
        className="hidden"
        type="checkbox"
        name="more-options"
        id="more-options"
      />
      <label
        className="h-[40px] w-[40px] hover:bg-gray-400/25 text-center p-[0.6rem] grid place-items-center rounded-full z-[101]"
        htmlFor="more-options"
      >
        <FontAwesomeIcon className="w-[100%] h-[100%]" icon={faEllipsis} />
      </label>

      <div className="more-options fixed min-w-[350px] max-w-[30%] h-[100vh]  top-0 right-0 p-4 pt-[70px] pb-[120px] overflow-y-auto z-[100] isolate">
        {showSideBarMembersList ? (
          <MemberListSidebar />
        ) : (
          <div className="mt-[75%] text-right max-w-[70%] ml-auto h-[max-content] p-5">
            <p className="text-[0.8rem]">by:</p>
            <p className="text-[2rem] font-bold">DANIEL & LAST</p>
            <p className="text-[0.9rem]">
              Non-commercial project. All pictures belong to their authors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
