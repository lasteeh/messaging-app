import React, { useContext, useEffect } from "react";
import { ApiContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faX,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const PopUpMessage = (props) => {
  const { popUpMessageList, setPopUpMessageList } = useContext(ApiContext);

  const deleteMessage = (e) => {
    const selected = popUpMessageList[e.currentTarget.dataset.id];
    const filtered = popUpMessageList.filter();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (popUpMessageList.length) {
        const trimmedList = popUpMessageList.slice(1);
        setPopUpMessageList(trimmedList);
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [popUpMessageList]);

  return (
    <div className="fixed top-[3rem] left-[50%] translate-x-[-50%] isolate z-[200] max-h-[175px] overflow-hidden ">
      {popUpMessageList.length > 0 &&
        popUpMessageList.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                item.error ? "bg-red-900" : "bg-green-900"
              } w-[fit-content]   px-[1.25rem] py-[0.5rem] pr-[0.9rem] rounded-[5px] shadow-md text-white flex flex-row gap-[1rem] items-center justify-center my-[0.75rem] hover:brightness-[1.2] animate-slideDown`}
              data-id={index}
              onClick={(e) => {
                deleteMessage(e);
              }}
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
          );
        })}
    </div>
  );
};

export default PopUpMessage;
