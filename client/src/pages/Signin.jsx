import React, { useState } from 'react'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import {Link , useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData,setFormData]= useState({});
  const {loading,error:errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData , [e.target.id]:e.target.value.trim()});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill all the required fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers :{'Content-Type' : 'application/json'},
        body:JSON.stringify(formData),
      });
      const data= await res.json();
      if(data.success === false){
        return dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='min-h-screeen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
      <Link to="/" className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Informatives </span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          Welcome to the wonderful blog website. Here you can write blogs and read other blogs by signing with your email and passwords or with Google.
        </p>
      </div>
  
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value = 'Your email' />
            <TextInput type='email'
            placeholder='abc@xyz.com'
            id = 'email' onChange={handleChange} />
          </div>
          <div>
            <Label value = 'Your password' />
            <TextInput type='password'
            placeholder='Password'
            id = 'password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
              loading ?(
                <>
                <Spinner size='sm/' />
                <span className='pl-3'>Loading...</span>
                </>
              ):'Sign In'
            }
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Don't have an account ?</span>
          <Link to ='/sign-up' className='text-blue-500'>
            Sign Up
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color="failure">
            {errorMessage}
            </Alert>
            )
        }
      </div>
      </div>
    </div>
  );
}
