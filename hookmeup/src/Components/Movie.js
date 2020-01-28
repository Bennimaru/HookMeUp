import React from 'react';

const defaultMoviePoster = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQvfIGzBDJxU_i9-vePbx-aHwwIYd20Qe9a5p491AxSAnl7K4n&s"

const Movie = ({ movie }) => {

    const poster = movie.Poster === "N/A" ? defaultMoviePoster : movie.Poster;

    return (
        <div className='movie'>
            <h2>{movie.Title}</h2>
            <div>
                <img width='250' alt={`${movie.Title}`} src={poster} />
            </div>
            <p>({movie.Year})</p>
        </div>
    )
}

export default Movie