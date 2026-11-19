import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css';
import img1 from './Assets/Images/img2.jpg';
import img2 from './Assets/Images/img3.jpg'
import img3 from './Assets/Images/img4.jpg'
import img4 from './Assets/Images/img5.jpg'
const Home = () => {
  const [idx,updateIdx]=useState(0);

  useEffect(()=>{
   let id= setInterval(slideRight,2000);
   return ()=>{
    clearInterval(id);
  }
  }
  ,[idx]);


  let movieArr=[
    <div style={{borderRadius:'30px'}}>
      <h3>Search any movie!</h3>
      <img src={img1} height='100%' width='100%' style={{borderRadius:'30px'}}/>
    </div>,
    <div style={{borderRadius:'30px'}}>
      <h3>Book your favourite seats!</h3>
       <img src={img2} height='100%' width='100%' style={{borderRadius:'30px'}}/>
    </div>,
    <div style={{borderRadius:'30px'}}>
      <h3>Select your comfortable day and time!</h3>
       <img src={img3} height='100%' width='100%' style={{borderRadius:'30px'}}/>
    </div>,
    <div style={{borderRadius:'30px'}}>
      <h3>Make an easy pay!</h3>
       <img src={img4} height='100%' width='100%' style={{borderRadius:'30px'}}/>
    </div>
  ]

  

  function slideRight(){
    updateIdx(prevIdx=>{
      if(prevIdx===movieArr.length-1)
        return 0;
      else
        return prevIdx+1;
    })
  }

  function slideLeft(){
    if(idx===0)
    {
      updateIdx(movieArr.length-1);
    }
    else{
    updateIdx(idx=>idx-1);
    }
  }
  return (
    <div className='home-div'>
      <nav className='top-nav'>
        <Link>Home</Link>
        <Link>ABout</Link>
        <Link>Contact</Link>
        <Link to='/signup'>Sign Up/Login</Link>
      </nav>
      <div className='middle-layer'>
        <nav className='side-nav'>
          <Link to='/view'>View Movies</Link>
          <Link to='/book'>Book</Link>
        </nav>
        <div className='slide-walkthrough'>
          {movieArr[idx]}
        </div>
      </div>
      
    </div>
  )
}

export default Home