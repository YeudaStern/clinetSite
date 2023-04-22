import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router';
// import { API_URL, doApiMethod, KEY_TOKEN } from '../services/apiService';
import { API_URL, KEY_TOKEN, doApiMethod } from '../../services/apiServices';
import {toast} from "react-toastify"


export default function LogIn() {
  const { register,setValue, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    doApiPost(_bodyData);
  }

  const doApiPost = async(_bodyData) => {
    const url = API_URL+"/users/logIn"
    try{
      const data = await doApiMethod(url,"POST",_bodyData)
      console.log(data);
      if(data.token && data.role === "admin"){
        localStorage.setItem(KEY_TOKEN,data.token);
        // send to admin/users after login
        nav("/admin/projects")
        toast.success("You logged in")
      }
      else{
        toast.error("You must logged in with admin user")
      }
    } 
    catch(err){
      console.log(err);
      toast.error("User or password worng!");
      setValue("email","");
      setValue("password","");
      // alert("User or password worng");
    }
  }

  return (
    <div className='container'>
      <h2 className='text-center mt-3'>Login</h2>
      <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 mx-auto" >
        <label >email</label>
        <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} className="form-control" type="email" />
        {errors.email && <div className="text-danger">* Enter valid email</div>}
        <label>password</label>
        <input {...register("password", { required: true, minLength: 3 })} className="form-control" type="password" />
        {errors.password && <div className="text-danger">* Enter valid password</div>}
        <button className='btn btn-primary mt-2'>Submit</button>
      </form>
    </div>
  )
}