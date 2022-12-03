import React, { useContext, useState, useEffect, useTransition } from "react";
import { ApiContext } from "../context/apiContext";
import { useQueryClient, useQuery } from "react-query";
import { fetchGetUserChannel } from "../helper/Apicall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faRotate,
  faUserPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ChannelItem from "../components/ChannelItem";
import CreateChannelModal from "../components/CreateChannelModal";
import { userFilterList, channelFilterList } from "../helper/functions";
import { useToasty } from "../components/PopUpMessage";
import {
  TooManyMatches,
  NoMatches,
  TypeToSearch,
} from "../components/ErrorArt/BGMessages";
import RandomWaifu from "../components/ErrorArt/RandomWaifu";

export default function Channel() {
  const toasty = useToasty();
  const [channels, setChannels] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactsDisplay, setContactsDisplay] = useState([]);
  const [channelsDisplay, setChannelsDisplay] = useState([]);
  const [channelPanelSearchInput, setChannelPanelSearchInput] = useState("");
  const [searchSelectionShowing, setSearchSelectionShowing] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [searchSelection, setSearchSelection] = useState([]);
  const [isListing, startTransition] = useTransition();
  const {
    theme,
    setTheme,
    accessData,
    createChannel,
    setCreateChannel,
    msgType,
    setChatBoxHeaderName,
    channelHeaderName,
    setChannelHeaderName,
    setChatLoading,
    setShowSideBarMembersList,
    setUsersOptions,
    usersOptions,
  } = useContext(ApiContext);

  // Query fetch //
  const queryClient = useQueryClient();
  const allUsers = queryClient.getQueryData("ALL_USERS");

  const getMyChannels = () => {
    return useQuery(
      ["USER_CHANNEL", accessData],
      () => fetchGetUserChannel(accessData),
      {
        refetchInterval: 2000,
        onSuccess: (data) => queryClient.setQueryData("USER_CHANNEL", data),
      }
    );
  };

  const { data: ch } = getMyChannels();

  let mycontacts = JSON.parse(localStorage.getItem("contactList"));
  let myContactList = mycontacts.find((data) => data.userID === accessData.id);

  // Events //
  const selectedItem = async (e) => {
    let selected = e.currentTarget.dataset;
    if (selected.type === "Channel") {
      setShowSideBarMembersList(true);
    }
    setChatLoading(true);
    setChatBoxHeaderName({
      id: selected.id,
      type: selected.type,
      name: selected.name,
    });
  };

  const updateContacts = (selected) => {
    let existing;
    if (myContactList === undefined) {
      mycontacts = [
        ...mycontacts,
        {
          userID: accessData.id,
          contacts: [{ uid: selected.id, email: selected.name }],
        },
      ];
      localStorage.setItem("contactList", JSON.stringify(mycontacts));
    } else {
      existing = myContactList.contacts.find(
        (user) => Number(user.uid) === Number(selected.id)
      );
      if (!existing) {
        mycontacts.forEach((data) => {
          if (accessData.id === data.userID) {
            data.contacts = [
              ...data.contacts,
              { uid: selected.id, email: selected.name },
            ];
          }
        });
      } else {
        toasty("existing na sa contacts ih uwu");
        return existing;
      }
    }
    localStorage.setItem("contactList", JSON.stringify(mycontacts));
  };

  const displayContacts = () => {
    let myContactList = mycontacts.find(
      (data) => data.userID === accessData.id
    );
    if (myContactList !== undefined) {
      setContacts(myContactList.contacts);
    }
  };

  const addToContacts = (e) => {
    let selected = e.currentTarget.dataset;

    let existing = updateContacts(selected);
    if (existing) {
      return;
    } else {
      displayContacts();
      setChatBoxHeaderName({
        id: selected.id,
        type: selected.type,
        name: selected.name,
      });
      setChatLoading(true);
      setChannelPanelSearchInput("");
      toggleAddUser();
    }
  };

  const loadChannel = async () => {
    try {
      if (ch.errors === undefined){
        setChannels(
          ch.data.map((data) => {
            return { name: data.name, dataId: data.id, dataMsgType: "Channel" };
          })
        );
      }
    } catch (e){
      // console.log(e)
      // shadow error
    }
  };

  const toggleAddUser = () => {
    setIsAddingUser((value) => !value);
    // setSearchSelectionShowing((value) => !value);
  };

  const handleSearch = (e) => {
    let val = e.currentTarget.value;
    let userlist;
    let channellist;
    setChannelPanelSearchInput(val);

    startTransition(() => {
      if (isAddingUser && msgType === "User") {
        console.log("look for new user");
        if (!usersOptions || usersOptions === "") {
          setUsersOptions(
            allUsers.data &&
              allUsers.data.map((user) => {
                return { value: user.id, label: user.uid };
              })
          );
        }

        if (val.length < 3) {
          setSearchSelection(<TooManyMatches />);
        } else if (val.length > 3) {
          userlist = userFilterList(val, usersOptions);

          if (userlist.length === 0) {
            setSearchSelection(<NoMatches />);
          } else {
            setSearchSelection(
              userlist.map((item, index) => (
                <ChannelItem
                  key={index}
                  name={item.label}
                  dataId={item.value}
                  dataMsgType={"User"}
                  isSearchResult={true}
                  onClickSelected={addToContacts}
                />
              ))
            );
          }
        }
      }
      if (!isAddingUser && msgType === "User") {
        console.log("filter only");
        userlist = contacts.filter((user) => {
          const Name = user.email.toLowerCase();
          const Value = user.uid.toString();
          const trimmedSearchValue = val.toString().toLowerCase();
          return (
            Value.includes(trimmedSearchValue) ||
            Name.includes(trimmedSearchValue)
          );
        });

        if (userlist.length === 0) {
          setSearchSelection(<NoMatches />);
        } else {
          setSearchSelection(
            userlist.map((item, index) => (
              <ChannelItem
                key={index}
                name={item.email}
                dataId={item.uid}
                dataMsgType={"User"}
                onClickSelected={selectedItem}
              />
            ))
          );
        }
      }
      if (msgType === "Channel") {
        channellist = channelFilterList(val, channels);

        if (channellist.length === 0) {
          setSearchSelection(<NoMatches />);
        } else {
          setSearchSelection(
            channellist.map((item, index) => (
              <ChannelItem
                name={item.name}
                dataId={item.dataId}
                key={index}
                dataMsgType={"Channel"}
                onClickSelected={selectedItem}
              />
            ))
          );
        }
      }
    });
  };

  useEffect(() => {
    if (channelPanelSearchInput.length > 0) {
      setSearchSelectionShowing(true);
    } else {
      setSearchSelectionShowing(false);
    }
  }, [channelPanelSearchInput]);
  useEffect(() => {
    setChannelPanelSearchInput("");
    setIsAddingUser(false);
  }, [msgType]);
  useEffect(() => {
    if (!isAddingUser) {
      setChannelPanelSearchInput("");
      setSearchSelectionShowing(false);
    }
    setChannelHeaderName(
      isAddingUser
        ? "Add Contact"
        : !isAddingUser && msgType === "User"
        ? "Direct Messages"
        : !isAddingUser && msgType === "Channel"
        ? "Channels"
        : "Home"
    );
  }, [isAddingUser]);

  useEffect(() => {
    setContactsDisplay(
      contacts.map((user, index) => (
        <ChannelItem
          key={index}
          name={user.email}
          dataId={user.uid}
          dataMsgType={"User"}
          onClickSelected={selectedItem}
        />
      ))
    );
  }, [contacts, isAddingUser]);

  useEffect(() => {
    setChannelsDisplay(
      channels.map((data, index) => (
        <ChannelItem
          key={index}
          name={data.name}
          dataId={data.dataId}
          dataMsgType={"Channel"}
          onClickSelected={selectedItem}
        />
      ))
    );
  }, [channels]);

  useEffect(() => {
    loadChannel();
    displayContacts();
  }, [createChannel, ch]);

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

          {msgType !== undefined && (
            <FontAwesomeIcon
              icon={
                msgType === "Channel"
                  ? faSquarePlus
                  : msgType === "User" && isAddingUser
                  ? faMagnifyingGlass
                  : msgType === "User" && !isAddingUser
                  ? faUserPlus
                  : ""
              }
              className={`channel-plus ml-auto cursor-pointer text-[1.25rem] transition-[outline] rounded-[2px] ${
                isAddingUser && msgType === "User"
                  ? "outline-4 outline-inherit outline outline-offset-[0.2rem]"
                  : ""
              }`}
              onClick={() => {
                if (msgType === "Channel") {
                  setUsersOptions(
                    allUsers.data &&
                      allUsers.data.map((user) => {
                        return { value: user.id, label: user.uid };
                      })
                  );
                  setCreateChannel(true);
                }
                if (msgType === "User") {
                  toggleAddUser();
                  console.log(isAddingUser, "is adding?");
                  console.log(searchSelectionShowing, "is selection showing");
                }
              }}
            />
          )}
        </div>

        <div className="channel-filter p-[0.8rem]">
          <input
            className="indent-[10px] w-[100%] h-[100%] p-2.5  focus:outline-none"
            placeholder={`Search ${
              isAddingUser
                ? "User"
                : !isAddingUser && msgType === "User"
                ? "Contacts"
                : !isAddingUser && msgType === "Channel"
                ? "Channel"
                : ""
            }`}
            onChange={handleSearch}
            value={channelPanelSearchInput}
          />
        </div>

        <div className="channel-items flex flex-col justify-start items-stretch w-[100%] h-[100%] p-2.5 gap-2.5 overflow-y-auto">
          {searchSelectionShowing === false
            ? msgType === "User" && !isAddingUser
              ? contactsDisplay
              : msgType === "Channel" && !isAddingUser
              ? channelsDisplay
              : ""
            : searchSelection}
          {!searchSelectionShowing && isAddingUser && <TypeToSearch />}
          {!isAddingUser &&
            !searchSelectionShowing &&
            msgType !== "User" &&
            msgType !== "Channel" && <RandomWaifu />}
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
