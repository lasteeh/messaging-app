import React, { useContext, useEffect, useState, useTransition } from "react";
import { ApiContext } from "../context/apiContext";
import { fetchAddMember, fetchChannelDetails } from "../helper/Apicall";
import { userFilterList } from "../helper/functions";
import MemberListItem from "./MemberListItem";
import PopUpMessage, {addPopup} from "./PopUpMessage";

export default function MemberSidebar() {
  const [addMemberInput, setAddMemberInput] = useState("");
  const [isListing, startTransition] = useTransition();
  const [selection, setSelection] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [temporaryMemberRequest, setTemporaryMemberRequest] = useState({
    id: "",
    member_id: "",
  });
  const [membersDisplay, setMembersDisplay] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const {
    accessData,
    allUsers,
    usersOptions,
    setUsersOptions,
    chatBoxHeaderName,
    popUpMessageList,
    setPopUpMessageList,
  } = useContext(ApiContext);

  const loadMembers = async () => {
    let members = await fetchChannelDetails(accessData, chatBoxHeaderName.id);
    let mem = members.data.channel_members;
    setMemberList(mem);
    if (mem !== undefined) {
      setMembersDisplay(
        mem.map((data, index) => (
          <MemberListItem key={index} id={data.user_id} />
        ))
      );
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
          return { error: "dami pa din pre" };
        }
        if (existing) {
          return { error: "existing pre" };
        }
        if (!existing && selection.length === 1) {
          setTemporaryMemberRequest({
            id: chatBoxHeaderName.id,
            member_id: Number(target.value),
          });
          return { success: "all goods pre" };
        }
      }
    }
  };

  useEffect(() => {
    loadMembers();
  }, [chatBoxHeaderName]);

  const handleSubmitMember = async () => {
    let valid = validationFilter();

    if (valid["success"]) {
      // fetchAddMember(accessData, temporaryMemberRequest);
      // setPopUpMessageList([
      //   ...popUpMessageList,
      //   { message: "failed", error: true },
      // ]);
      console.log(valid.success);
      addPopup(valid.success)
    } else {
      console.log(valid.error);
      addPopup(valid.error)
    }

    setAddMemberInput("");
    setIsShowing(false);
    loadMembers();
  };

  const handleSelectClick = (e) => {
    const selected = e.currentTarget.dataset;
    setAddMemberInput(selected.email);
    setTemporaryMemberRequest({
      id: chatBoxHeaderName.id,
      member_id: Number(selected.value),
    });
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
    <div>
      <span className="font-semibold text-[0.9rem] uppercase">
        Members - {membersDisplay.length}
      </span>
      <div className="flex flex-col justify-start items-stretch">
        {membersDisplay}
      </div>

      <div className="channel-exist-add-member absolute bottom-0 left-0 w-[100%] p-4 isolate">
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
    </div>
  );
}
