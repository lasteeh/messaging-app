import React, { useContext } from "react";
import { ApiContext } from "../../context/apiContext";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserSecret,
  faUserNurse,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

const MemberListItem = (props) => {
  const {
    setShowSideBarMembersList,
    setChatBoxHeaderName,
    setChatLoading,
    SetMsgType,
  } = useContext(ApiContext);
  const queryClient = useQueryClient();
  const allUsers = queryClient.getQueryData('ALL_USERS')
  const memberName = allUsers.data.find((user) => user.id === props.id);
  const icons = [faUserSecret, faUserNurse, faUserNinja];

  const randomNumber = Math.floor(Math.random() * 2);

  const messageMember = async (e) => {
    let selected = e.currentTarget.dataset;
    SetMsgType("User");

    setShowSideBarMembersList(false);

    setChatBoxHeaderName({
      id: selected.id,
      type: selected.type,
      name: selected.name,
    });
    setChatLoading(true);
  };

  return (
    <div
      className="member-list-item flex flex-row flex-nowrap justify-start items-center gap-[0.6rem]  p-[0.5rem] font-regular hover:brightness-[1.25] cursor-pointer"
      onClick={messageMember}
      data-type="User"
      data-id={props.id}
      data-name={memberName.uid}
    >
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
