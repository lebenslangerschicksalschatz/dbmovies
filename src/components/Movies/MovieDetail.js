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
    const [isLoading, setIsLoading] = useState({isLoading:false});

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
        return foundList.some((item) => item.completed === 1)
    }

    function addWatchlistItem(watchlistItem) {
        let updatedID = Number(nextID) + 1;
        if (!checkDuplicateID(watchlistItem.id)) {
            let newItem = [{
                id: updatedID, 
                watchlistItem: watchlistItem,
                completed: false
            }];
          let updatedList = newItem.concat(watchlistArray);          
          setWatchlistArray(updatedList);
          setNextID(updatedID);
          updateStorage(updatedList, updatedID);
        }
    }

    function addSeenItem(watchlistItem) {  
        let updatedID = Number(nextID) + 1;      
        if (!checkDuplicateID(watchlistItem.id)) {

            let newItem = [{
                id: updatedID, 
                watchlistItem: watchlistItem,
                completed: true
            }];
    
            let updatedList = newItem.concat(watchlistArray);          
            setWatchlistArray(updatedList);
            setNextID(updatedID);
            updateStorage(updatedList, updatedID);
        } else if (!checkIfSeen(watchlistItem.id)) {
            updateWatchlistItemStatus(watchlistItem.id, 1);
        }
    }

    function removeWatchlistItem(id) {
        let updatedList = watchlistArray.filter((item) => item.watchlistItem.id !== id);        
        setWatchlistArray(updatedList);        
        updateStorage(updatedList, nextID);
    }

    function updateWatchlistItemStatus(id, status){
        watchlistArray.slice(0);
        let updatedList = watchlistArray.map((item) => item.id !== id ? item : {...item, completed: status});
        setWatchlistArray(updatedList);
        updateStorage(updatedList, nextID);
        console.log(updatedList);
    }

    function handleReset(e, id){
        updateWatchlistItemStatus(id, false);
    }

    function handleSeen(e, id){
        updateWatchlistItemStatus(id, true);
    }

    /* console.log(watchlistArray); */

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
                <div className="movie-d__overlay">
                    <div className="movie-d__info">
                        <h3 className="movie-d__title">{item.title}</h3>
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
                        </div>                        
                        {
                            isEmpty(trailer)
                            ? <div>No Trailer</div> 
                            : <div className="movie-d__vid">
                                <iframe title={URL_YOUTUBE + trailer.results[0].key} src={URL_YOUTUBE + trailer.results[0].key}/>
                            </div>
                        }
                    </div>
                    <div className="movie-d__btns">                        
                        {
                            checkDuplicateID(item.id)
                            ? (<button id="remove" onClick={(e) => removeWatchlistItem(item.id)}>
                                In the Watchlist
                            </button>)
                            : (<button id="toWatchlist" onClick={(e) => addWatchlistItem(item)}>
                                Add to Watchlist
                            </button>)                            
                        }
                        {
                            checkIfSeen(item.id)
                            ? (<button id="reset" onClick={(e) => handleReset(e,item.id)}>
                                Already Seen
                            </button>)
                            : (<button id="alreadySeen" onClick={(e) => handleSeen(e,item.id)}>
                                Haven't Seen
                            </button>)
                        }
                    </div>
                </div>              
            </div>
            </>
        )
    }
}

export default MovieDetail