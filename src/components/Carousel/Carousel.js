import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'

const sortRandom = () => {
    const rand = Math.floor(Math.random() * 2)
    return rand === 0 ? -1 : 1;
};

const sortPopularity = (o1, o2) => {
    if (o1.popularity < o2.popularity) return 1;
    if (o1.popularity > o2.popularity) return -1;
    return 0;
};

const copy = (item) => {
    let result = null;
    if(!item) return result;
    if(Array.isArray(item)){
      result = [];
      item.forEach(element=>{
        result.push(copy(element));
      });
    }
    else if(item instanceof Object && !(item instanceof Function)){
      result = {};
      for(let key in item){
        if(key){
          result[key] = copy(item[key]);
        }
      }
    }
    return result || item;
  }


export default function movieCarousel({ movies }) {

    const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

    let carouselMovies = copy(movies);
    carouselMovies = movies.sort(sortRandom);
    carouselMovies = movies.slice(0,5);
    carouselMovies = movies.sort(sortPopularity);

    let carouselItems = [];

    for (let movie of carouselMovies) {

        let carouselItem =  <Carousel.Item key={movie.id}>
                                <img
                                className="d-block w-100"
                                src={TMDBImgUrl + movie.backdrop_path}
                                alt={movie.title}
                                />
                                <h2>{movie.title}</h2>
                            </Carousel.Item>

        carouselItems.push(carouselItem)
    }


    return (
        <Carousel>
            {carouselItems}
        </Carousel>

    )

}

