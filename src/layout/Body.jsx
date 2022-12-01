import React from "react";
import Nav from "./Navbar";
import Channel from "./Channel";
import Chatbox from "./Chatbox";
import PopUpMessage from "../components/PopUpMessage";
import Queryloader from "../helper/Queryloader";

export default function Body() {
  return (
    <div className="flex flex-row items-stretch w-[100%] h-[100%] isolate">
      <Nav />
      <Channel />
      <Chatbox />
      <PopUpMessage />
      <Queryloader />
    </div>
  );
}
