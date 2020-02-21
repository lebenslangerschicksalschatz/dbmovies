import React, { Component } from 'react';
import WatchlistItem from './WatchlistItem';

class WatchlistContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleComplete(e, id){
        this.props.updateWatchlistItemStatus(id, 1);
    }

    handleReset(e, id){
        this.props.updateWatchlistItemStatus(id, 0);
    }

    handleClose(e, id) {
        this.props.removeWatchlistItem(id);
    }

    getLists() {
        const listItems = this.props.listItems;
        const upNextItems = [];
        const completedItems = [];
  
        listItems.forEach((item) => {
            let listItem = (
                <WatchlistItem 
                    key={item.id}
                    completed={item.completed}
                    watchlistItem={item.watchlistItem}
                    handleClose={(e) => this.handleClose(e,item.id)} 
                    handleReset={(e) => this.handleReset(e,item.id)}
                    handleComplete={(e) => this.handleComplete(e,item.id)}
                />
            )
            if (item.completed) {
                completedItems.push(listItem);
            } else {
                upNextItems.push(listItem);
            }
        });
  
        return [upNextItems, completedItems];
    }

    render() {
        const [upNextItems, completedItems] = this.getLists();
        let upNextDisplay;

        if (upNextItems.length > 0) {
            upNextDisplay = <div className="toWatch">{upNextItems}</div>;
        } else {
            upNextDisplay = (
              <div className="watchlist__empty">
                <span>how come your watchlist is empty?</span>
              </div>
            );
        }

        const completedDisplay = (
            <div className="seen">
              <h3 className="seen__title">Already Seen</h3>
              <div className="seen__list">{completedItems}</div>
            </div>
        );

        return (
            <div className="watchlist__wrap">
              { upNextDisplay }
              { completedItems.length > 0 && completedDisplay }
            </div>
        );
    }
}

export default WatchlistContainer;