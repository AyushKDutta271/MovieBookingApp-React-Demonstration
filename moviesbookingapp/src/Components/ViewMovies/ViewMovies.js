import React, {  useEffect, useState } from 'react'
import './ViewMovies.css'
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../ViewMovies/Assets/Images/img1.webp'
import img2 from '../ViewMovies/Assets/Images/img2.jpg'
import img3 from '../ViewMovies/Assets/Images/img3.avif'
import img4 from '../ViewMovies/Assets/Images/img4.jpg'
import axios from 'axios';

const ViewMovies = () => {
  let [idx, updateIdx] =useState(0);
  useEffect(
    ()=>{
     let id= setInterval(rightSliding,2000);
      return ()=>{
        clearInterval(id);
      }
    }
    ,
    [idx]
  )

  const [search, setSearch] = useState("");
  const [movieData,updateMovieData] = useState(null);
  
   const [error,updateError] =useState(null);
   const [loading,updateLoading]=useState(false);
      
   const [isSelected, updateSelection] =useState(false);
 
   const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(search)
    {
      fetching(search);
      setSearch('');
      
    }

  }

  
       const fetching=async (movieName)=>{ 
        updateLoading(true);
        try{
            let apikey=process.env.REACT_APP_MOVIE_API_KEY;
              const res=await axios.get(`https://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&t=${movieName}`);
             updateMovieData(res.data);
            }
          catch(error)
          {
          console.log('Failed to fetch');
          updateError(error);
          }
          finally{
            updateLoading(false);
          }
             
      }

  let movieArr=[
    <img src={img1} height='100%' width='100%' style={{backgroundSize:'100%',objectFit:'100%'}}/>,
    <img src={img2} height='100%' width='100%'  style={{backgroundSize:'100%',objectFit:'cover'}}/>,
    <img src={img3} height='100%' width='100%'  style={{backgroundSize:'100%',objectFit:'cover'}}/>,
    <img src={img4} height='100%' width='100%'  style={{backgroundSize:'100%',objectFit:'cover'}}/>
  ]
 
   



 
  function leftSliding()
  {
    if(idx===0)
    {
      updateIdx(movieArr.length-1);
    }
    else
    {
    updateIdx(idx=>idx-1);
    }
  }

  function rightSliding()
  {
   updateIdx(prevIdx=>{
    if(prevIdx===movieArr.length-1)
      return 0;
    else
      return prevIdx+1;
   })
  }
  
  return (
    <div className='view-div'>
      <div>
      <form onSubmit={handleSubmit}>
        <div>
        <label className='search-box'>Search Movie:</label>
        <input placeholder='type movie name' type='text' value={search} onChange={(e)=>setSearch(e.target.value)}/><br/>
        </div>
        <button type='submit'>Search</button>
      </form>
      </div>


      {loading&&<p className='loading-para'>Loading...</p>}
      {error&&<p className='error-para'>{error}</p>}
      <h4 style={{color:'floralwhite'}}>Top trending movies now...</h4>
      <div className='movie-display'>
        {movieArr[idx]}
      </div>
      {
        movieData&&movieData.Title
        &&
        <p className='movieinfo-para'>
        <ul>
          <li><span>Movie-Title:</span>{movieData.Title}</li> 
          <li> <img src={movieData.Poster} height='100%' width="100%" alt='movie-pic'/></li>
          <li><span>Directed By:</span> {movieData.Director}</li>
          <li><span>Casts:</span>  {movieData.Actors}</li>
          <li><span>Imdb-Ratings:</span> {movieData.imdbRating}</li> 
        </ul>

        <button onClick={()=>navigate(`/book/${movieData.Title}`)}>Book</button>
      </p>
      }
     
     
    </div>
  )
}

export default ViewMovies