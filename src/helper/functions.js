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