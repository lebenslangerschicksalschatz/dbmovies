import React, { Component } from 'react';
import WatchlistInput from './WatchlistInput';
import WatchlistContainer from './WatchlistContainer';
import { STORAGE_LIST, STORAGE_NEXTID } from '../const';
 
class Watchlist extends Component {
  constructor(props){
    super(props);
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
    if(this.canAccessLocalStorage) {
        return JSON.parse(localStorage.getItem(STORAGE_LIST)) || [];
    } else {
      return [];
    }
  }

  getNextIDStorage() {
    if(this.canAccessLocalStorage) {
      return parseInt(localStorage.getItem(STORAGE_NEXTID), 10) || 0;
    } else {
      return 0;
    }
  }

  updateStorage(watchlist, nextID) {
    if(this.canAccessLocalStorage) {
        localStorage.setItem(STORAGE_LIST, JSON.stringify(watchlist));
        localStorage.setItem(STORAGE_NEXTID, nextID); 
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
        watchlistItem: watchlistItem,
        completed: false,
        rating: 0
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

  updateWatchlistItemStatus(id, status){
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
    console.log(watchlistArray);

    return (
      <div className="watchlist">
        <h2 className="watchlist__title">watchlist</h2>
        <WatchlistInput 
          addWatchlistItem={(watchlistItem) => this.addWatchlistItem(watchlistItem)}
        />
        { this.canAccessLocalStorage 
          ? <WatchlistContainer
            listItems={watchlistArray}
            removeWatchlistItem={(id) => this.removeWatchlistItem(id)}
            updateWatchlistItemStatus={(id, status) => this.updateWatchlistItemStatus(id, status)}
          />
          : <div id="storageError">
              Unable to access LocalStorage.
            </div> 
        }              
      </div>
    );
  }
}
 
export default Watchlist;