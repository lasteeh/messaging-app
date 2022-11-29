import React, { useContext, useEffect, useState, useTransition } from "react";
import { ApiContext } from "../context/apiContext";
import { fetchAddMember, fetchChannelDetails } from "../helper/Apicall";
import { userFilterList } from "../helper/functions";
import MemberListItem from "./MemberListItem";

export default function MemberSidebar() {
  const [addMemberInput, setAddMemberInput] = useState("");
  const [isListing, startTransition] = useTransition();
  const [selection, setSelection] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [temporaryMemberRequest, setTemporaryMemberRequest] = useState({
    id: "",
    member_id: "",
  });
  const [members, setMembers] = useState([]);
  const {
    accessData,
    allUsers,
    usersOptions,
    setUsersOptions,
    chatBoxHeaderName,
  } = useContext(ApiContext);

  const loadMembers = async () => {
    let members = await fetchChannelDetails(accessData, chatBoxHeaderName.id);
    let mem = members.data.channel_members;
    if (mem !== undefined) {
      setMembers(
        mem.map((data, index) => (
          <MemberListItem key={index} id={data.user_id} />
        ))
      );
    }
  };

  const validationFilter = () => {
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
            id: channelMembers.id,
            member_id: Number(target.value),
          });
        } else {
          console.log("existing pre");
        }
      }
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleSelectClick = (e) => {
    const selected = e.currentTarget.dataset;
    setAddMemberInput(selected.email);
    setTemporaryMemberRequest({
      id: channelMembers.id,
      member_id: Number(selected.value),
    });
    setSelection([1]);
    setIsShowing(false);
  };

  const handleSubmitMember = async () => {
    fetchAddMember(accessData, temporaryMemberRequest);
    console.log("success");
  };

  const handleAddMemberField = (e) => {
    setAddMemberInput(e.target.value);

    let list;
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
        list = userFilterList(val, usersOptions);

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
    <div>
      <span className="font-semibold text-[0.9rem] uppercase">
        Members - {members.length}
      </span>
      <div className="flex flex-col justify-start items-stretch">{members}</div>

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
