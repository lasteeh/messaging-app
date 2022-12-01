import React, { useContext, useState } from "react";
import { ApiContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faX,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export function useToasty () {
  const { popUpMessageList, setPopUpMessageList } = useContext(ApiContext);
  return (message) => {
    if (message) {
      setPopUpMessageList([...popUpMessageList, { message }]);
    } else {
      throw new Error("No message provided")
    }
  }
}

const PopUpItem = (item, index) => {

  const [removeItem, setRemoveItem] = useState(true)
  const deleteMessage = () =>{
    setRemoveItem(false)
  }

  return (
    <>
      {removeItem &&
      <div
        className={`${
          item.error ? "bg-red-900" : "bg-green-900"
        } w-[fit-content]   px-[1.25rem] py-[0.5rem] pr-[0.9rem] rounded-[5px] shadow-md text-white flex flex-row gap-[1rem] items-center justify-center my-[0.75rem] hover:brightness-[1.2] animate-slideDown`}
        data-id={index}
        onClick={deleteMessage}
      >
        <FontAwesomeIcon
          icon={item.error ? faCircleXmark : faCircleCheck}
        />
        <p className=" font-semibold ">{item.message}</p>
        <FontAwesomeIcon
          className="border-l-[0.1rem] py-[0.35rem] pl-[1rem] scale-[0.8]"
          icon={faX}
        />
      </div>
      }
    </>
  )
}

const PopupContainer = () => {
  const { popUpMessageList } = useContext(ApiContext);

  return (
    <div className="fixed top-[3rem] left-[50%] translate-x-[-50%] isolate z-[200] max-h-[175px] overflow-hidden ">
      {popUpMessageList.length > 0 &&
        popUpMessageList.map((item, index) => {
          return (
            <PopUpItem key={index} index={index} {...item}/>
          );
        })}
    </div>
  );
};

export default PopupContainer;