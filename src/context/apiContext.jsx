import React, {createContext, useState, useEffect} from 'react'

export let ApiContext = createContext({});

export const ApiContextProvider = ({children}) =>{
    const [accessData, setAccessData] = useState(
        sessionStorage.getItem('token') === null
        ? []
        : JSON.parse(sessionStorage.getItem('token'))
    );
    const [channels, setChannels] = useState([]);
    const [channelMembers, setChannelMembers] = useState([]);
    const [createChannel, setCreateChannel]= useState(false)
    const [msgType, SetMsgType] = useState('User')
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        if (accessData.length !== 0) {
            sessionStorage.setItem('token', JSON.stringify(accessData))
        }
    },[accessData])

  return (
    <ApiContext.Provider value={{
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
        setChannelMembers}}>

        {children}
    </ApiContext.Provider>
  )
}
