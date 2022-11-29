import React, { useContext } from "react";
import { ApiContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faX,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const PopUpMessage = () => {
  const { popUpMessageList } = useContext(ApiContext);
  return (
    <div className="fixed top-[3rem] left-[50%] translate-x-[-50%] isolate z-[200] max-h-[190px] overflow-hidden">
      <div className=" w-[max-content]  bg-red-900 px-[1.25rem] py-[0.5rem] pr-[0.9rem] rounded-[5px] shadow-md text-white flex flex-row gap-[1rem] items-center justify-center my-[1rem]">
        <FontAwesomeIcon icon={faCircleXmark} />
        <p className=" font-semibold ">Error message</p>
        <FontAwesomeIcon
          className="border-l-[0.1rem] py-[0.35rem] pl-[1rem] scale-[0.8]"
          icon={faX}
        />
      </div>
    </div>
  );
};

export default PopUpMessage;
