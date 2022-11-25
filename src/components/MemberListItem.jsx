import React, { useContext, useState } from "react";
import { ApiContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faUserNurse,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

const MemberListItem = (props) => {
  // const { allUsers } = useContext(ApiContext);
  // const [channelMemberInfo, setChannelMemberInfo] = useState();

  // const userItems = allUsers.data;

  const icons = [faUserSecret, faUserNurse, faUserNinja];

  const randomNumber = Math.floor(Math.random() * 2);

  return (
    <div className="flex flex-row flex-nowrap justify-start items-center gap-[0.6rem]  p-[0.5rem] font-regular">
      <div className="aspect-square min-h-[30px] max-h-[35px] bg-slate-500  p-[0.7rem] grid place-items-center rounded-full">
        <FontAwesomeIcon
          icon={icons[randomNumber]}
          className="h-[100%] w-[100%]"
        />
      </div>
      <h1>{props.name}</h1>
    </div>
  );
};

export default MemberListItem;
