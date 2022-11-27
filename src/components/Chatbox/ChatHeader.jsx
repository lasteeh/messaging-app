import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faComments,
  faPoo,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/apiContext";

export default function ChatHeader(props) {
  const [addMemberInput, setAddMemberInput] = useState("");
  const { showSideBarMembersList } = useContext(ApiContext);

  const handleAddMemberField = (e) => {
    setAddMemberInput(e.target.value);
    console.log("changed", e.target.value, "ipnutvalue: ", addMemberInput);
  };

  console.log(props.chatheader);

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
      <div className="grid auto-rows-auto">
        <span className="text-[0.9rem] font-bold">
          {props.chatheader && props.chatheader.name
            ? props.chatheader.name
            : `Welcome, ${props.username}!`}
        </span>
        <span className="text-[0.8rem] block">
          {props.chatheader === `Welcome, ${props.username}!`
            ? props.username
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
        className="h-[40px] w-[40px] hover:bg-gray-400/25 text-center ml-auto p-[0.6rem] grid place-items-center rounded-full z-[101]"
        htmlFor="more-options"
      >
        <FontAwesomeIcon className="w-[100%] h-[100%]" icon={faEllipsis} />
      </label>

      <div className="more-options fixed min-w-[270px] max-w-[30%] h-[100vh]  top-0 right-0 p-4 pt-[70px] pb-[70px] overflow-y-auto z-[100] isolate">
        {showSideBarMembersList ? (
          <div>
            <span className="font-semibold text-[0.9rem] uppercase">
              Members - {props.members.length}
            </span>
            <div className="flex flex-col justify-start items-stretch">
              {props.members}
            </div>

            <div className="channel-exist-add-member absolute bottom-0 left-0 w-[100%] p-4">
              <input
                className="w-[100%] rounded-[5px] p-2 focus:outline-none indent-[0.5rem]"
                type="text"
                onChange={handleAddMemberField}
                placeholder="UID or Email"
                value={addMemberInput}
              />
              <button
                className="w-[100%] rounded-[5px] text-center p-2 mt-[5px] capitalize font-bold shadow-md hover:brightness-125 active:scale-[0.98]"
                type="button"
              >
                add member
              </button>
            </div>
          </div>
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
