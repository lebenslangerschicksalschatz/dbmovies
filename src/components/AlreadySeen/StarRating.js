import React, { useState } from "react";
import { STORAGE_LIST, STORAGE_NEXTID } from "../const"

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

const Star = ({ selected = false, onClick = f => f }) => {
    
    return (
        <div className={selected ? "star selected" : "star"} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" viewBox="0 0 576 512">
                <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
            </svg>
        </div>    
    );

};

const StarRating = ({ totalStars, movieID, rating }) => {    

    const [watchlistArray, setWatchlistArray] = useState( getWatchlistStorage() );
    const [nextID, setNextID] = useState( getNextIDStorage() ); 
    const [starsSelected, selectStar] = useState(rating);

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

    function updateWatchlistItemRating(id, rating){
        let updatedList = watchlistArray.map((item) => item.watchlistItem.id !== id ? item : {...item, rating: rating});
        setWatchlistArray(updatedList);
        updateStorage(updatedList, nextID);
    }

    console.log(rating);

    return (
    
      <div className="star-rating">
        <h3 className="star-rating__title">Rate This
            <span>({starsSelected} out of {totalStars})</span>
        </h3>
        <div className="star-rating__stars">
            {
                [...Array(totalStars)].map((n, star) => (
                    <Star
                        key={star}
                        selected={star < starsSelected}
                        onClick={(e) => {
                            selectStar(star + 1)
                            updateWatchlistItemRating(movieID, star + 1)
                        }}
                    />
                ))                
            }
        </div>
      </div>
        
    );
};

export default StarRating;