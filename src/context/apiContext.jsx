import React, { createContext, useState, useEffect } from "react";

export let ApiContext = createContext({});

export const ApiContextProvider = ({ children }) => {
  const [accessData, setAccessData] = useState(
    sessionStorage.getItem("token") === null
      ? []
      : JSON.parse(sessionStorage.getItem("token"))
  );
  const [channels, setChannels] = useState([]);
  const [createChannel, setCreateChannel] = useState(false);
  const [msgType, SetMsgType] = useState("User");
  const [chatBoxHeaderName, setChatBoxHeaderName] = useState([]);
  const [channelHeaderName, setChannelHeaderName] = useState("Home");
  const [chat, setChat] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [showSideBarMembersList, setShowSideBarMembersList] = useState(false);
  const [usersOptions, setUsersOptions] = useState();
  const [theme, setTheme] = useState(
    localStorage.getItem('themePreference') === null ? "dark" : JSON.parse(localStorage.getItem('themePreference'))
    );
  const [popUpMessageList, setPopUpMessageList] = useState([]);
  localStorage.getItem('contactList') === null ? localStorage.setItem('contactList', JSON.stringify([])) : ''

  useEffect(() => {
    if (accessData.length !== 0) {
      sessionStorage.setItem("token", JSON.stringify(accessData));
    }
  }, [accessData]);

  return (
    <ApiContext.Provider
      value={{
        theme,
        setTheme,
        chat,
        setChat,
        accessData,
        setAccessData,
        channels,
        setChannels,
        createChannel,
        setCreateChannel,
        msgType,
        SetMsgType,
        chatBoxHeaderName,
        setChatBoxHeaderName,
        channelHeaderName,
        setChannelHeaderName,
        chatLoading,
        setChatLoading,
        showSideBarMembersList,
        setShowSideBarMembersList,
        usersOptions,
        setUsersOptions,
        popUpMessageList,
        setPopUpMessageList,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
