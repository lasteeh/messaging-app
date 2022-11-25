import React from "react";
import { Outlet } from "react-router-dom";

export default function Frontpage() {

  return (
    <div className="flex flex-row h-[100%] items-stretch w-[100%] bg-gray-200">
      <div className="w-[100%] bg-zinc-400"></div>

      <div className="flex items-center justify-center w-[80%] bg-gradient-to-b from-zinc-600 to-zinc-700">
        <Outlet/>
      </div>
    </div>
  );
}