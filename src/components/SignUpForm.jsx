import React, { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../helper/Apicall";

export default function SignUpForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [ errorMessage, setErrorMessage] = useState([])
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const submitForm = useCallback(async (data) => {
    setConfirmPassword('')
    setErrorMessage([])
    try {
      const body = {
        email: data.username,
        password: data.password,
      };
      
      if (data.password === data.confirmpassword){
        await fetchRegister(body)
        reset({
          username: "",
          password: "",
          confirmpassword: "",
        });
  
        navigate("/Slackapp/Login", { replace: true });
      } else if (data.confirmpassword === ''){
        setConfirmPassword(`can't be blank`)
      } else{
        setConfirmPassword('password incorrect')
      }
      
    } catch (e) {
      setErrorMessage(e.response.data.errors)
    }
  }, []);

  return (
    <form
      className="flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit(submitForm)}
    >
      <span className="text-2xl font-extrabold">Sign Up</span>
      <div className="self-start">
        <span className="font-bold">Username</span>
        <span className="text-red-500 ml-5">{errorMessage.email}</span>
      </div>
      <input
        {...register("username")}
        className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
        placeholder="Username"
      ></input>
      
      <div className="self-start">
        <span className="self-start font-bold">Password</span>
        <span className="text-red-500 ml-5">{errorMessage.password}</span>
      </div>
      <input
        {...register("password")}
        type="password"
        className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
        placeholder="Password"
      ></input>
      
      <div className="self-start">
        <span className="self-start font-bold">Confirm Password</span>
        <span className="text-red-500 ml-5">{confirmPassword}</span>
      </div>
      <input
        {...register("confirmpassword")}
        type="password"
        className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
        placeholder="Password"
      ></input>
      <span className="cursor-pointer" onClick={() => navigate("/Slackapp/Login", { replace: true })}>Have an Account Already? Login Here</span>
      <button
        type="submit"
        className="bg-zinc-800 rounded-2xl w-[100px] h-[40px] hover:bg-zinc-800/60 hover:ring-orange-300 ring-2 border-zinc-400/60 border-2 shadow-md text-slate-300"
      >
        Submit
      </button>
    </form>
  );
}
