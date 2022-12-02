const dateTimeToday = new Date().getTime();

export const calculateTime = (timeSent) => {
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

export const userFilterList = (val, allusers) => {
  return allusers.filter((user) => {
    const Name = user.label.toLowerCase();
    const Value = user.value.toString();
    const trimmedSearchValue = val.replace(/\s+/g, "").toString().toLowerCase();
    return (
      Value.includes(trimmedSearchValue) || Name.includes(trimmedSearchValue)
    );
  });
};
export const channelFilterList = (val, allchannels) => {
  return allchannels.filter((user) => {
    const Name = user.name.toLowerCase();
    const Value = user.dataId.toString();
    const trimmedSearchValue = val.toString().toLowerCase();
    return (
      Value.includes(trimmedSearchValue) || Name.includes(trimmedSearchValue)
    );
  });
};

export const randomGreeting = () => {
  const greetList = [
    "Hey gorgeous!",
    "Who we chattin' today?",
    "Wasssssup?",
    "Uy gumagana na erps!",
    "Hi Miss Kate!",
    "Kamusta na?",
    "Kamusta ka?",
    "Message someone you love today...",
    "Whatever you are, be a good one...",
    "Be yourself; everyone else is already taken.",
    "Act as if what you do makes a difference.",
    "The only real mistake is the one from which we learn nothing.",
    "Positive anything is better than negative nothing.",
    "Limit your 'always' and your 'nevers'.",
  ];
  const randomNumber = Math.floor(Math.random() * greetList.length);

  return greetList[randomNumber];
};
