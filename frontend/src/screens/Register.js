import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../port';
import axios from 'axios';
function Register() {
  
  let {register,handleSubmit}=useForm();
  let [err,setErr]=useState('');
  let navigate=useNavigate()
  async function handleFormSubmit(userobj){
    const res= await axios.post(`${BASE_URL}/user-api/register`,userobj)
    console.log(res)
    if(res.data.message==='User Registered'){
      navigate('/login');
    }
    else{
      setErr(res.data.message);
    }
 }
  return (
    <div className='mt-5 p-5 bg-light'>
      <form className='w-50 mx-auto p-5' onSubmit={handleSubmit(handleFormSubmit)}>
        <input type='text' className='form-control mb-3' placeholder='Username' {...register("username")}></input>
        <input type='password' className='form-control mb-3' placeholder='password' {...register("password")}></input>
        <input type='email' className='form-control mb-3' placeholder='email id' {...register("email")}></input>
        <input type='number' className='form-control mb-3' placeholder='mobile no' {...register("mobileNo")} />
        <button type='submit' className='btn btn-success d-flex justify-content-end'>Register</button>
      </form>
    </div>
  )
}

export default Register
