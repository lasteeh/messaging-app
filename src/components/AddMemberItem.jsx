import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const AddMemberItem = (props) => {
  return (
    <div
      className="flex flex-row justify-start items-center relative max-h-[2rem] bg-blue-100 gap-[1rem] text-[0.8rem] text-[black] hover:brightness-90 w-[max-content]"
      onClick={() => {
        props.toggle(props.value);
      }}
    >
      <FontAwesomeIcon icon={faUser} className="p-2" />
      <span>{props.email ? props.email : "onepunch@man.com"}</span>
      <FontAwesomeIcon
        icon={faTrashCan}
        className="bg-rose-400 p-2 ml-[1rem]"
      />
    </div>
  );
};

export default AddMemberItem;
