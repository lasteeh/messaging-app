import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ApiContext } from "../context/apiContext";
import { fetchSignIn } from "../api/Apicall";

export default function Login() {
  const navigate = useNavigate();
  const {
    accessData,
    setAccessData,
    setChat,
    setChatLoading,
    setShowSideBarMembersList,
  } = useContext(ApiContext);
  const { register, handleSubmit, reset } = useForm();

  const handleSignIn = useCallback(async (data) => {
    try {
      let checkData = await fetchSignIn(data);
      setAccessData(checkData);
      navigate("./Home", { replace: true });
    } catch (e) {
      // shadow error handling
    }
  }, []);

  return (
    <div className="flex flex-row h-[100%] items-stretch w-[100%] bg-gray-200">
      <div className="w-[100%]"></div>

      <div className="flex items-center justify-center w-[80%] bg-zinc-500 ml">
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
            setShowSideBarMembersList(false);
          })}
        >
          <input
            {...register("username")}
            className="w-[250px] p-2.5 rounded-xl"
            placeholder="Username"
          ></input>
          <input
            {...register("password")}
            type="password"
            className="w-[250px] p-2.5 rounded-xl"
            placeholder="Password"
          ></input>
          <button
            type="submit"
            className="bg-zinc-600 rounded-2xl w-[100px] h-[40px] hover:bg-slate-700 border-slate-400/60 border-2 shadow-md"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
