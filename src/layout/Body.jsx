import React from "react";
import Nav from "./Navbar";
import Channel from "./Channel";
import Chatbox from "./Chatbox";

export default function Body() {
  return (
    <div className="flex flex-row items-stretch w-[100%] h-[100%] bg-green-900">
      <Nav />
      <Channel />
      <Chatbox />
    </div>
  );
}
