import React, { Component } from 'react';
import WatchlistInput from './WatchlistInput';
import WatchlistContainer from './WatchlistContainer';
import { STORAGE_LIST, STORAGE_NEXTID } from '../const';
 
class Watchlist extends Component {
  constructor(props){
    super(props);
    this.storageError = false;
    this.canAccessLocalStorage = false;
    this.canAccessLocalStorage = this.checkLocalStorage();
    this.state = {
      watchlistArray: this.getWatchlistStorage(),
      nextID: this.getNextIDStorage(),
    };
  }

  checkLocalStorage() {
    try {
      localStorage.setItem("watchlist_test", "test");
      localStorage.removeItem("watchlist_test");
      return true;
    }
    catch (e) {
      this.storageError = true;
      return false;
    }
  }

  getWatchlistStorage() {
    if(this.canAccessLocalStorage){
      try {
        return JSON.parse(localStorage.getItem(STORAGE_LIST)) || [];
      }
      catch (e){
        this.storageError = true;
        return [];
      }
    }else{
      this.storageError = true;
      return [];
    }
  }

  getNextIDStorage() {
    if(this.canAccessLocalStorage){
      try{
        return parseInt(localStorage.getItem(STORAGE_NEXTID), 10) || 0;
      }
      catch (e){
        this.storageError = true;
        return 0;
      }
    }else{
      this.storageError = true;
      return 0;
    }
  }

  updateStorage(watchlist, nextID){
    if(this.canAccessLocalStorage){
      try {
        localStorage.setItem(STORAGE_LIST, JSON.stringify(watchlist));
        localStorage.setItem(STORAGE_NEXTID, nextID);
      } catch (e) {
        this.storageError = true;
      }
    }else{
      this.storageError = true;
    }
  }

  checkDuplicateID(id){
    let matches = this.state.watchlistArray.filter((item) => item.watchlistItem.id === id);
    return matches.length;
  }

  addWatchlistItem(watchlistItem) {
    let updatedID = parseInt(this.state.nextID, 10) + 1;
    if(!this.checkDuplicateID(watchlistItem.id)){
      let newItem = [{
        id:updatedID, 
        watchlistItem: watchlistItem
      }];
      let updatedList = newItem.concat(this.state.watchlistArray);
      this.setState({
        watchlistArray: updatedList,
        nextID: updatedID
      });
      this.updateStorage(updatedList, updatedID);
    }
  }

  removeWatchlistItem(id) {
    let updatedList = this.state.watchlistArray.filter((item) => item.id !== id);
    this.setState({
      watchlistArray: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  updateWatchlistItemStatus(id,status){
    //clone the array and then map the cloned array to set completed on the matching ID
    const watchlistArray = this.state.watchlistArray.slice(0);
    let updatedList = watchlistArray.map((item) => item.id !== id ? item : {...item, completed:status});
    this.setState({
      watchlistArray: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  render() {
    const watchlistArray = this.state.watchlistArray;

    return (
      <div className="watchlist">
        <h2 className="watchlist__title">watchlist</h2>
        <WatchlistInput 
          addWatchlistItem={(watchlistItem) => this.addWatchlistItem(watchlistItem)}
        />
        { this.storageError && (
            <div id="storageError">
              Unable to access LocalStorage.
            </div>
          ) }
          <WatchlistContainer
            listItems={watchlistArray}
            removeWatchlistItem={(id) => this.removeWatchlistItem(id)}
            updateWatchlistItemStatus={(id, status) => this.updateWatchlistItemStatus(id, status)}
          />                
      </div>
    );
  }
}
 
export default Watchlist;