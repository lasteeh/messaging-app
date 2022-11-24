import React from "react";
import NavItem from "../components/NavItem";

export default function Navbar() {

  return (
    <div className="flex flex-col items-center bg-zinc-800  h-[100%] p-2.5 gap-[0.8rem] overflow-y-auto">
      <NavItem name="logo" id="logo" />
      <div className="h-[2px] w-[50%] bg-zinc-600 rounded-full"></div>
      <NavItem name="messages" className='hover:cursor-pointer' msgtype={'User'}/>
      <NavItem name="channels" className='hover:cursor-pointer' msgtype={'Channel'}/>
      <NavItem name="logout" className="mt-auto" />
    </div>
  );
}
