import React, { useState } from "react";
import WatchlistInput from './WatchlistInput';
import WatchlistContainer from './WatchlistContainer';
import {getWatchlistStorage, setWatchlistStorage} from "../movieHelpers";
import LocalStorage from "../../localStorage";

function Watchlist () {
  const [watchlistArray, setWatchlistArray] = useState(getWatchlistStorage());

  function checkDuplicateID(id){
    let matches = getWatchlistStorage().filter((item) => item.watchlistItem.id === id);
    return matches.length;
  }

  function addWatchlistItem(watchlistItem) {
    if(!checkDuplicateID(watchlistItem.id)){
      let newItem = {
        watchlistItem,
        completed: false,
        rating: 0
      };
      let updatedList = [...watchlistArray, newItem];
      setWatchlistStorage(updatedList);
      setWatchlistArray(updatedList);
    }
  }

  function removeWatchlistItem(id) {
    let updatedList = watchlistArray.filter((item) => item.watchlistItem.id !== id);

    setWatchlistStorage(updatedList);
    setWatchlistArray(updatedList);
  }

  function updateWatchlistItemStatus(id, status){
    let updatedList = watchlistArray.map((item) =>
      item.watchlistItem.id !== id
        ? item
        : {...item, completed:status}
    );

    setWatchlistStorage(updatedList);
    setWatchlistArray(updatedList);
  }

  return (
    <div className="watchlist">
      <h2 className="watchlist__title">watchlist</h2>
      <WatchlistInput
        addWatchlistItem={(watchlistItem) => addWatchlistItem(watchlistItem)}
      />
      {LocalStorage.checkLocalStorage()
        ? <WatchlistContainer
          listItems={watchlistArray}
          handleClose={id => removeWatchlistItem(id)}
          handleReset={(id, status) => updateWatchlistItemStatus(id, status)}
          handleComplete={(id, status) => updateWatchlistItemStatus(id, status)}
        />
        : <div id="storageError">Unable to access LocalStorage.</div>
      }
    </div>
  )

}

export default Watchlist;