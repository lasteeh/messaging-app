import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";

const AddMemberItem = (props) => {
  return (
    <div
      className="temp-member flex flex-row justify-start items-center relative max-h-[2rem] gap-[1rem] text-[0.8rem] text-[black] hover:brightness-90 w-[max-content] rounded-[5px] overflow-hidden shadow-sm shadow-current "
      onClick={() => {
        props.toggle(props.value);
      }}
    >
      <FontAwesomeIcon icon={faUser} className="p-2" />
      <span>{props.email ? props.email : "onepunch@man.com"}</span>
      <FontAwesomeIcon
        icon={faXmark}
        className="remove-icon bg-rose-400/75 p-2 ml-[1rem]"
      />
    </div>
  );
};

export default AddMemberItem;
