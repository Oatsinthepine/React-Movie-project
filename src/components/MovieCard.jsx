import React from 'react';
import {useState} from "react";


// This component is called 'presentational component', as its purpose is to display the movie details
const MovieCard = (props) => {
    // console.log(props)
    // here i only keep movieAvgVote here, as this MovieCard component is only used to display the movie details
    // no need to include setMovieAvgVote as we are not updating the vote average in this component
    const [movieAvgVote] = useState(props.movie.vote_average);
    let vote
    if (movieAvgVote) {
        vote = (
            <p>{movieAvgVote.toFixed(1)}</p>
        )
    } else {
        vote = (
            <p>N/A</p>
        )
    }

    return (
        <div className="movie-card">
            {/*<p className="text-white">{props.movie.title}</p>*/}
            <img src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}` : '/no-poster.png'} alt={props.movie.title} onClick={()=> alert("clicked")}/>
            <div className="mt-4">
                <h3>{props.movie.title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src= "star.svg" alt = "Star Icon" />
                        {vote}
                        <br/>
                        <p className="lang">{props.movie.original_language}</p>
                        <br/>
                        <p className="year">{props.movie.release_date.split('-')[0]}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default MovieCard;