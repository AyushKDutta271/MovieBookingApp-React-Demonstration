
import { useForm } from "react-hook-form";

import './SignUp.css';
import { Outlet, useNavigate } from "react-router-dom";


const SignUp = (props) => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors ,isSubmitting},
  } = useForm()

const navigating =useNavigate();


  const delay=(t)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(resolve,t*1000);
    })
  }
  const submitHandler = async (data) => {
    if(data.ucpassword!==data.upassword)
    {
      setError('InvalidPassword',{ message: "password didn't match!"});
      return;
    }
    await delay(3);
    console.log(data);
    props.authenticationSetter(true);
  }
  return (
    <>
      {props.authenticationStatus?props.children:
      (
        <div className='signup-form'>
      <form onSubmit={handleSubmit(submitHandler)} align="center">
        <h1>User SignIn</h1>
       <div>
        <label>Name:</label>
        <input type='text' placeholder='enter full name' {...register('uname',{required:true,minLength:{value:3,message:"Please enter name atleast more than or equal to 3 characters"}})}/>
       </div>
      {errors.uname && errors.uname.message}
      <br/>
       <div>
        <label>Email:</label>
        <input type='email' placeholder='abc@gmail.com' {...register('uemail',{required:true,minLength:{value:7,message:"Please enter name atleast more than or equal to 7 characters"}})}/>
       </div>
      {errors.uemail && errors.uemail.message}
      <br/>
       <div>
        <label>Phone:</label>
        <input type='number' placeholder='mobile number' {...register('uphone',{required:true, minLength:{value:10, message:"Please enter phone number of exactly 10 digits"},maxLength:{value:10, message:"Please ennter phone number of exactly 10 digits"}})}/>
       </div>
      {errors.uphone && errors.uphone.message}
      <br/>
       <div>
        <label>Create Password:</label>
        <input type='password' placeholder='type any combination' {...register('upassword',{required:true, minLength:{value:5, message:"Please nter password equal to greater than 5 characters"}})}/>
       </div>
      {errors.upassword && errors.upassword.message}
        {errors.InvalidPassword&& errors.InvalidPassword.message}
      <br/>
       <div>
        <label>Confirm Password:</label>
        <input type='password' placeholder='should match above' {...register('ucpassword',{required:true})}/>
       </div>
      {errors.ucpassword && errors.ucpassword.message}
      <br/>
       <div>
        <input type='submit' disabled={isSubmitting} value='submit'/>
       </div>
       {isSubmitting&&<p>Loading...</p>}
      </form>
      </div>
      )
    }
    </>
    
    
  )
}

export default SignUp