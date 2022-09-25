
// https://developers.themoviedb.org/3/authentication/create-session
const apiUrlPrefix = "https://api.themoviedb.org/3";

//===============================================================================

const createSession = async () => {
    const url = `${apiUrlPrefix}/authentication/guest_session/new?api_key=d8794e2b80155359a43de192193b132f`;
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

//===================================================================================

const fetchTrendingMovies = async () => {
    const url = `${apiUrlPrefix}/trending/movie/week?api_key=d8794e2b80155359a43de192193b132f`
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

//====================================================================================


const getMovieDetails = async (movieId) => {
    const url = `${apiUrlPrefix}/movie/${movieId}?api_key=d8794e2b80155359a43de192193b132f`;
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

//===============================================================================================


const getMoviePosters = async (movieId) => {
    const url = `${apiUrlPrefix}/movie/${movieId}/images?api_key=d8794e2b80155359a43de192193b132f`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const images = await response.json()
            console.log(images.posters)
            return images.posters;
        }
    }
    catch(err){
        console.log(err);
    }
}

//==============================================================================================


const getMovieBackdrops = async (movieId) => {
    const url = `${apiUrlPrefix}/movie/${movieId}/images?api_key=d8794e2b80155359a43de192193b132f`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const images = await response.json()
            console.log(images.backdrops)
            return images.backdrops;
        }
    }
    catch(err){
        console.log(err);
    }
}

//==============================================================================================

const getMovieReviews = async (movieId) => {
    const url = `${apiUrlPrefix}/movie/${movieId}/reviews?api_key=d8794e2b80155359a43de192193b132f`;
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
    const url = `${apiUrlPrefix}/movie/${movieId}/rating?api_key=d8794e2b80155359a43de192193b132f&guest_session_id=${guestSessionId}`;
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

const deleteMovieRating = async (movieId,rating) => {
    const url = `${apiUrlPrefix}/movie/${movieId}/rating?api_key=d8794e2b80155359a43de192193b132f&guest_session_id=${guestSessionId}`;
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

//========================================================================================================


export default {
    createSession,
    fetchTrendingMovies,
    getMovieDetails,
    getMoviePosters,
    getMovieBackdrops,
    getMovieReviews,
    rateMovie,
    deleteMovieRating
}