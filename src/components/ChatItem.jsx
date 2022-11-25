import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ChatItem = (props) => {
  const dateTimeToday = new Date().getTime();
  //   const date = dateTime.toLocaleDateString();
  //   const time = dateTime.toLocaleTimeString();

  const [sentAt, setSentAt] = useState("");
  const [sameSender, setSameSender] = useState([])

  // console.log(dateTimeToday, "time today");
  //   console.log(
  //     new Date("2022-11-22T14:30:09.437Z").getTime(),
  //     "time boss kazel sent"
  //   );

  const calculateTime = (timeSent) => {
    const dateTime = new Date(timeSent);
    const timeDifference = dateTimeToday - dateTime;

    const minute = 60_000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 4 * week;
    const year = 4 * month;

    let result;

    if (timeDifference < minute) {
      return "a few seconds ago";
    }
    if (timeDifference < hour) {
      result = Math.round(timeDifference / minute);
      // return dateTime.toLocaleTimeString();
      return `${result} ${result > 1 ? "minutes" : "minute"} ago`;
    }
    if (timeDifference < day) {
      return dateTime.toLocaleTimeString();
    }
    if (timeDifference < week) {
      result = Math.round(timeDifference / day);
      return `${result} ${result > 1 ? "days" : "day"} ago`;
    }
    if (timeDifference < month || timeDifference < year) {
      return dateTime.toLocaleDateString();
    }
    if (timeDifference > year) {
      result = Math.round(timeDifference / year);
      return `${result} ${result > 1 ? "years" : "year"} ago`;
    } else {
      return "invalid time";
    }
  };

  //   console.log("time diff", timeDifference, props.sender.email, props.body);

  //   console.log("test", timeDifference < day ? "hours ago" : "days ago");
  //   console.log("test", timeDifference < week ? "days ago" : "weeks ago");

  return (
    <div className="flex flex-row flex-nowrap gap-[0.8rem] w-[min(650px,_100%)] min-h-[70px] mb-[1rem]">
      <div className="photo-holder aspect-square h-[min(28px,_100%)] text-white bg-black p-[0.4rem] rounded-[0.35rem] mb-[auto] grid place-items-center">
        <FontAwesomeIcon icon={faUser} className="w-[100%] h-[100%]" />
      </div>
      <div className="flex flex-col flex-nowrap gap-[0.25rem]">
        <span className="sender text-[0.75rem]">{props.sender.uid}</span>
        <div className="messages-holder relative w-[100%]">
          <p>{props.body}</p>
        </div>
        <span className="time-holder lowercase text-[0.75rem]">
          {calculateTime(props.time)}
        </span>
      </div>
    </div>
  );
};

export default ChatItem;
