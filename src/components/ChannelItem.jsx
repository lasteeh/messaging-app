import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../context/apiContext";

const ChannelItem = (props) => {
  const { chatBoxHeaderName } = useContext(ApiContext);

  console.log(props.name, "propsname", chatBoxHeaderName, "chatboxheadername");
  return (
    <div
      data-id={props.dataId}
      data-type={props.dataMsgType}
      data-name={props.name}
      className={`channel-item flex flex-row justify-start items-stretch w-[100%] max-w-[280px] p-1  rounded-[10px] hover:scale-105  transition ease-in-out cursor-pointer shadow-md ${
        props.name === chatBoxHeaderName.name
          ? "border-r-[8px]"
          : "border-r-[0px]"
      }`}
      onClick={props.onClickSelected}
    >
      <div className="bg-gray-200 w-[22%] max-h-[70px] aspect-square p-2.5 rounded-[8px]">
        <FontAwesomeIcon
          icon={props.dataMsgType === "Channel" ? faHashtag : faUserGroup}
          className="w-[100%] h-[100%]"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-[100%]">
        <span>{props.name}</span>
        <span></span>
      </div>
    </div>
  );
};

export default ChannelItem;
