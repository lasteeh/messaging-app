import React, { useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ApiContext } from "../context/apiContext";
import { fetchSignIn } from "../helper/Apicall";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState([]);
  const { setAccessData, setChat, setChatLoading } = useContext(ApiContext);
  const { register, handleSubmit, reset } = useForm();

  const handleSignIn = useCallback(async (data) => {
    setErrorMessage([]);
    try {
      let checkData = await fetchSignIn(data);
      setAccessData(checkData);
      navigate("/Slackapp/Home", { replace: true });
    } catch (e) {
      // shadow errorhandling
      console.log(e);
      setErrorMessage(e.response.data.errors[0]);
    }
  }, []);

  return (
    <form
      className="flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit((data) => {
        handleSignIn(data);

        reset({
          username: "",
          password: "",
        });

        setChat("");
        setChatLoading(false);
      })}
    >
      <span className="text-2xl font-extrabold drop-shadow-md text-white">
        Login
      </span>
      <span className="self-start font-bold drop-shadow-md text-white">
        Username
      </span>
      <input
        {...register("username")}
        className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
        placeholder="Username"
      ></input>
      <span className="self-start font-bold drop-shadow-md text-white">
        Password
      </span>
      <input
        {...register("password")}
        type="password"
        className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
        placeholder="Password"
      ></input>
      <span className="text-red-500 dop-shadow-md font-bold">
        {errorMessage}
      </span>
      <span
        className="cursor-pointer drop-shadow-md text-white"
        onClick={() => navigate("/Slackapp/Signup", { replace: true })}
      >
        No Account? Sign up
      </span>
      <button
        type="submit"
        className="bg-zinc-800 rounded-2xl w-[100px] h-[40px] hover:bg-zinc-800/60 hover:ring-orange-300 ring-2 border-zinc-400/60 border-2 shadow-md text-slate-300"
      >
        Confirm
      </button>
    </form>
  );
}
