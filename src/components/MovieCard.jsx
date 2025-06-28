import React from 'react';

const MovieCard = function MC(props) {
    // console.log(props)
    return (
        <div className="movie-card">
            {/*<p className="text-white">{props.movie.title}</p>*/}
            <img src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}` : '/no-image.png'} alt={props.movie.title} />
        </div>
    )
}
export default MovieCard;