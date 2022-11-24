import React, { useContext, useState, useTransition } from "react";
import AddMemberItem from "./AddMemberItem";
import { fetchCreateChannel } from "../api/Apicall";
import { ApiContext } from "../context/apiContext";

const CreateChannelModal = (props) => {
  const { createChannel, setCreateChannel } = useContext(ApiContext);
  const [channelInfo, setChannelInfo] = useState({
    name: "",
    user_ids: [],
  });

  const [isShowing, setIsShowing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [membersToAdd, setMembersToAdd] = useState({});

  const channelSubmit = (e) => {
    e.preventDefault();

    setCreateChannel(false);
  };

  const [selection, setSelection] = useState([]);

  const userOptions = props.usersList;

  const removeMember = (id) => {
    if (!channelInfo.user_ids) {
      console.log("hopia");
      console.log(channelInfo.user_ids);
    } else {
      // for (let i = 0; i < channelInfo.user_ids.length; i++) {
      //   if (channelInfo.user_ids[i] === parseInt(id)) {
      //     // setChannelInfo(
      //     //   channelInfo.user_ids.filter((uid) => uid !== parseInt(id))
      //     // );
      //     // setChannelInfo(channelInfo.user_ids[(2918, 2914, 2908, 1)]);
      //     console.log("sorry na uwu", id);
      //   }
      // }

      // setChannelInfo((prevChannelInfo) => {
      //   const shallow = { ...prevChannelInfo };
      //   shallow["user_ids"].filter((uid) => uid !== id);

      //   return { ...prevChannelInfo, user_ids: [...shallow] };
      // });

      // setChannelInfo((info) =>
      //   info.user_ids.filter(
      //     (uid) => uid !== id
      //   )
      // );

      // setChannelInfo((info) => {
      //   const shallow = info.user_ids;
      //   shallow.filter((item) => item !== id);
      // });

      // setChannelInfo(channelInfo["user_ids"].filter((items) => items !== id));

      setMembersToAdd((members) => {
        {
          const shallow = { ...members };
          delete shallow[id];
          return shallow;
        }
      });
      console.log(typeof id);
    }
  };
  const handleSelectClick = (e) => {
    const val = parseInt(e.currentTarget.dataset.value);
    const email = e.currentTarget.dataset.email;
    const list = {};

    for (let i = 0; i < userOptions.length; i++) {
      if (!membersToAdd[val]) {
        if (userOptions[i].value === val) {
          list[userOptions[i].value] = {
            email: email,
            value: val,
          };
        }
      }
    }
    setMembersToAdd((prevMembers) => {
      return { ...prevMembers, ...list };
    });
    setChannelInfo((prevInfo) => {
      return {
        ...prevInfo,
        user_ids: [...prevInfo.user_ids, val],
      };
    });

    setIsShowing(false);
  };

  const handleSelectionChange = (e) => {
    if (
      !e.target.value ||
      e.target.value === "" ||
      e.target.value === 0 ||
      e.target.value.length < 1
    ) {
      setIsShowing(false);
    } else if (e.target.value.length < 3) {
      setSelection([
        <div className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200">
          <span className="block text-[0.8rem]">OH NO!</span>
          <span>Too Many Matching Results</span>
        </div>,
      ]);
      setIsShowing(true);
    } else if (userOptions) {
      setIsShowing(true);
      startTransition(() => {
        const list = [];
        for (let i = 0; i < userOptions.length; i++) {
          if (
            parseInt(userOptions[i].value) === parseInt(e.target.value) ||
            userOptions[i].label.match(e.target.value)
          ) {
            list.push(userOptions[i]);
            setSelection(
              list.map((item) => (
                <div
                  className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200"
                  key={item.value}
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
    } else {
      setSelection([
        <div className="text-black w-[100%] p-[0.25rem_0.4rem] hover:bg-gray-200">
          <span className="block text-[0.8rem]">OH NO!</span>
          <span>No Matching Results</span>
        </div>,
      ]);
    }
  };
  return (
    <div
      className="grid place-items-center fixed inset-0 bg-gray-900/80 text-white z-[100] isolate w-[100vw] h-[100vh]"
      onClick={() => {
        setIsShowing(false);
      }}
    >
      <form
        className="flex flex-col justify-start items-stretch bg-slate-800 p-5 w-[min(500px,100%)] rounded-[12px] gap-[0]"
        onSubmit={channelSubmit}
      >
        <span>Create a New Channel</span>
        <input
          type="text"
          placeholder="channel name"
          className="p-2 text-black m-[1rem_0]"
          onChange={(e) => {
            setChannelInfo((prevChannelInfo) => {
              return {
                ...prevChannelInfo,
                name: e.target.value,
              };
            });
          }}
        />

        <input
          type="text"
          placeholder="email"
          className="p-2 text-black"
          onChange={handleSelectionChange}
        />

        <div className="relative w-[100%] p-[2px]">
          {isShowing && (
            <div
              className={`${
                isShowing ? "bg-white visible" : "bg-transparent invisible"
              } absolute top-[0] left-[0] w-[100%] max-h-[30vh]   overflow-y-auto rounded-[0.25rem] p-[0.5rem_0rem] z-[20] mt-[0.5rem]`}
            >
              {selection}
            </div>
          )}
        </div>
        <div
          id="add-member-list"
          className="w-[100%] flex flex-row flex-wrap justify-center items-start gap-[0.5rem] p-[1rem]"
        >
          {membersToAdd &&
            Object.keys(membersToAdd).map((key, index) => {
              return (
                <AddMemberItem
                  key={index}
                  value={membersToAdd[key].value}
                  email={membersToAdd[key].email}
                  toggle={removeMember}
                />
              );
            })}
        </div>
        <div>
          <button type="submit" className="cursor-pointer">
            Confirm
          </button>
          <div
            onClick={() => setCreateChannel(false)}
            className="cursor-pointer"
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateChannelModal;
