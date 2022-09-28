import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'


export default function movieCarousel({ movies }) {

    console.log(movies)

    const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

    const carouselImgOne = movies[5].backdrop_path;
    const carouselImgTwo = movies[10].backdrop_path;
    const carouselImgThree = movies[15].backdrop_path;

    return (


        <Carousel>

            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://collider.com/wp-content/uploads/dark-knight-rises-movie-poster-banner-batman.jpg"
                alt="First slide"
                />
            </Carousel.Item>


            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://collider.com/wp-content/uploads/dark-knight-rises-movie-poster-banner-batman.jpg"
                alt="Second slide"
                />
            </Carousel.Item>


            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://collider.com/wp-content/uploads/dark-knight-rises-movie-poster-banner-batman.jpg"
                alt="Third slide"
                />
            </Carousel.Item>


        </Carousel>
        
    )
}