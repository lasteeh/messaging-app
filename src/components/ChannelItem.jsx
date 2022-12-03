import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faHashtag,
  faMagnifyingGlass,
  faRocket,
  faFaceSmile,
  faEarthAsia,
  faFire,
  faMusic,
  faStar,
  faCoffee,
  faTree,
  faFish,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../context/apiContext";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const ChannelItem = (props) => {
  const { chatBoxHeaderName } = useContext(ApiContext);
  const [randomIcon, setRandomIcon] = useState();
  const list = [
    faRocket,
    faFaceSmile,
    faPaperPlane,
    faEarthAsia,
    faFire,
    faMusic,
    faStar,
    faCoffee,
    faTree,
    faFish,
  ];
  const randomNumber = Math.floor(Math.random() * list.length);

  useEffect(() => {
    setRandomIcon(list[randomNumber]);
  }, [props.dataId]);

  return (
    <div className="flex flex-row justify-start items-center isolate">
      <div
        data-id={props.dataId}
        data-type={props.dataMsgType}
        data-name={props.name}
        className={`channel-item animate-fadeIn relative flex flex-row justify-start items-stretch w-[100%] max-w-[280px] p-1  rounded-[10px] hover:scale-105  transition ease-in-out cursor-pointer shadow-md ${
          props.name === chatBoxHeaderName.name
            ? "border-r-[8px]"
            : "border-r-[0px]"
        } isolate z-[2]`}
        onClick={props.onClickSelected}
      >
        <div className="bg-gray-200 w-[22%] max-h-[70px] aspect-square p-2.5 rounded-[8px]">
          <FontAwesomeIcon
            icon={
              !props.isSearchResult && props.dataMsgType === "Channel"
                ? faHashtag
                : !props.isSearchResult && props.dataMsgType
                ? faUserGroup
                : faMagnifyingGlass
            }
            className="w-[100%] h-[100%]"
          />
        </div>
        <div className="flex flex-col justify-center items-left w-[100%] px-[1rem] break-all text-[0.9rem] font-semibold">
          <span>{props.name}</span>
          <span></span>
        </div>
        <div className="ch-i-bg absolute inset-0 z-[-1] overflow-hidden rounded-[inherit] opacity-[0.2]">
          <FontAwesomeIcon
            icon={randomIcon}
            className="text-[5rem] absolute right-0 bottom-0 rotate-[-40deg]"
          />
        </div>
      </div>
      {props.dataMsgType === "User" && !props.isSearchResult && (
        <div
          className="h-[100%] w-[10px] hover:w-[40px] grid place-items-center transition-[width,opacity,box-shadow] opacity-[0.02] hover:opacity-[0.8] bg-red-900 rounded-[0.5rem] z-[1] shadow-[-20px_0px_0px_0px,_-10px_0px_0px_0px,_-5px_0px_0px_0px] shadow-[#7f1d1d]"
          onClick={props.onTrashClick}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="text-white bg-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default ChannelItem;
