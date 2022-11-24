import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const ChannelItem = (props) => {
  return (
    <div
      data-id={props.dataId}
      data-type={props.dataMsgType}
      data-name={props.name}
      className="flex flex-row justify-start items-stretch w-[100%] max-w-[280px] p-2.5 bg-zinc-700 rounded-2xl hover:scale-105 hover:bg-slate-600 transition ease-in-out cursor-pointer shadow-md"
      onClick={props.onClickSelected}
    >
      <div className="bg-gray-200 w-[22%] max-h-[70px] aspect-square p-2.5 rounded-[1rem]">
        <FontAwesomeIcon icon={faUserGroup} className="w-[100%] h-[100%]" />
      </div>
      <div className="flex flex-col justify-center items-center w-[100%]">
        <span>{props.name}</span>
        <span></span>
      </div>
    </div>
  );
};

export default ChannelItem;
