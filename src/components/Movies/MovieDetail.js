import React, { useState, useEffect } from "react";
import {URL_DETAIL, URL_VIDEO, URL_YOUTUBE, API_KEY, URL_IMG, IMG_SIZE_LARGE, URL_BACKDROP, DEFAULT_BACKDROP, STORAGE_LIST, STORAGE_NEXTID } from "../const"

function checkLocalStorage() {
    try {
        localStorage.setItem("watchlist_test", "test");
        localStorage.removeItem("watchlist_test");
        return true;
    }
    catch (e) {
        return false;
    }
}

const canAccessLocalStorage = checkLocalStorage();

const MovieDetail = ({ match }) => {
    useEffect (() => {
        fetchItem();
        fetchTrailer();
    }, []);

    const [item, setItem] = useState({});
    const [trailer, setTrailer] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchItem = async () => {
        let url = URL_DETAIL + match.params.id + API_KEY
        setIsLoading(true);
        const fetchItem = await fetch(`${url}`);
        const item = await fetchItem.json();
        setItem(item);
        console.log(item);
        setIsLoading(false);
    }

    const fetchTrailer = async () => {
        let url = URL_DETAIL + match.params.id + URL_VIDEO + API_KEY
        setIsLoading(true);
        const fetchTrailer = await fetch(`${url}`);
        const trailer = await fetchTrailer.json();
        if (trailer.results < 1) {
            return false
        } else {
            setTrailer(trailer);
        }
        setIsLoading(false);
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    //LOCAL STORAGE      
    const [watchlistArray, setWatchlistArray] = useState( getWatchlistStorage() );
    const [nextID, setNextID] = useState( getNextIDStorage() );    

    function getWatchlistStorage() {
        if(canAccessLocalStorage){
            return JSON.parse(localStorage.getItem(STORAGE_LIST)) || [];
        } else {            
            return [];
        }
    }
    
    function getNextIDStorage() {
        if (canAccessLocalStorage) {
            return parseInt(localStorage.getItem(STORAGE_NEXTID), 10) || 0;
        } else {            
            return 0;
        }
    }

    function updateStorage(watchlist, nextID){
        if (canAccessLocalStorage) {
            localStorage.setItem(STORAGE_LIST, JSON.stringify(watchlist));
            localStorage.setItem(STORAGE_NEXTID, nextID);
        }
    }

    function checkDuplicateID(id){
        return watchlistArray.some((item) => item.watchlistItem.id === id);     
    }

    function checkIfSeen(id){
        let foundList = watchlistArray.filter(item => item.watchlistItem.id === id);
        return foundList.some((item) => item.completed === true)
    }

    function addWatchlistItem(watchlistItem) { 
        let updatedID = Number(nextID) + 1;       
        if (!checkDuplicateID(watchlistItem.id)) {            
            let newItem = [{
                id: updatedID, 
                watchlistItem: watchlistItem,
                completed: false,
                rating: 0
            }];
          let updatedList = newItem.concat(watchlistArray);          
          setWatchlistArray(updatedList);
          setNextID(updatedID);
          updateStorage(updatedList, updatedID);
        } else if (checkIfSeen(watchlistItem.id)) {
            updateWatchlistItemStatus(watchlistItem.id, false);
        }
    }

    function addSeenItem(watchlistItem) {
        let updatedID = Number(nextID) + 1;
        if (!checkDuplicateID(watchlistItem.id)) {
            let newItem = [{
                id: updatedID, 
                watchlistItem: watchlistItem,
                completed: true,
                rating: 0
            }];
    
            let updatedList = newItem.concat(watchlistArray);          
            setWatchlistArray(updatedList);
            setNextID(updatedID);
            updateStorage(updatedList, updatedID);
        } else {
            updateWatchlistItemStatus(watchlistItem.id, true);
        }
    }

    function removeWatchlistItem(id) {
        let updatedList = watchlistArray.filter((item) => item.watchlistItem.id !== id);        
        setWatchlistArray(updatedList);        
        updateStorage(updatedList, nextID);
    }

    function updateWatchlistItemStatus(id, status){
        let updatedList = watchlistArray.map((item) => item.watchlistItem.id !== id ? item : {...item, completed: status});
        setWatchlistArray(updatedList);
        updateStorage(updatedList, nextID);
        console.log(updatedList)
    }

    // RENDERING
    if (!canAccessLocalStorage) {
        return (<div id="storageError">
              Unable to access LocalStorage.
        </div>)
    } else if (isLoading) {
        return (<h1>Loading..</h1>)

    } else {
        return (
            <>            
            {
                item.backdrop_path === null 
                ?<img className="backdrop" src={DEFAULT_BACKDROP} alt="Background"/> 
                :<img className="backdrop" src={URL_BACKDROP+item.backdrop_path} alt="Background"/> 
            }
            <div className="movie-d">
                <div className="movie-d__info">
                    <h3 className="movie-d__title">
                        {item.title}
                        {
                            item.release_date === undefined
                            ? null
                            : <span>({item.release_date.substring(0,4)})</span>
                        }
                    </h3>
                    {
                        item.tagline === ""
                        ? null
                        : <h3 className="movie-d__tagline">{item.tagline}</h3>
                    }
                    {             
                        item.genres && item.genres.map((genre) => {
                            return (
                                <span className="movie-d__genre" key={genre.name}>#{genre.name}</span>
                            )
                        })
                    }
                    {
                        item.vote_average === 0
                        ? ""
                        : <div className="movie__rating movie__rating_detail">
                            <svg viewBox="0 0 36 36" className="circular-chart circular-chart_detail">                            
                                <path className="circle-bg"
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle circle_detail"
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
                <div className="movie-d__content">
                    <div className="movie-d__pic">
                    {
                        item.poster_path === null 
                        ? <img src={`https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-300x450.jpg`} alt="Movie Poster" /> 
                        : <img src={`${URL_IMG+IMG_SIZE_LARGE+item.poster_path}`} alt="Movie Poster" />
                    }
                        <div className="movie-d__btns">                        
                        {
                            checkDuplicateID(item.id) && !checkIfSeen(item.id)
                            ? (<button className="fromWatchlist" onClick={(e) => removeWatchlistItem(item.id)} title="Remove from the watchlist">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                </svg>
                            </button>)
                            : (<button className="toWatchlist" onClick={(e) => addWatchlistItem(item)} title="Add to your watchlist">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                </svg>
                            </button>)                            
                        }
                        {
                            checkIfSeen(item.id)
                            ? (<button className="fromSeen" onClick={(e) => removeWatchlistItem(item.id)} title="Click if haven't seen yet">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                                </svg>
                            </button>)
                            : (<button className="toSeen" onClick={(e) => addSeenItem(item)} title="Mark as watched">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" role="img" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                                </svg>
                            </button>)
                        }
                        </div>
                    </div>                        
                    {
                        isEmpty(trailer)
                        ? <div className="movie-d__desc movie-d__desc_top">
                            <h3>Overview</h3>
                            <p>{item.overview}</p>
                        </div>
                        : <div className="movie-d__vid">
                            <iframe title={URL_YOUTUBE + trailer.results[0].key} src={URL_YOUTUBE + trailer.results[0].key}/>
                        </div>
                    }                    
                </div>
                {
                    isEmpty(trailer)
                    ? null
                    : <div className="movie-d__desc">
                        <h3>Overview</h3>
                        <p>{item.overview}</p>
                    </div>
                }                                    
            </div> 
            <div className="movie-d__overlay"> 
            </div>
            </>
        )
    }
}

export default MovieDetail