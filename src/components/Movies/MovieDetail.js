import React, { useState, useEffect } from "react";
import {URL_DETAIL, URL_VIDEO, URL_YOUTUBE, API_KEY, URL_IMG, IMG_SIZE_LARGE, URL_BACKDROP} from "../const"

const MovieDetail = ({ match }) => {
    useEffect (() => {
        fetchItem();
        fetchTrailer();
    }, []);

    const [item, setItem] = useState({});

    const fetchItem = async () => {
        let url = URL_DETAIL + match.params.id + API_KEY
        const fetchItem = await fetch(`${url}`);
        const item = await fetchItem.json();
        setItem(item);
        console.log(item);
    }

    const [trailer, setTrailer] = useState({});
    const fetchTrailer = async () => {
        let url = URL_DETAIL + match.params.id + URL_VIDEO + API_KEY
        const fetchTrailer = await fetch(`${url}`);
        const trailer = await fetchTrailer.json();
        if (trailer.results <= 1) {
            return false
        } else {
            setTrailer(trailer);
        }
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    let trailerId;

    if (isEmpty(trailer)) {
        return (<h2>Sorry, no info availble about this one =*(</h2>)
    } else {
        trailerId = trailer.results[0].key
    } 

    if (isEmpty(item) || isEmpty(trailer)) {
        return (
            <h1>is loading</h1>
        )

    } else {
        return (
            <>
            <img className="backdrop" src={URL_BACKDROP+item.backdrop_path} alt="Background Image"/>              
            <div className="movie-d">  
                <div className="movie-d__overlay">
                    <div className="movie-d__info">
                        <h1>{item.title}</h1>
                        {             
                            item.genres.map((genre) => {
                                return (
                                    <span key={genre.name}>{genre.name}</span>
                                )
                            })
                        }
                        {
                            item.vote_average === 0
                            ? ""
                            : <div className="movie__rating movie__rating_detail">
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
                                    <text x="18" y="21.5" className="percentage">{item.vote_average}</text>
                                </svg>
                            </div>
                        }
                    </div>
                    <div className="movie-d__visual">
                        <div className="movie-d__pic">
                        {
                            item.poster_path === null 
                            ? <img src={`https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-300x450.jpg`} alt="Movie Poster" /> 
                            : <img src={`${URL_IMG+IMG_SIZE_LARGE+item.poster_path}`} alt="Movie Poster" />
                        }
                        </div>
                        <div className="movie-d__vid">
                            <iframe title={URL_YOUTUBE + trailerId} src={URL_YOUTUBE + trailerId}/>
                        </div>
                    </div>
                </div>              
            </div>
            </>
        )
    }
}

export default MovieDetail
