import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/apiContext";
import { calculateTime } from "../../helper/functions";

const ChatItem = (props) => {
  const { accessData } = useContext(ApiContext);
  const isFromSender = accessData.id === props.sender.id;

  return (
    <div
      className={`flex ${
        isFromSender ? "flex-row-reverse" : "flex-row"
      } flex-nowrap  items-start  gap-[0.5rem] animate-swipeUp`}
    >
      <div className="w-[28px] shrink-0 ">
        <div
          className={`photo-holder w-[100%]  text-white p-[0.4rem] mb-auto rounded-[0.35rem] grid place-items-center ${
            !props.pictoggle ? "invisible" : ""
          }`}
        >
          <FontAwesomeIcon icon={faUser} className="w-[100%] h-[100%]" />
        </div>
      </div>

      <div
        className={`max-w-[1000px] ${isFromSender ? "pl-[36px]" : "pr-[36px]"}`}
      >
        {props.toggle && (
          <div
            className={`flex ${
              isFromSender ? "ml-auto flex-row" : "flex-row"
            } mb-[4px]`}
          >
            <span className="sender text-[0.6rem] pl-[6px]">
              {props.sender.uid}
            </span>
            <span className="sender text-[0.6rem] pl-[6px]">
              {/* {`(${props.sender.id})`} */}
            </span>
            <span className="time-holder lowercase text-[0.6rem] pl-[6px]">
              {calculateTime(props.time)}
            </span>
          </div>
        )}

        <div className="messages-holder relative w-[100%]">
          <p className={`${isFromSender && "ml-auto"} max-w-[900px]`}>
            {props.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
