import React from "react";
import NavItem from "../components/NavItem";

export default function Navbar() {
  return (
    <div className="nav-bar flex flex-col items-center  h-[100%] p-2.5 gap-[0.8rem] overflow-y-auto z-[3]">
      <NavItem name="logo" id="logo" />
      <div className="logo-border h-[2px] w-[50%]  rounded-full"></div>
      <NavItem name="messages" msgtype={"User"} />
      <NavItem name="channels" msgtype={"Channel"} />
      <NavItem name="logout" className="mt-auto" />
    </div>
  );
}
