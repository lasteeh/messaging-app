import React, { useContext, useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faComments,
  faPoo,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/apiContext";

export default function ChatHeader(props) {
  const [addMemberInput, setAddMemberInput] = useState("");
  const {
    showSideBarMembersList,
    allUsers,
    usersOptions,
    setUsersOptions,
    channelMembers,
  } = useContext(ApiContext);
  const [isListing, startTransition] = useTransition();
  const [selection, setSelection] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [addMemberRequest, setAddMemberRequest] = useState({
    id: "",
    member_id: "",
  });
  const [temporaryMemberRequest, setTemporaryMemberRequest] = useState({
    id: "",
    member_id: "",
  });

  const userFilterList = (val) => {
    return usersOptions.filter((user) => {
      const Name = user.label.toLowerCase();
      const Value = user.value.toString();
      const trimmedSearchValue = val
        .replace(/\s+/g, "")
        .toString()
        .toLowerCase();
      return (
        Value.includes(trimmedSearchValue) || Name.includes(trimmedSearchValue)
      );
    });
  };

  const handleSelectClick = (e) => {
    const selected = e.currentTarget.dataset;
    setAddMemberInput(selected.email);
    setTemporaryMemberRequest({
      id: selected.value,
      member_id: channelMembers.id,
    });
  };

  const handleSubmitMember = () => {
    const existingMembers = channelMembers.channel_members;

    if (!addMemberInput) {
      console.log("empty field");
      return;
    }

    if (addMemberInput.length < 3) {
      console.log("too many matches");
      return;
    } else {
      const target = usersOptions.find(
        (user) =>
          user.label === addMemberInput.toLowerCase() ||
          user.value === parseInt(addMemberInput)
      );

      if (!target) {
        console.log(`${addMemberInput} does not exist`);
        return;
      }
      if (target) {
        const existing = existingMembers.find(
          (user) => user.user_id === target.value
        );

        if (selection.length !== 1) {
          console.log("dami pa din pre");
          return;
        }
        if (!existing && selection.length === 1) {
          console.log("all goods pre");
          setTemporaryMemberRequest({
            id: target.value,
            member_id: channelMembers.id,
          });
        } else {
          console.log("existing pre");
        }
      }
    }
  };

  console.log(
    "temporary data:",
    temporaryMemberRequest,
    "send to -> ",
    addMemberRequest,
    "?"
  );

  const handleAddMemberField = (e) => {
    setAddMemberInput(e.target.value);

    let list;
    let val = e.target.value;

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
        list = userFilterList(val);

        if (list.length === 0) {
          setSelection([
            <div className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200">
              <span className="block text-[0.8rem]">OH NO!</span>
              <span>No Matching Results</span>
            </div>,
          ]);
        } else {
          setSelection(
            list.map((item, index) => (
              <div
                key={index}
                className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200"
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

  return (
    <div className="chat-box-header flex flex-row items-center p-2.5 justify-start w-[100%] min-h-[80px] gap-[5px] isolate z-[6]">
      <div className="icon aspect-square h-[50px] p-[5px]">
        <FontAwesomeIcon
          className="h-[100%] w-[100%]"
          icon={
            !props.chatheader || !props.chatheader.type
              ? faPoo
              : props.chatheader.type === "Channel"
              ? faHashtag
              : props.chatheader.type === "User"
              ? faComments
              : faPoo
          }
        />
      </div>
      <div className="grid auto-rows-auto">
        <span className="text-[0.9rem] font-bold">
          {props.chatheader && props.chatheader.name
            ? props.chatheader.name
            : `Welcome, ${props.username}!`}
        </span>
        <span className="text-[0.8rem] block">
          {props.chatheader === `Welcome, ${props.username}!`
            ? props.username
            : ""}
        </span>
      </div>
      <input
        className="hidden"
        type="checkbox"
        name="more-options"
        id="more-options"
      />
      <label
        className="h-[40px] w-[40px] hover:bg-gray-400/25 text-center ml-auto p-[0.6rem] grid place-items-center rounded-full z-[101]"
        htmlFor="more-options"
      >
        <FontAwesomeIcon className="w-[100%] h-[100%]" icon={faEllipsis} />
      </label>

      <div className="more-options fixed min-w-[350px] max-w-[30%] h-[100vh]  top-0 right-0 p-4 pt-[70px] pb-[70px] overflow-y-auto z-[100] isolate">
        {showSideBarMembersList ? (
          <div>
            <span className="font-semibold text-[0.9rem] uppercase">
              Members - {props.members.length}
            </span>
            <div className="flex flex-col justify-start items-stretch">
              {props.members}
            </div>

            <div className="channel-exist-add-member absolute bottom-0 left-0 w-[100%] p-4 isolate">
              <div className="relative w-[100%] p-[2px] z-[1]">
                {isShowing && (
                  <div
                    className={`${
                      isShowing
                        ? "bg-white visible"
                        : "bg-transparent invisible"
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
              />
              <button
                className="w-[100%] rounded-[5px] text-center p-2 mt-[5px] capitalize font-bold shadow-md hover:brightness-125 active:scale-[0.98]"
                type="button"
                onClick={handleSubmitMember}
              >
                add member
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-[75%] text-right max-w-[70%] ml-auto h-[max-content] p-5">
            <p className="text-[0.8rem]">by:</p>
            <p className="text-[2rem] font-bold">DANIEL & LAST</p>
            <p className="text-[0.9rem]">
              Non-commercial project. All pictures belong to their authors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
