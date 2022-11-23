import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ApiContext } from '../context/apiContext';
import { urlApi } from '../api/Apicall';
import axios from 'axios';

export default function Login() {

  const navigate = useNavigate()
  const {accessData, setAccessData} = useContext(ApiContext);
  const {register, handleSubmit, reset} = useForm();

  const fetchSignIn = async (data) => {
  
    const res = await axios.post(`${urlApi}auth/sign_in`, {
      email: data.username, 
      password: data.password
    });

    await setAccessData({
        'access-token': res.headers.get('access-token'),
        client: res.headers.get('client'),
        expiry: res.headers.get('expiry'),
        uid: res.headers.get('uid')
    });

    if (res.headers.get('access-token') !== null) {
      navigate('./Home', {replace: true})
    }
  }

  return (
    <div className='flex flex-row h-[100%] items-stretch w-[100%] bg-gray-200'>
        <div className='w-[100%]'></div>
        
        <div className='flex items-center justify-center w-[80%] bg-gray-400 ml'>
          <form className='flex flex-col items-center justify-center gap-3' onSubmit={handleSubmit(data => {
            fetchSignIn(data)

            reset({
              username: '',
              password: ''
            })
            })}>
            <input {...register('username')} className='w-[250px] p-2.5 rounded-xl' placeholder='Username'></input>
            <input {...register('password')} type='password' className='w-[250px] p-2.5 rounded-xl' placeholder='Password'></input>
            <button type='submit' className='bg-gray-600 rounded-2xl w-[100px] h-[40px]'>Confirm</button>
          </form>
        </div>
    </div>
  )
}
