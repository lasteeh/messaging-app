import React, { useContext, useState, useEffect } from "react";
import {
  fetchGetUserChannel,
  fetchAllUsers,
  fetchRetrieveMessage,
  fetchChannelDetails,
} from "../api/Apicall";
import { ApiContext } from "../context/apiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import ChannelItem from "../components/ChannelItem";
import CreateChannelModal from "../components/CreateChannelModal";
import myContacts from "../users/contacts.json";

export default function Channel() {
  const [channels, setChannels] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [usersOptions, setUsersOptions] = useState();
  const {
    allUsers,
    setAllUsers,
    accessData,
    createChannel,
    setCreateChannel,
    msgType,
    chateMessages,
    setChatMessages,
    channelMembers,
    setChannelMembers,
    setChatBoxHeaderName,
    channelHeaderName,
    setChatLoading,
    setShowSideBarMembersList,
  } = useContext(ApiContext);

  const selectedItem = async (e) => {
    let selected = e.currentTarget.dataset;
    let msg = await fetchRetrieveMessage(
      accessData,
      selected.id,
      selected.type
    );
    setChatMessages(msg);

    if (selected.type === "Channel") {
      let members = await fetchChannelDetails(accessData, selected.id);
      setChannelMembers(members.data);
    }
    setChatBoxHeaderName(selected.name);
    setChatLoading(true);
    setShowSideBarMembersList(true);
  };

  const loadChannel = async () => {
    let ch = await fetchGetUserChannel(accessData);
    setChannels(
      ch.data === undefined
        ? ch.errors
        : ch.data.map((data, index) => (
            <ChannelItem
              key={index}
              name={data.name}
              dataId={data.id}
              dataMsgType={"Channel"}
              onClickSelected={selectedItem}
            />
          ))
    );

    setChatBoxHeaderName(ch.data.name);

    let users = await fetchAllUsers(accessData);
    setAllUsers(users);
  };

  const loadUserContacts = () => {
    let usercontacts = myContacts.users.find(
      (user) => user.uid === accessData.id.toString()
    );

    if (usercontacts !== undefined) {
      setContacts(
        usercontacts.contacts.map((user, index) => (
          <ChannelItem
            key={index}
            name={user.email}
            dataId={user.uid}
            dataMsgType={"User"}
            onClickSelected={selectedItem}
          />
        ))
      );
    }
  };

  useEffect(() => {
    loadChannel();
    loadUserContacts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-stretch justify-start bg-zinc-500 w-[100%] max-w-[320px] h-[100%]">
        <div className="flex flex-row flex-wrap items-center justify-start w-[100%] min-h-[80px] bg-zinc-700 p-5 font-bold text-white">
          <span>{channelHeaderName}</span>
          {channelHeaderName === "Channels" ? (
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="ml-auto cursor-pointer text-[1.25rem]"
              onClick={() => {
                setUsersOptions(
                  allUsers.data &&
                    allUsers.data.map((user) => {
                      return { value: user.id, label: user.uid };
                    })
                );
                setCreateChannel(true);
              }}
            />
          ) : (
            ""
          )}
        </div>

        <div className="p-2.5">
          <input className="w-[100%] h-[100%] p-2.5"></input>
        </div>

        <div className="flex flex-col items-start w-[100%] h-[100%] p-2.5 gap-2.5 overflow-y-auto">
          {msgType === "User" ? contacts : channels}
        </div>
      </div>
      {createChannel ? (
        <CreateChannelModal usersList={usersOptions} />
      ) : (
        <div />
      )}
    </>
  );
}
