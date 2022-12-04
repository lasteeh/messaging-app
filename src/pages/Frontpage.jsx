import React from "react";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faCloud } from "@fortawesome/free-solid-svg-icons";

export default function Frontpage() {
  const style = {
    one: {
      opacity: "0.5",
      fontSize: "10rem",
      translate: "0 -80%",
      animationDuration: "2s",
    },
    two: {
      opacity: "0.6",
      fontSize: "20rem",
      translate: "0 70%",
      animationDuration: "2.5s",
    },
    three: {
      opacity: "0.7",
      fontSize: "6rem",
      translate: "0 70%",
      animationDuration: "1.5s",
    },
    four: {
      opacity: "0.8",
      fontSize: "4rem",
      translate: "0 -290%",
      animationDuration: "1s",
    },
    five: {
      opacity: "0.8",
      fontSize: "6rem",
      translate: "0 -150%",
      animationDuration: "1.7s",
    },
    six: {
      opacity: "0.4",
      fontSize: "8rem",
      translate: "0 -60%",
      animationDuration: "1.9s",
    },
    seven: {
      opacity: "0.4",
      fontSize: "18rem",
      translate: "0 -90%",
      animationDuration: "1.5s",
    },
  };

  return (
    <div className="flex flex-row h-[100%] items-stretch w-[100%] bg-gray-200 ">
      <div className="w-[100%] shrink relative bg-zinc-400 isolate">
        <div className="chatLoading absolute inset-0 h-[100%] w-[100%] overflow-hidden z-[-1]">
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.one}
          />
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.two}
          />
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.three}
          />
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.four}
          />
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.five}
          />
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.six}
          />
          <FontAwesomeIcon
            className="animate-pass absolute"
            icon={faCloud}
            style={style.seven}
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-[min(650px,100%)] shrink-0 bg-gradient-to-b from-zinc-600 to-zinc-700 relative isolate">
        <div className="background-form absolute inset-0 z-[-1] opacity-[0.1] overflow-hidden">
          <FontAwesomeIcon
            className="text-[20rem] rotate-[-30deg] translate-x-[80px] translate-y-[70px]"
            icon={faPlane}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
