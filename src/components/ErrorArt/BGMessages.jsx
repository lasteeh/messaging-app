import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSkull,
  faRotate,
  faUserPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export function TooManyMatches() {
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-[0.5rem]">
      <FontAwesomeIcon
        icon={faRotate}
        className="channel-loading animate-spin text-[4rem]"
      />
      <p className="font-bold text-[1.25rem] opacity-[0.5] text-center">
        Too Many Matches
      </p>
    </div>
  );
}
export function NoMatches() {
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-[0.5rem] bg-transparent ">
      <FontAwesomeIcon
        icon={faSkull}
        className="text-[4rem] result-icon opacity-1"
      />
      <p className="font-bold text-[1.25rem] opacity-[0.5] text-center">
        No Matches
      </p>
    </div>
  );
}

export function TypeToSearch() {
  return (
    <div className="w-[100%] h-[100%] relative flex flex-col justify-center items-center gap-[0.5rem] bg-transparent ">
      <div className="relative">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="text-[4rem] result-icon opacity-[1]"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-[2rem] result-icon opacity-1 absolute bottom-0 left-[-25px] drop-shadow animate-wave origin-[0%_0%]"
        />
      </div>
      <p className="font-bold text-[1.25rem] opacity-[0.5] text-center">
        Type to Search for New Contacts
      </p>
    </div>
  );
}

export function StartAddingItems(props) {
  return (
    <div className="w-[100%] h-[100%] relative flex flex-col justify-center items-center gap-[0.5rem] bg-transparent ">
      <p className="result-icon text-[4rem] animate-point">&#92418;</p>
      <p className="text-[1.25rem] opacity-[0.5] text-center italic mb-[50%]">
        Start Adding New {props.type}
      </p>
    </div>
  );
}
