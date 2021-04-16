import React, { useState } from "react";
import { URL_BACKDROP, DEFAULT_BACKDROP, STORAGE_LIST, STORAGE_NEXTID } from "../const";
import {Link} from "react-router-dom";

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

const Top250List = (props) => {
    const movies = props.movies;

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
                        <h3 className="topRated-item__title">{movies.indexOf(movie) + 1}. {movie.title}</h3>
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
                        <div className="topRated__btns">
                        {
                            checkDuplicateID(movie.id) && !checkIfSeen(movie.id)
                            ? (<button className="fromWatchlist" onClick={(e) => removeWatchlistItem(movie.id)} title="Remove from the watchlist">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                </svg>
                            </button>)
                            : (<button className="toWatchlist" onClick={(e) => addWatchlistItem(movie)} title="Add to your watchlist">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                </svg>
                            </button>)
                        }
                        {
                            checkIfSeen(movie.id)
                            ? (<button className="fromSeen" onClick={(e) => removeWatchlistItem(movie.id)} title="Click if haven't seen yet">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                                </svg>
                            </button>)
                            : (<button className="toSeen" onClick={(e) => addSeenItem(movie)} title="Mark as watched">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" role="img" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                                </svg>
                            </button>)
                        }
                        </div>
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