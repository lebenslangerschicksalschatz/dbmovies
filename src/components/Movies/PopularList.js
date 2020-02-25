import React from "react";
import { URL_BACKDROP, DEFAULT_BACKDROP } from "../const"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

const PopularList = (props) => {   
    const movies = props.movies.slice(0, 10);
    console.log(movies);
    return (                                                     
        <div className="popular-list">
            <h3 className="popular-list__title">Trending</h3>
            <Slider
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                centerMode={true}
                variableWidth={true}
                infinite={true}
                arrows={false}
                autoplay={true}
                autoplaySpeed={3000}
                centerPadding={0}
            >
                {
                movies.map((movie) =>{
                    return (                        
                        <div key={movie.id} className="popular-item">
                            <h3 className="popular-item__title">{movie.title}</h3>
                            {
                            movie.backdrop_path === null 
                            ?<img src={DEFAULT_BACKDROP} alt="Background"/> 
                            :<img src={URL_BACKDROP+movie.backdrop_path} alt="Background"/> 
                            }
                            <Link className="popular-item__detail" to={`/movie/${movie.id}`}>
                                <span>Details</span>
                            </Link>
                            {
                            movie.vote_average === 0
                            ? null
                            : <div className="movie__rating movie__rating_popular">
                                <svg viewBox="0 0 36 36" className="circular-chart circular-chart_popular">                            
                                    <path className="circle-bg circle-bg_popular"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path className="circle circle_popular"
                                    strokeDasharray="78, 100"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="21.5" className="percentage percentage_popular">{movie.vote_average}</text>
                                </svg>
                            </div>
                            }
                        </div>
                    )
                })
                }
            </Slider>
        </div> 
    )
}

export default PopularList