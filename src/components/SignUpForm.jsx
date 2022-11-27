import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchRegister } from '../helper/Apicall';

export default function SignUpForm() {

    const navigate = useNavigate()
    const { 
        register, 
        handleSubmit, 
        reset 
    } = useForm();

    const submitForm = useCallback( async (data) => {
        try{
            const body = {
                email: data.username,
                password: data.password
            }
            // await fetchRegister(body)
            
            reset({
                username: "",
                password: "",
                confirmpassword: ""
            });

            navigate("/Slackapp/Login", { replace: true })
        } catch(e){
            // shadow errorhandling
            console.log(e)
        }
    },[])

    return (
        <form className="flex flex-col items-center justify-center gap-3"
            onSubmit={handleSubmit(submitForm)}
        >
            <span className="text-2xl font-extrabold">Sign Up</span>
            <span className="self-start font-bold">Username</span>
            <input
                {...register("username")}
                className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
                placeholder="Username"
            ></input>
            <span className="self-start font-bold">Password</span>
            <input
                {...register("password")}
                type="password"
                className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
                placeholder="Password"
            ></input>
            <span className="self-start font-bold">Confirm Password</span>
            <input
                {...register("confirmpassword")}
                type="password"
                className="w-[250px] p-2.5 rounded-xl border-4 border-zinc-900/80 hover:ring-orange-300 ring-2 shadow-slate-500 shadow-md"
                placeholder="Password"
            ></input>
            <button
                type="submit"
                className="bg-zinc-800 rounded-2xl w-[100px] h-[40px] hover:bg-zinc-800/60 hover:ring-orange-300 ring-2 border-zinc-400/60 border-2 shadow-md text-slate-300"
            >
                Submit
            </button>
        </form>
    )
}
