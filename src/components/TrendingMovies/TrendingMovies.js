import React, { useState, useEffect } from 'react';



export default function Trending() {

    const [trendingMovies, setTrendingMovies] = useState([])

    const url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=d8794e2b80155359a43de192193b132f'

    const imageUrl = 'https://image.tmdb.org/t/p/w500'

   //=========================================================================================

    const fetchTrendingMovies = async () => {
        try{
            const response = await fetch(url);
            if(response.ok){
                const trendingMovieData = await response.json()
                console.log(trendingMovieData.results, '<--trending movie data')
                setTrendingMovies(trendingMovieData)
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //=========================================================================================


    useEffect(() => {
        fetchTrendingMovies()
        
    }, [])

    //=========================================================================================

    // const trendingMovieList = trendingMovies.results.map((movie, idx) => {
    //     return (
    //         <div className='trendingMovies' key={idx}>{movie.original_title}</div>
    //     )
    // })
    

    // const trendingMoviePosterImages = trendingMovies.results.map((movie, idx) => {
    //     return <img src='' />
    // })
    

    return(
        <div>
            {/* {trendingMovieList} */}
        </div>
    )
}