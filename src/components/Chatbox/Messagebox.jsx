import React, {useState, useContext} from 'react'
import { fetchSendMessage, fetchRetrieveMessage } from '../../helper/Apicall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ApiContext } from '../../context/apiContext';

export default function Messagebox() {

    const [messagebox, setMessagebox] = useState('');
    const [animateWiggle, setWiggle] = useState(false);
    const {setChatMessages, chatBoxHeaderName, accessData} = useContext(ApiContext)

    const sendMessage = async (e) => {

        if (messagebox !== '') {
          let body = await {
            receiver_id: chatBoxHeaderName.id,
            receiver_class: chatBoxHeaderName.type,
            body: messagebox,
          };
          await fetchSendMessage(accessData, body);
          setMessagebox("");
          let msg = await fetchRetrieveMessage(
            accessData,
            chatBoxHeaderName.id,
            chatBoxHeaderName.type
          );
          await setChatMessages(msg);
        } else {
          setWiggle(true)
          setTimeout(()=>{
            setWiggle(false)},3000);
        }
    };

    return (
    <div className="message-sender flex flex-row items-center justify-start w-[100%] min-h-[80px]  p-6 gap-[1em] z-[5]">
        <input
        className={'message-field max-h-[40px] grow  p-[1rem] active:outline-none focus:outline-none rounded-[0.5rem]' + (animateWiggle?' animate-wiggle':'')}
        placeholder="Type a message..."
        value={messagebox}
        onChange={(e) => setMessagebox(e.currentTarget.value)}
        onKeyPress={(e) => {
            if (e.key === "Enter") {
            sendMessage(e);
            }
        }}
        />
        <span
        className="ml-auto text-[1.4rem] cursor-pointer"
        onClick={sendMessage}
        >
        <FontAwesomeIcon
            className="text-[#e74444] hover:text-[#db2c2c]"
            icon={faPaperPlane}
        />
        </span>
    </div>
  )
}
