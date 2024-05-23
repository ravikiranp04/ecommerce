import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import { userLoginThunk } from '../Redux/slices/userLoginSLice';
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { admin_uname } from '../port';
function Login() {
    let {register,handleSubmit,formState: { errors }}=useForm();
    const state=useSelector(state=>state.login)
    //console.log(state)
    const dispatch = useDispatch();
    const {currentuser, errorMessage, loginStatus } = useSelector(state => state.userLogin);
    const navigate = useNavigate();
  function handleFormSubmit(usercred){
        //console.log(usercred);
        let actionobj = userLoginThunk(usercred);
        dispatch(actionobj)
    }

  //to know someone is logged in
  useEffect(()=>{
    if(loginStatus===true){
        //console.log(currentuser);
        if(currentuser.username===admin_uname){
          navigate('/admin-profile')
        }
        else{
          navigate('/user-profile');
        }
    }
  },[loginStatus,currentuser.username,navigate])
  return (
    <div className='mt-5 p-5 bg-light'>
      <form className='w-50 mx-auto p-5' onSubmit={handleSubmit(handleFormSubmit)}> 
        <input type='text' className='form-control mb-3' placeholder='Username' {...register("username")}></input>
        <input type='password' className='form-control mb-3' placeholder='password' {...register("password")}></input>
        <button type='submit' className='btn btn-success d-flex justify-content-end'>Login</button>
      </form>
    </div>
  )
}

export default Login