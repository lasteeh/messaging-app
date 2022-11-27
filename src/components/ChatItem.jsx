import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../context/apiContext";
import { calculateTime } from "../helper/functions";

const ChatItem = (props) => {
  
  const { accessData } = useContext(ApiContext);

  return (
    <div
      className={`flex flex-row flex-nowrap items-end gap-[0.8rem] w-[100%] h-[max-content] pl-[1rem] pr-[1rem] ${
        accessData.id === props.sender.id && "flex-row-reverse"
      }`}
    >
      <div
        className={
          !props.pictoggle
            ? "invisible photo-holder aspect-square w-[min(28px,_100%)]"
            : "photo-holder aspect-square w-[min(28px,_100%)] text-white  p-[0.4rem] mb-auto rounded-[0.35rem] grid place-items-center"
        }
      >
        <FontAwesomeIcon icon={faUser} className="w-[100%] h-[100%]" />
      </div>
      <div className="flex flex-col flex-nowrap gap-[0.1rem] ">
        {props.toggle && (
          <div className={`${accessData.id === props.sender.id && "ml-auto"}`}>
            <span className="sender text-[0.6rem] pl-[6px]">
              {props.sender.uid}
            </span>
            <span className="sender text-[0.6rem] pl-[6px]">
              {`(${props.sender.id})`}
            </span>
            <span className="time-holder lowercase text-[0.6rem] pl-[6px]">
              {calculateTime(props.time)}
            </span>
          </div>
        )}
        <div className="messages-holder relative w-[100%]">
          <p className={`${accessData.id === props.sender.id && "ml-auto"}`}>
            {props.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
