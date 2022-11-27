import React, { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import AddMemberItem from "./AddMemberItem";
import { fetchCreateChannel } from "../helper/Apicall";
import { ApiContext } from "../context/apiContext";

const CreateChannelModal = (props) => {
  const { createChannel, setCreateChannel, accessData } =
    useContext(ApiContext);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset } = useForm();
  const [isShowing, setIsShowing] = useState(false);
  const [selection, setSelection] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [membersToAdd, setMembersToAdd] = useState({});

  const userOptions = props.usersList;

  const channelSubmit = (data) => {
    let uid = Object.keys(membersToAdd);
    let body = {
      name: data.channelname,
      user_ids: uid,
    };
    setCreateChannel(false);
    fetchCreateChannel(accessData, body);
    reset({ channelname: "" });
  };

  const removeMember = (id) => {
    if (membersToAdd[id]) {
      setMembersToAdd((members) => {
        {
          const shallow = { ...members };
          delete shallow[id];
          return shallow;
        }
      });
    }
  };

  const handleSelectClick = (e) => {
    const selected = e.currentTarget.dataset;

    if (!membersToAdd[selected.value]) {
      setMembersToAdd((members) => {
        return {
          ...members,
          [selected.value]: { email: selected.email, value: selected.value },
        };
      });
    }
    setInputValue("");
    setIsShowing(false);
  };

  const userFilterList = (val) => {
    return userOptions.filter((user) => {
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

  const handleSelectionChange = (e) => {
    let list;
    let val = e.target.value;
    setInputValue(e.target.value);
    startTransition(() => {
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
        setIsShowing(true);
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
    <div
      className="grid place-items-center fixed inset-0 bg-zinc-900/70 text-white z-[105] isolate w-[100vw] h-[100vh] "
      onClick={() => {
        setIsShowing(false);
      }}
    >
      <form
        className="create-channel-form   px-[1rem] pt-[4rem] pb-[1rem] w-[min(500px,100%)] rounded-[12px] "
        onSubmit={handleSubmit(channelSubmit)}
      >
        <div className="flex flex-col justify-start items-stretch gap-[0] w-[100%] rounded-[0.75rem] pl-[1.5rem] pr-[1.5rem] pb-[2.5rem] pt-[1rem]">
          <span className="text-center font-bold text-[1.5rem]">
            Create a New Channel
          </span>
          <input
            {...register("channelname")}
            type="text"
            placeholder="channel name"
            className="create-channel-field p-3 text-black m-[1rem_0] rounded-[5px] indent-[5px] focus:outline-none"
          />

          <input
            type="text"
            placeholder="email or id"
            className="create-channel-field p-3 text-black rounded-[5px] indent-[5px] focus:outline-none"
            value={inputValue}
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
          <div className="flex flex-row justify-center items-start gap-[1.5rem] w-[100%]">
            <button
              type="submit"
              className="cursor-pointer bg-green-600 hover:bg-green-500 pt-2 pb-2 pr-6 pl-6 rounded-[5px]"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setCreateChannel(false)}
              className="cursor-pointer bg-red-700 hover:bg-red-800 pt-2 pb-2 pr-6 pl-6 rounded-[5px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateChannelModal;
