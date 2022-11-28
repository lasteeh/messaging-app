import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faUserNurse,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

const MemberListItem = (props) => {
  
  const memberName = props.users.data.find(user => user.id === props.id)
  const icons = [faUserSecret, faUserNurse, faUserNinja];

  const randomNumber = Math.floor(Math.random() * 2);

  return (
    <div className="member-list-item flex flex-row flex-nowrap justify-start items-center gap-[0.6rem]  p-[0.5rem] font-regular">
      <div className="aspect-square min-h-[30px] max-h-[35px]   p-[0.7rem] grid place-items-center rounded-[0.5rem] shadow-md">
        <FontAwesomeIcon
          icon={icons[randomNumber]}
          className="h-[100%] w-[100%]"
        />
      </div>
      <h1>{memberName.uid}</h1>
    </div>
  );
};

export default MemberListItem;