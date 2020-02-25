import React from 'react';
import {Link} from "react-router-dom";
import MovieCard from './MovieCard'

const MovieList = (props) => {
    // if
        
    return (
        <div className="movies__list">
            {                                
                props.movies.map((movie) => {                     
                    return (
                        <Link key={movie.id} to={`/movie/${movie.id}`}>                                                        
                            <MovieCard                                 
                                key={movie.id} 
                                image={movie.poster_path}
                                title={movie.title}
                                voteAverage={movie.vote_average} 
                                release_date={movie.release_date}
                                movies={props.movies}
                            />  
                        </Link>                      
                    )                  
                })
            }
        </div>
    )
}

export default MovieList