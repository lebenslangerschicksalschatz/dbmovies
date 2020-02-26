import React, { useState } from "react";
import {Link} from "react-router-dom";
import {URL_IMG, IMG_SIZE_SMALL, DEFAULT_POSTER } from "../const"
import { getWatchlistStorage, setWatchlistStorage } from "../movieHelpers";
import LocalStorage from "../../localStorage"
import StarRating from "./StarRating";
import UserNotes from "./UserNotes";

const AlreadySeen = () => {

  const [watchlistArray, setWatchlistArray] = useState(getWatchlistStorage());
  const [searchTerm, setSearchTerm] = useState("");

  function removeWatchlistItem(id) {
    let updatedList = getWatchlistStorage().filter((item) => item.watchlistItem.id !== id);        
    setWatchlistStorage(updatedList);
    setWatchlistArray(updatedList);
  }

  function updateWatchlistItemStatus(id, status){
    let updatedList = getWatchlistStorage().map((item) => item.watchlistItem.id !== id ? item : {...item, completed: status});
    setWatchlistStorage(updatedList);
    setWatchlistArray(updatedList);
  }
  
  const filteredSeenlistArray = watchlistArray
    .filter((item) => item.completed)
    .filter((item) => {
      if (!searchTerm) {
        return true
      }      
      return item.watchlistItem.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  
  //USER NOTES
  const [storedHeading, setStoredHeading] = useState(
    "Click to enter your thoughts!"
  );

  if (!LocalStorage.checkLocalStorage()) {
    return (
      <div id="storageError">
        Unable to access LocalStorage.
      </div>
    )
  } 

  return (
    <div className="seenlist">
      <h2 className="seenlist__title">ALREADY SEEN LIST</h2> 
      <div className="seenlist__input">
        <label htmlFor="seenlist-input">Search for a particular movie:</label>
        <input 
          id="seenlist-input"
          type="text" 
          placeholder="type in something..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="seenlist__items">
        {
          filteredSeenlistArray.map((item) =>{
            return (
              <div className="seenlist-item" key={item.watchlistItem.id}>
                <div className="seenlist-item__left">                    
                  <div className="seenlist-item__pic">
                  {
                    item.watchlistItem.vote_average === 0
                    ? null
                    : <div className="movie__rating movie__rating_seenlist">
                        <svg viewBox="0 0 36 36" className="circular-chart circular-chart_seenlist">                            
                            <path className="circle-bg circle-bg_seenlist"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle circle_seenlist"
                            strokeDasharray="78, 100"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="21.5" className="percentage percentage_seenlist">{item.watchlistItem.vote_average}</text>
                        </svg>
                    </div>
                  }
                  { 
                    item.watchlistItem.poster_path !== null 
                    ? <img src={URL_IMG + IMG_SIZE_SMALL + item.watchlistItem.poster_path} alt="Movie Poster"/>
                    : <img src={DEFAULT_POSTER} alt="Movie Poster"/>
                  }
                    <Link className="seenlist-item__detail" to={`/movie/${item.watchlistItem.id}`}>
                      <span>Details</span>
                    </Link>
                    <div className="seenlist-item__text">
                      <h3 className="seenlist-item__title">{item.watchlistItem.title}</h3>
                      {
                          item.watchlistItem.release_date !== undefined || item.watchlistItem.release_date !== ""
                          ? <span className="seenlist-item__date">{item.watchlistItem.release_date.substring(0,4)}</span>
                          : null
                      }
                    </div>
                  </div>
                  <div className="seenlist-item__btns">
                    <button className="resetItem" onClick={(e) => updateWatchlistItemStatus(item.watchlistItem.id, false)} title="Return to Watch List">                                    
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" role="img" viewBox="0 0 640 512">
                          <path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                      </svg>
                    </button>
                    <button className="deleteItem" onClick={(e) => removeWatchlistItem(item.watchlistItem.id)} title="Click to delete">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" viewBox="0 0 448 512">
                          <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="seenlist-item__right">
                <StarRating  
                  movieID={item.watchlistItem.id}
                  rating={item.rating}
                  totalStars={10}/>
                <UserNotes
                  text={storedHeading}                    
                  onSetText={text => setStoredHeading(text)}
                />
                </div>
              </div>                  
            )
          })
        }
      </div>       
    </div>
  )

}

export default AlreadySeen;