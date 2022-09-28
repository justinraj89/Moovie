
const BASE_URL = '/api/movies/';




const fetchTrendingMovies = async () => {
    const url = `/api/movies/trending`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const trendingMovieData = await response.json()
            //console.log(trendingMovieData.results)
            return trendingMovieData;
        }
    }
    catch(err){
        console.log(err);
    }
}

//===================================================================================

const movieSearch = async (search) => {
    console.log('search hits front end')
    const url = `/api/movies/search?query=${search}`;
    try{
        const response = await fetch(url)
        if(response.ok){
            const movieQuery = await response.json()
            return movieQuery;
        }
    }
    catch(err){
        console.log(err)
    }
}

// const movieSearch = async () => {
//     const url = `/api/movies/search`;
//     try{
//         const response = await fetch(url)
//         if(response.ok){
//             const movieQuery = await response.json()
//             return movieQuery;
//         }
//     }
//     catch(err){
//         console.log(err)
//     }
// }

//===============================================================================


const createSession = async () => {
    const url = `/api/movies/session`;
    try{
        /*
        const response = await fetch(url,{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache,);
        })        
        */
        const response = await fetch(url)

        if(response.ok){
            const json = await response.json()
            localStorage.setItem('tmdb_session_id', json.guest_session_id);
        }
    }
    catch(err){
        console.log(err);
    }
}

//====================================================================================


const getMovieDetails = async (movieId) => {
    const url = `/api/movies/details?id=${movieId}`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const detailsData = await response.json()
            console.log(detailsData)
            // error handler goes here
            return detailsData;
        }
    }
    catch(err){
        console.log(err);
    }
}

//==============================================================================

const getMovieReviews = async (movieId) => {
    const url = `/api/movies/reviews?id=${movieId}`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const reviewsData = await response.json()
            // reviewsData can have multiple pages of data
            // reviewsData.results contains the review data
            console.log(reviewsData)
            return reviewsData;
        }
    }
    catch(err){
        console.log(err);
    }
}

//======================================================================================================

const rateMovie = async (movieId,rating) => {
    const guestSessionId = localStorage.getItem("tmdb_session_id")
    const url = `/api/movies/rating?id=${movieId}&rating=${rating}`;
    try{
        const data = { value: Number.parseInt(rating)}
        const response = await fetch(url,{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache,);
            body: JSON.stringify(data)
        })        

        if(response.ok){
            const json = await response.json()
            localStorage.setItem('tmdb_session_id', json.guest_session_id);
        }
    }
    catch(err){
        console.log(err);
    }
}

//=======================================================================================================

const deleteMovieRating = async (movieId) => {
    const url = `/api/movies/rating?id=${movieId}`;
    const guestSessionId = localStorage.getItem("tmdb_session_id")

    try{
        const data = { }
        const response = await fetch(url,{
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache,);
            body: JSON.stringify(data)
        })        

        if(response.ok){
            const json = await response.json()
            localStorage.setItem('tmdb_session_id', json.guest_session_id);
        }
    }
    catch(err){
        console.log(err);
    }
}


//===============================================================================================


// const getMoviePosters = async (movieId) => {
//     const url = `/api/movies/posters?id=${movieId}`;
//     try{
//         const response = await fetch(url);
//         if(response.ok){
//             const images = await response.json()
//             console.log(images.posters)
//             return images.posters;
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// //==============================================================================================


// const getMovieBackdrops = async (movieId) => {
//     const url = `/api/movies/backdrops?id=${movieId}`;
//     try{
//         const response = await fetch(url);
//         if(response.ok){
//             const images = await response.json()
//             console.log(images.backdrops)
//             return images.backdrops;
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// //==============================================================================================

//========================================================================================================


export default {
    createSession,
    fetchTrendingMovies,
    getMovieDetails,
    getMovieReviews,
    rateMovie,
    deleteMovieRating,
    movieSearch,
    // getMoviePosters,
    // getMovieBackdrops,
}