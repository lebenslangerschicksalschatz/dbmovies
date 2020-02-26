import React from "react";
import { URL_BACKDROP, DEFAULT_BACKDROP } from "../const";
import {Link} from "react-router-dom";

const Top250List = (props) => {

    const movies = props.movies;
    console.log(movies);

    return(
        <div className="topRated__list">
            {
            movies.map((movie) => {
                return (
                    <div key={movie.id} className="topRated-item">
                        {
                            movie.backdrop_path === null 
                            ?<img src={DEFAULT_BACKDROP} alt="Background"/> 
                            :<img src={URL_BACKDROP+movie.backdrop_path} alt="Background"/> 
                        }
                        <h3 className="topRated-item__title">{movie.title}</h3>
                        {
                            movie.vote_average === 0
                            ? null
                            : <div className="movie__rating movie__rating_topRated">
                                <svg viewBox="0 0 36 36" className="circular-chart circular-chart_topRated">                            
                                    <path className="circle-bg circle-bg_topRated"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path className="circle circle_topRated"
                                    strokeDasharray="78, 100"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="21.5" className="percentage percentage_topRated">{movie.vote_average}</text>
                                </svg>
                            </div>
                        }
                        <Link className="topRated-item__detail" to={`/movie/${movie.id}`}>
                            <span>Details</span>
                        </Link>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Top250List