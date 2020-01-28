import React from 'react';
import defaultMoviePoster from '../Assets/defaultMoviePoster.jpg'

const defaultMoviePoster = { defaultMoviePoster }

const Movie = ({ movie }) => {
    const poster = movie.poster === "N/A" ? defaultMoviePoster : movie.poster;

    return (
        <div className='movie'>
            <h2>{movie.title}</h2>
            <div>
                <img width='250' alt='{movie.title}' src={poster} />
            </div>
            <p>({movie.Year})</p>
        </div>
    )
}