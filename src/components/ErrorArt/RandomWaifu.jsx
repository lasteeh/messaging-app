import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react";

export default function RandomWaifu() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  // const [pending, startTransition] = useTransition();

  const fetchWaifu = async () => {
    setClicked(true);
    setIsLoading(true);
    // startTransition(async () => {
    const res = await fetch("https://api.waifu.pics/sfw/waifu");
    const resData = await res.json();
    setUrl(resData.url);
    // });
    setIsLoading(false);
  };

  return (
    <div
      className="w-[100%] h-[100%] flex flex-col justify-start items-center p-2 cursor-pointer"
      onClick={fetchWaifu}
    >
      <p className="italic mb-4 opacity-[0.5]">Click for Random Waifu</p>
      {clicked && isLoading && (
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-[2rem] animate-spin result-icon mt-[2rem]"
        />
      )}
      {!isLoading && (
        <img
          src={url}
          alt="Random Waifu"
          className="animate-fadeIn w-[100] object-cover rounded-[0.5rem] overflow-hidden shadow-lg"
          // loading="lazy"
        />
      )}
    </div>
  );
}
