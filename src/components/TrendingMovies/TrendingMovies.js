import React, { useState, useEffect } from 'react';
import MovieService from '../../utils/movieService'
import MovieSlider from '../MovieSlider/MovieSlider'

export default function TrendingMovies() {

    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(() => {

        const fetchTrendingMovies = async () => {
            const movies = await MovieService.fetchTrendingMovies();
            setTrendingMovies(movies.results);
        }
        
        fetchTrendingMovies();

    }, [])

    //=========================================================================================

    // const trendingMoviePosterImages = trendingMovies.results.map((movie, idx) => {
    //     return <img src='' />
    // })

   
    return(
        <div>
            <MovieSlider movies={trendingMovies}/>
        </div>
    )
}