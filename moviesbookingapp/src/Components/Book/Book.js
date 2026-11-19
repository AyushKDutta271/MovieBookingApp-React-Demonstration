import React, { useEffect, useReducer, useState } from 'react'

import './Book.css'
import Payment from '../Payment/Payment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const initialState={
   seatIds:[],
   noOfSeatsSelected:0,
   availableSeats:24
}

const seatsHandler=(state,action)=>{
    const {seatId,isSelected}=action;

     if( action.time!=null || action.day!=null)
      {
            return {
                  seatIds:[],
                  noOfSeatsSelected:0,
                  availableSeats:24
            }
      }
    
     let prevSeats=state.seatIds.filter(seat=>seat.seatId!==seatId);
     let updateSeatsArray=[
      ...prevSeats,
      action
     ]
     if(isSelected)
     {
            return{
                  seatIds:updateSeatsArray,
                  noOfSeatsSelected:parseInt(state.noOfSeatsSelected)+1,
                  availableSeats:parseInt(state.availableSeats)-1
                  }
      }
      else{
            return{
                  seatIds:updateSeatsArray,
                  noOfSeatsSelected:parseInt(state.noOfSeatsSelected)-1,
                  availableSeats:parseInt(state.availableSeats)+1
            }
      }
      
}

const Book = () => {
      const {search}=useParams();
   const [movie,setMovie]=useState(null);
   
   useEffect(()=>{
            fetching();
            
   },
[]) 
   const [houseFullStatus,updateHouseFullStatus] = useState(false);
   
const fetching=async ()=>{
      let apikey=process.env.REACT_APP_MOVIE_API_KEY;
              const res=await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&t=${search}`);
              setMovie(res.data);
}
   const [seats,updateSeats]=useReducer(seatsHandler,initialState);

   const navigating =useNavigate();
  
   

//    if(isAuthenticated)
//    {
//       navigating("/book");
//    }

   const selectSeatsHandler=(e)=>{

     
      let gotObj= seats.seatIds.find(seat=>seat.seatId===e.target.id);
       if(seats.noOfSeatsSelected===23)
      {
            updateHouseFullStatus(true);
           
      }
      else{
            updateHouseFullStatus(false);
           
      }
      if(gotObj)
      {     
            if(gotObj.isSelected)
            {
                let seatDiv=  document.getElementById(`${e.target.id}`);
                seatDiv.style.height='60px';
                seatDiv.style.width='75px';
                seatDiv.style.alignSelf='none';
                seatDiv.style.boxShadow='3px 2px 2px 2px'
            
                  updateSeats(
                        {
                              ...gotObj,
                              isSelected:false
                        }
                  )
            }
            else{
                let seatDiv=  document.getElementById(`${e.target.id}`);
                seatDiv.style.height='45px';
                seatDiv.style.width='50px';
                seatDiv.style.alignSelf='center';
                seatDiv.style.boxShadow='1px 1px 1px 1px'
                  updateSeats(
                        {
                              ...gotObj,
                              isSelected:true
                        }
                  )
            }
      }
      else{
             let seatDiv=  document.getElementById(`${e.target.id}`);
                seatDiv.style.height='45px';
                seatDiv.style.width='50px';
                seatDiv.style.alignSelf='center';
                seatDiv.style.boxShadow='1px 1px 1px 1px'
            updateSeats(
                  {
                        seatId:e.target.id,
                        isSelected:true
                  }
            )
      }
   }
    
  let currentUpdatedSeats=seats.seatIds.filter(seatObj=>seatObj.isSelected);
  const displaySeats=currentUpdatedSeats.map(seat=><div style={{marginRight:'10px'}}>{seat.seatId}</div>)
  
  const [day, updateDay] = useState(null);
  const [time, updateTime] = useState(null);

  function updateDayAndSeats(value)
  {
      updateDay(value);
       updateSeats({day:day, time:time});
       updateHouseFullStatus(false);
  }
 
  function updateTimeAndSeats(value)
  {
      updateTime(value);
       updateSeats({day:day, time:time});
       updateHouseFullStatus(false);
  }
// let movieTitle=movie.Title;

 return (
    <div className='book-div'>
      {
            movie?(
              <div>
                  <div className='Movie-Details'>
                        <h4>Selected Movie:</h4>
                        <img src={movie.Poster} height='280px' width='300px'/>
                        <h3 className='movie-title'>{movie.Title}</h3>
                  </div>

                  <h3 className='booking-headline'>Book Seats:</h3>
        
                  <div className='seats-div' >  
                    <div className='first-row'>
                              <button className='seat' id='s1' value='s1' onClick={(e)=>selectSeatsHandler(e)}>S1</button>
                              <button className='seat' id='s2' value='s2' onClick={(e)=>selectSeatsHandler(e)}>S2</button>
                              <button className='seat' id='s3' value='s3' onClick={(e)=>selectSeatsHandler(e)}>S3</button>
                    </div>
                    <div className='middle-row'>
                              <button className='seat' id='s4' value='s4' onClick={(e)=>selectSeatsHandler(e)}>S4</button>
                              <button className='seat' id='s5' value='s5' onClick={(e)=>selectSeatsHandler(e)}>S5</button>
                              <button className='seat' id='s6' value='s6' onClick={(e)=>selectSeatsHandler(e)}>S6</button>
                              <button className='seat' id='s7' value='s7' onClick={(e)=>selectSeatsHandler(e)}>S7</button>
                              <button className='seat' id='s8' value='s8' onClick={(e)=>selectSeatsHandler(e)}>S8</button>
                              <button className='seat' id='s9' value='s9' onClick={(e)=>selectSeatsHandler(e)}>S9</button>
                    </div>
                     <div className='middle-row'>
                              <button className='seat' id='s10' value='s10' onClick={(e)=>selectSeatsHandler(e)}>S10</button>
                              <button className='seat' id='s11' value='s11' onClick={(e)=>selectSeatsHandler(e)}>S11</button>
                              <button className='seat' id='s12' value='s12' onClick={(e)=>selectSeatsHandler(e)}>S12</button>
                              <button className='seat' id='s13' value='s13' onClick={(e)=>selectSeatsHandler(e)}>S13</button>
                              <button className='seat' id='s14' value='s14' onClick={(e)=>selectSeatsHandler(e)}>S14</button>
                              <button className='seat' id='s15' value='s15' onClick={(e)=>selectSeatsHandler(e)}>S15</button>
                    </div>
                     <div className='middle-row'>
                              <button className='seat' id='s16' value='s16' onClick={(e)=>selectSeatsHandler(e)}>S16</button>
                              <button className='seat' id='s17' value='s17' onClick={(e)=>selectSeatsHandler(e)}>S17</button>
                              <button className='seat' id='s18' value='s18' onClick={(e)=>selectSeatsHandler(e)}>S18</button>
                              <button className='seat' id='s19' value='s19' onClick={(e)=>selectSeatsHandler(e)}>S19</button>
                              <button className='seat' id='s20' value='s20' onClick={(e)=>selectSeatsHandler(e)}>S20</button>
                              <button className='seat' id='s21' value='s21' onClick={(e)=>selectSeatsHandler(e)}>S21</button>
                    </div>
                     <div className='last-row'>
                              <button className='seat' id='s22' value='s22' onClick={(e)=>selectSeatsHandler(e)}>S22</button>
                              <button className='seat' id='s23' value='s23' onClick={(e)=>selectSeatsHandler(e)}>S23</button>
                              <button className='seat' id='s24' value='s24' onClick={(e)=>selectSeatsHandler(e)}>S24</button>
                    </div>
                  </div>
                  <div className='days-div'>
                        <h3 className='days-headline'>Select Days:</h3>
                    <div className='days-list'>
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Sunday'}>Sun</button>
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Monday'}>Mon</button> 
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Tuesday'}>Tue</button> 
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Wednesday'}>Wed</button> 
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Thursday'}>Thur</button> 
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Friday'}>Fri</button> 
                        <button onClick={(e)=>updateDayAndSeats(e.target.value)} value={'Saturday'}>Sat</button>     
                    </div>
                  </div>
                  <div className='times-div'>
                        <h3 className='times-heading'>Select Timeslot:</h3>
                        <div className='times-list'>
                              <button onClick={(e)=>updateTimeAndSeats(e.target.value)} value={'11am to 1.30pm'}>11am - 1.30pm</button>
                              <button onClick={(e)=>updateTimeAndSeats(e.target.value)} value={'2pm - 4.30pm'}>2pm - 4.30pm</button>
                              <button onClick={(e)=>updateTimeAndSeats(e.target.value)} value={'5pm - 7.30pm'}>5pm - 7.30pm</button>
                              <button onClick={(e)=>updateTimeAndSeats(e.target.value)} value={'9pm - 11.30pm'}>9pm - 11.30pm</button>
                        </div>
                  </div>
                  <div className='display-daytime'>
                        <h3 className='display-daytime-heading'>Selected Day and Time:</h3>
                        {day} {time}
                  </div>
                  <div className='available-seats-div'>
                        { day&&time&& <p><b>Seats Selected: </b>{seats.noOfSeatsSelected}, <b>Available Seats: </b>{seats.availableSeats}</p>}
                  </div> 
                  <p className='display-seats-div' style={{display:'flex', justifyContent:'space-between', width:'280px',margin:'0 auto'}}>Your Seats:
                  {displaySeats&&displaySeats}
                  </p>
                  <div>
                  {houseFullStatus&&<p className='housefull-seats-div'>It's housefull, can't book seats anymore!
                        <br/>
                        Try different time slot or day!
                        </p>}
                  {day&&time&&seats.noOfSeatsSelected&&
                        <button className='payment-btn' onClick={()=>navigating(`/payment/${movie.Title}`)}>Make Payment</button> 
            
                  }
                  </div>
                  <button className='cancel-movie'><a href='/'>Cancel Booking</a></button>  
            </div>
            
            )
            :
            (
                  <h3>Fetching...</h3>
            )
      }
         
    </div>
 )
}

export default Book