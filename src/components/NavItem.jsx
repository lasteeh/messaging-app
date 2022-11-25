import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUsers,
  faDoorOpen,
  faIcons,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

const NavItem = (props) => {
  let navigate = useNavigate();
  const { msgType, SetMsgType, setChatBoxHeaderName, setChannelHeaderName } =
    useContext(ApiContext);

  return (
    <div
      className={`nav-item grid items-center aspect-square w-[100%] max-w-[70px] p-3  bg-zinc-600 hover:cursor-pointer ${props.className}`}
      onClick={() => {
        props.name === "logout"
          ? navigate("/", { replace: true })
          : SetMsgType(props.msgtype);
        setChatBoxHeaderName("...");
        setChannelHeaderName(
          props.name === "messages"
            ? "Messages"
            : props.name === "channels"
            ? "Channels"
            : "Home"
        );
      }}
    >
      <FontAwesomeIcon
        icon={
          props.name === "logo"
            ? faDiscord
            : props.name === "messages"
            ? faMessage
            : props.name === "channels"
            ? faUsers
            : props.name === "logout"
            ? faDoorOpen
            : faIcons
        }
        className="w-[100%] h-[100%] text-slate-100"
      />
    </div>
  );
};
export default NavItem;
