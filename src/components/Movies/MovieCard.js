import React from 'react';
import { URL_IMG, IMG_SIZE_SMALL, DEFAULT_POSTER } from "../const"

const MovieCard = (props) => {
    if (props.release_date === undefined) {
        return ""
    }
    return (
        <div className="movie">
            {
                props.image === null 
                ? <img className="movie__pic" src={DEFAULT_POSTER} alt="Movie Poster" /> 
                : <img className="movie__pic" src={`${URL_IMG+IMG_SIZE_SMALL+props.image}`} alt="Movie Poster" />
            }
            <div className="movie__overlay">
                {
                    props.voteAverage === 0
                    ? ""
                    : <div className="movie__rating">
                        <svg viewBox="0 0 36 36" className="circular-chart">                            
                            <path className="circle-bg"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle"
                            strokeDasharray="78, 100"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="21.5" className="percentage">{props.voteAverage}</text>
                        </svg>
                    </div>
                }
                <div className="movie__info">
                    <h3 className="movie__title">{props.title}</h3>
                    {
                        props.release_date === ""
                        ? ""
                        : <div className="movie__date">
                            <span>Release Date: {props.release_date.substring(0,4)}</span>                                                
                        </div>                    
                    }                    
                </div>
            </div>
        </div>
    )

}

export default MovieCard