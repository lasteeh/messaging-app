import React, { useContext, useState, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import AddMemberItem from "./AddMemberItem";
import { fetchCreateChannel } from "../api/Apicall";
import { ApiContext } from "../context/apiContext";

const CreateChannelModal = (props) => {
  const { createChannel, setCreateChannel } = useContext(ApiContext);
  const [channelInfo, setChannelInfo] = useState({
    name: "",
    user_ids: [],
  });

  const [membersToAdd, setMembersToAdd] = useState([]);
  let membersBoxes = [];

  const { handleSubmit, control } = useForm();
  const { field } = useController({ name: "selection", control });

  const channelSubmit = () => {
    console.log(":", channelInfo);
    setCreateChannel(false);
  };

  const userOptions = props.usersList;

  const removeOnClick = () => {
    console.log("clicked");
  };

  const handleSelectChange = (option) => {
    field.onChange(
      setChannelInfo((prevChannelInfo) => {
        return {
          ...prevChannelInfo,
          user_ids: [...prevChannelInfo.user_ids, option.value],
        };
      })
    );
    for (let i = 0; i < userOptions.length; i++) {
      if (userOptions[i].value === option.value) {
        setMembersToAdd((prevMembers) => {
          return [
            ...prevMembers,
            <AddMemberItem
              key={userOptions[i].value}
              uid={userOptions[i].value}
              email={userOptions[i].label}
              toggle={removeOnClick}
            />,
          ];
        });
      }
    }
    console.log(membersToAdd[0].props.uid);
  };

  return (
    <div className="grid place-items-center fixed inset-0 bg-gray-900/80 text-white z-[100]">
      <form
        className="flex flex-col justify-start items-stretch bg-slate-800 p-5 w-[min(500px,100%)] rounded-[12px] gap-[1rem]"
        onSubmit={handleSubmit(channelSubmit)}
      >
        <span>Create a New Channel</span>
        <input
          type="text"
          placeholder="channel name"
          className="p-2 text-black"
          onChange={(e) => {
            setChannelInfo((prevChannelInfo) => {
              return {
                ...prevChannelInfo,
                name: e.target.value,
              };
            });
          }}
        />
        <div>
          <Select
            className="text-black"
            value={
              userOptions &&
              userOptions.find(({ value }) => value === field.value)
            }
            onChange={handleSelectChange}
            options={userOptions}
            closeMenuOnSelect={false}
          />
        </div>
        <div
          id="add-member-list"
          className="w-[100%] flex flex-row flex-wrap justify-center items-start gap-[0.5rem] p-[1rem]"
        >
          {membersToAdd && membersToAdd}
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
