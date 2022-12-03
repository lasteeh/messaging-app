import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { ApiContext } from "../../context/apiContext";
import { fetchAddMember, fetchChannelDetails } from "../../helper/Apicall";
import { userFilterList } from "../../helper/functions";
import MemberListItem from "./MemberListItem";
import { useToasty } from "../PopUpMessage";
import { useQueryClient, useQuery } from "react-query";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

export default function MemberListSidebar() {
  const [addMemberInput, setAddMemberInput] = useState("");
  const [isListing, startTransition] = useTransition();
  const [selection, setSelection] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [owner, setOwner] = useState();
  const [membersDisplay, setMembersDisplay] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const {
    accessData,
    usersOptions,
    setUsersOptions,
    chatBoxHeaderName,
    setShowSideBarMembersList,
    setChatBoxHeaderName,
    setChatLoading,
    SetMsgType,
  } = useContext(ApiContext);
  const toasty = useToasty();
  const queryClient = useQueryClient();
  const allUsers = queryClient.getQueryData("ALL_USERS");

  const getMemberList = () => {
    return useQuery(
      ["CHANNEL_MEMBERS", accessData, chatBoxHeaderName],
      () => fetchChannelDetails(accessData, chatBoxHeaderName.id),
      {
        refetchInterval: 2000,
        onSuccess: (data) => queryClient.setQueryData("CHANNEL_MEMBERS", data),
      }
    );
  };
  const { data: members } = getMemberList();

  const loadMembers = async () => {
    try {
      let mem = members.data.channel_members.filter(
        (item) => item.user_id !== members.data.owner_id
      );
      const ownerName = allUsers.data.find(
        (user) => user.id === members.data.owner_id
      );
      setOwner({ owner_id: members.data.owner_id, owner_name: ownerName.uid });
      setMemberList(mem);
      if (mem !== undefined) {
        setMembersDisplay(
          mem.map((data, index) => (
            <MemberListItem key={index} id={data.user_id} />
          ))
        );
      }
    } catch (e) {
      // console.log(e)
      //shadow error
    }
  };

  const validationFilter = () => {
    const existingMembers = memberList.map((member) => {
      return usersOptions.find((user) => user.value === member.user_id);
    });

    if (!addMemberInput) {
      return { error: "empty field" };
    }

    if (addMemberInput.length < 3) {
      return { error: "too many matches" };
    } else {
      const target = userFilterList(addMemberInput, usersOptions);
      if (!target || target.length === 0) {
        return { error: `${addMemberInput} does not exist` };
      }
      if (target) {
        const existing = existingMembers.find(
          (user) =>
            Number(user.value) === Number(target[0].value) ||
            user.label === target[0].label
        );
        if (selection.length !== 1) {
          return { error: "dami pa din kaparehas pre" };
        }
        if (existing) {
          return { error: "existing pre" };
        }
        if (!existing && selection.length === 1) {
          return {
            success: {
              message: "all goods pre",
              id: chatBoxHeaderName.id,
              member_id: Number(target[0].value),
            },
          };
        }
      }
    }
  };

  useEffect(() => {
    loadMembers();
  }, [chatBoxHeaderName, members]);

  const handleSubmitMember = () => {
    let valid = validationFilter();
    console.log(valid);
    if (valid["success"]) {
      fetchAddMember(accessData, {
        id: valid["success"].id,
        member_id: valid["success"].member_id,
      });
      toasty(valid["success"].message, false);
      setAddMemberInput("");
      setIsShowing(false);
      loadMembers();
    } else {
      toasty(valid.error);
    }
  };

  const handleSelectClick = (e) => {
    const selected = e.currentTarget.dataset;
    setAddMemberInput(selected.email);
    setSelection([1]);
    setIsShowing(false);
  };

  const handleAddMemberField = (e) => {
    setAddMemberInput(e.currentTarget.value);

    let userlist;
    let val = e.currentTarget.value;

    startTransition(() => {
      if (!usersOptions || usersOptions === "") {
        setUsersOptions(
          allUsers.data &&
            allUsers.data.map((user) => {
              return { value: user.id, label: user.uid };
            })
        );
      }

      if (val === "") {
        setIsShowing(false);
      } else if (val.length < 3) {
        setSelection([
          <div className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200">
            <span className="block text-[0.8rem]">OH NO!</span>
            <span>Too Many Matching Results</span>
          </div>,
        ]);
        setIsShowing(true);
      } else {
        userlist = userFilterList(val, usersOptions);

        if (userlist.length === 0) {
          setSelection([
            <div className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200">
              <span className="block text-[0.8rem]">OH NO!</span>
              <span>No Matching Results</span>
            </div>,
          ]);
        } else {
          setSelection(
            userlist.map((item, index) => (
              <div
                key={index}
                className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200 cursor-pointer"
                onClick={(e) => {
                  handleSelectClick(e);
                }}
                data-value={item.value}
                data-email={item.label}
              >
                <span>{item.label}</span>
                <span className="block text-[0.8rem]">UID: {item.value}</span>
              </div>
            ))
          );
        }
      }
    });
  };

  const messageOwner = async (e) => {
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
    <>
      <div className="overflow-y-auto w-[100%] h-[100%]">
        {membersDisplay.length > 0 && (
          <>
            <span className="font-semibold text-[0.9rem] uppercase">
              {membersDisplay.length > 1 ? "Members" : "Member"} -{" "}
              {membersDisplay.length}
            </span>
            <div className="flex flex-col justify-start items-stretch">
              {membersDisplay}
            </div>
          </>
        )}
        {owner && (
          <>
            <span className="font-semibold text-[0.9rem] uppercase">Owner</span>
            <div
              className="member-list-item flex flex-row justify-start items-center gap-[0.6rem] p-[0.5rem] hover:brightness-[1.25] cursor-pointer"
              onClick={messageOwner}
              data-name={owner.owner_name}
              data-id={owner.owner_id}
              data-type="User"
            >
              <div className="aspect-square min-h-[30px] max-h-[35px] p-[0.7rem] grid place-items-center rounded-[0.5rem] shadow-md">
                <FontAwesomeIcon
                  icon={faCrown}
                  className="h-[100%] w-[100%] text-yellow-400"
                />
              </div>

              <span>{owner.owner_name}</span>
            </div>
          </>
        )}
      </div>

      <div className="channel-exist-add-member  w-[100%] mt-auto isolate">
        <div className="relative w-[100%] p-[2px] z-[1]">
          {isShowing && (
            <div
              className={`${
                isShowing ? "bg-white visible" : "bg-transparent invisible"
              } absolute bottom-[100%] left-[0] w-[100%] max-h-[20vh] break-all  overflow-y-auto rounded-[0.25rem] p-[0.5rem_0rem] z-[20] mt-[0.5rem] shadow-md text-black`}
            >
              {selection}
            </div>
          )}
        </div>
        <input
          className="w-[100%] rounded-[5px] p-2 focus:outline-none indent-[0.5rem] z-[2]"
          type="text"
          onChange={handleAddMemberField}
          placeholder="UID or Email"
          value={addMemberInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmitMember(e);
            }
          }}
        />
        <button
          className="w-[100%] rounded-[5px] text-center p-2 mt-[5px] capitalize font-bold shadow-md hover:brightness-125 active:scale-[0.98]"
          type="button"
          onClick={handleSubmitMember}
        >
          add member
        </button>
      </div>
    </>
  );
}
