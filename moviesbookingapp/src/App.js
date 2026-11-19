import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import ViewMovies from './Components/ViewMovies/ViewMovies';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Book from './Components/Book/Book';
import Payment from './Components/Payment/Payment';
import SignUp from './Components/SignUp/SignUp';
import Bookings from './Components/Bookings';






export const movieContext=createContext();
function App() {
  const [isAuthenticated,updateAuthentication]= useState(false);
   
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='view' element={<SignUp authenticationStatus={isAuthenticated} authenticationSetter={updateAuthentication}><ViewMovies/></SignUp>}/>
         <Route path='book/:search' element={<SignUp authenticationStatus={isAuthenticated} authenticationSetter={updateAuthentication}><Book/></SignUp>} />
        
         <Route path='payment/:movieName' element={<SignUp authenticationStatus={isAuthenticated} authenticationSetter={updateAuthentication}><Payment/></SignUp>}/>
        
        <Route path='bookings' element={<SignUp authenticationStatus={isAuthenticated} authenticationSetter={updateAuthentication}><Bookings/></SignUp>}/>
      </Routes>

     
       
    </div>
  );
}

export default App;
