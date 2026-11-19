import React, { createContext, useContext, useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';
import './Payment.css'
import axios from 'axios';
import Bookings from '../Bookings';

const bookingdataContext=createContext();

const Payment = () => {

const [movie,setMovie]=useState(null);

const {movieName}=useParams();
 
 const [inputFields, updateInputFields] = useState({uemail:'',unumber:'',uotp:'',upin:'',ucpin:''});
const [validationError, updateValidationError]=useState(null);
const [upin , updateUpin] =useState(null);

const [successStatus,updateSuccess]=useState(false);
const [failStatus,updateFailStatus]=useState(false);

const [loading,updateLoading]=useState(false);

useEffect(
    ()=>{
        fetching();
    },
    []
)

const fetching=async ()=>{
      let apikey=process.env.REACT_APP_MOVIE_API_KEY;
              const res=await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&t=${movieName}`);
              setMovie(res.data);
}

 const inputHandler=(e)=>{
    

   updateSuccess(false);
   updateFailStatus(false);
    const {name,value}=e.target;
    updateInputFields({
        ...inputFields,
        [name]:value
    });

    if(name==='unumber')
    {
        if(value.length<10 || value.length>10)
        {
            updateValidationError("Enter 10 digits only");
        }
        else{
            updateValidationError(null);
        }
    }

    if(name==='uotp')
    {
        if(value!=='8989')
        {
            updateValidationError('Invalid OTP!');
        }
        else{
            updateValidationError(null);
        }
    }

    if(name==='upin')
    {
        updateUpin(value);
    }

    if(name==='ucpin')
    {
        if(upin!==value)
        {
            updateValidationError("Pin didn't match");
            
        }
        else{
            updateValidationError(null);
        }
    }
 }

 const submitHandler=(e)=>{
    updateFailStatus(false);
    updateSuccess(false);
    e.preventDefault();
   if(inputFields.unumber.length!==10 || inputFields.ucpin!==upin || inputFields.uotp!=8989){
    updateFailStatus(true);
    updateSuccess(false);
    updateLoading(false);
   }
   else
   {
    updateFailStatus(false);
   
    updateLoading(true);
    setTimeout(()=>{
updateLoading(false);
updateSuccess(true);
    },2000)
   }
   
 }
  return (
    movie?
    (
    <div className='payment-div'>
      <div className='form-poster'>
        <div  className='process-div'>
            <img src={movie.Poster} height='280px' width='100%'/>
            <p><strong>{movie.Title}</strong></p>
        </div>

         <form className='payment-form' onSubmit={(e)=>submitHandler(e)}>
           <div>
                <label>Email:</label>
                <input type='email' value={inputFields.uemail} onChange={(e)=>inputHandler(e)} name='uemail' required/>
            </div> 

            <div>
                <label>Mobile Number:</label>
                <input type='number' value={inputFields.unumber} onChange={(e)=>inputHandler(e)} name='unumber' required/>
            </div>

            <div>
                <label>OTP:</label>
                <input type='number' value={inputFields.uotp} onChange={(e)=>inputHandler(e)} name='uotp' required/>
            </div>

            <div>
                <label>Card Pin:</label>
                <input type='password' value={inputFields.upin} onChange={(e)=>inputHandler(e)} name='upin' required/>
            </div>

            <div>
                <label>Confirm Pin:</label>
                <input type='password' value={inputFields.ucpin} onChange={(e)=>inputHandler(e)} name='ucpin' required/>
            </div>

            <button type='submit'>Make Payment</button>
        </form>
        </div>
        <div className='success-div'>
            {validationError}
            {failStatus&&<p className='warning'>Failed to proceed with transaction!</p>}
            {loading&&<p>Proceeding to pay!</p>}
            {loading&&<p>Loading...</p>} 
            {successStatus&&<p className='success'>Seats booked successfully</p>}
        </div>
        
        <button className='cancel-movie'><a href='/'>Cancel Booking</a></button>
        
        <bookingdataContext.Provider value={{
            
        }}>
            <Bookings/>
        </bookingdataContext.Provider>
    </div>
    )
    :
    (
        <h3>Feteching details...</h3>
    )
  )
}

export default Payment


