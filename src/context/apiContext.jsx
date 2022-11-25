import React, { createContext, useState, useEffect } from "react";

export let ApiContext = createContext({});

export const ApiContextProvider = ({ children }) => {
  const [accessData, setAccessData] = useState(
    sessionStorage.getItem("token") === null
      ? []
      : JSON.parse(sessionStorage.getItem("token"))
  );
  const [channels, setChannels] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [createChannel, setCreateChannel] = useState(false);
  const [msgType, SetMsgType] = useState("User");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatBoxHeaderName, setChatBoxHeaderName] = useState(
    "Hey there, Welcome!"
  );
  const [channelHeaderName, setChannelHeaderName] = useState("Home");
  const [allUsers, setAllUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [showSideBarMembersList, setShowSideBarMembersList] = useState(false);

  useEffect(() => {
    if (accessData.length !== 0) {
      sessionStorage.setItem("token", JSON.stringify(accessData));
    }
  }, [accessData]);

  return (
    <ApiContext.Provider
      value={{
        chat,
        setChat,
        allUsers,
        setAllUsers,
        accessData,
        setAccessData,
        channels,
        setChannels,
        createChannel,
        setCreateChannel,
        msgType,
        SetMsgType,
        chatMessages,
        setChatMessages,
        channelMembers,
        setChannelMembers,
        chatBoxHeaderName,
        setChatBoxHeaderName,
        channelHeaderName,
        setChannelHeaderName,
        chatLoading,
        setChatLoading,
        showSideBarMembersList,
        setShowSideBarMembersList,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
