import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

const ChannelItem = (props) => {
  return (
    <div
      data-id={props.dataId}
      data-type={props.dataMsgType}
      className="flex flex-row justify-start items-stretch w-[100%] max-w-[280px] p-2.5 hover:bg-slate-600"
      onClick={props.onClickSelected}
    >
      <div className="bg-gray-200 w-[22%] max-h-[70px] aspect-square p-2.5 rounded-[1rem]">
        <FontAwesomeIcon icon={faUserGroup} className="w-[100%] h-[100%]" />
      </div>
      <div className="flex flex-col items-start w-[100%]">
        <span>{props.name}</span>
        <span></span>
      </div>
    </div>
  );
};

export default ChannelItem;
