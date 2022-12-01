import React, { useContext, useState, useEffect } from "react";
import { fetchGetUserChannel } from "../helper/Apicall";
import { ApiContext } from "../context/apiContext";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import ChannelItem from "../components/ChannelItem";
import CreateChannelModal from "../components/CreateChannelModal";
import myContacts from "../users/contacts.json";

export default function Channel() {
  const [channels, setChannels] = useState([]);
  const [contacts, setContacts] = useState(
    localStorage.getItem("contactList") === null
      ? []
      : JSON.parse(localStorage.getItem("contactList"))
  );
  const [channelPanelSearchInput, setChannelPanelSearchInput] = useState("");
  const {
    theme,
    setTheme,
    accessData,
    createChannel,
    setCreateChannel,
    msgType,
    setChatBoxHeaderName,
    channelHeaderName,
    setChatLoading,
    setShowSideBarMembersList,
    setUsersOptions,
    usersOptions,
  } = useContext(ApiContext);

  // Query fetch //
  const queryClient = useQueryClient();
  const allUsers = queryClient.getQueryData("ALL_USERS");

  // Events //
  const selectedItem = async (e) => {
    let selected = e.currentTarget.dataset;

    if (selected.type === "Channel") {
      setShowSideBarMembersList(true);
    }
    setChatBoxHeaderName({
      id: selected.id,
      type: selected.type,
      name: selected.name,
    });
    setChatLoading(true);
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
  };

  const loadUserContacts = () => {
    // let usercontacts = myContacts.users.find(
    //   (user) => user.uid === accessData.id.toString()
    // );
    // if (usercontacts !== undefined) {
    //   setContacts(
    //     usercontacts.contacts.map((user, index) => (
    //       <ChannelItem
    //         key={index}
    //         name={user.email}
    //         dataId={user.uid}
    //         dataMsgType={"User"}
    //         onClickSelected={selectedItem}
    //       />
    //     ))
    //   );
    // }
  };

  const handleSearch = () => {};

  useEffect(() => {
    loadChannel();
    loadUserContacts();
  }, [createChannel]);

  const handleTheme = (e) => {
    let themeID = e.target.id.toLowerCase();
    localStorage.setItem("themePreference", JSON.stringify(themeID));
    setTheme(themeID);
  };

  return (
    <>
      <div className="channel-panel flex flex-col items-stretch justify-start  w-[100%] max-w-[320px] h-[100%] z-[3]">
        <div className="channel-panel-header flex flex-row flex-wrap items-center justify-start w-[100%] min-h-[80px]  p-5 font-bold ">
          <span>{channelHeaderName}</span>
          {channelHeaderName === "Channels" ? (
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="channel-plus ml-auto cursor-pointer text-[1.25rem]"
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

        <div className="channel-filter p-[0.8rem]">
          <input
            className="indent-[10px] w-[100%] h-[100%] p-2.5  focus:outline-none"
            placeholder="Search"
            onChange={handleSearch}
            value={channelPanelSearchInput}
          />
        </div>

        <div className="channel-items flex flex-col items-start w-[100%] h-[100%] p-2.5 gap-2.5 overflow-y-auto">
          {msgType === "User" ? contacts : channels}
        </div>
        <div className="theme-picker mt-auto p-[0.8rem] min-h-[70px] w-[100%] flex flex-row justify-center items-center gap-[1rem]">
          {/* {Dark Theme} */}
          <label className="sr-only" htmlFor="dark">
            dark
          </label>
          <input
            className="cursor-pointer opacity-[0.75]"
            type="radio"
            name="theme"
            id="dark"
            checked={theme === "dark"}
            value="dark"
            title="Dark Theme"
            onChange={handleTheme}
          />
          {/* {Light Theme} */}
          <label className="sr-only" htmlFor="light">
            light
          </label>
          <input
            className="cursor-pointer opacity-[0.75]"
            type="radio"
            name="theme"
            id="light"
            title="Light Theme"
            checked={theme === "light"}
            value="light"
            onChange={handleTheme}
          />
          {/* {Cobalt Theme} */}
          <label className="sr-only" htmlFor="cobalt">
            cobalt
          </label>
          <input
            className="cursor-pointer opacity-[0.75]"
            type="radio"
            name="theme"
            id="cobalt"
            title="Cobalt Theme"
            checked={theme === "cobalt"}
            value="cobalt"
            onChange={handleTheme}
          />
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
