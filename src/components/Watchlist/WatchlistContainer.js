import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import WatchlistItem from './WatchlistItem';

const WatchlistContainer = (props) => {
    const [upNextItems, setUpNextItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    useEffect(() => {
      setCompletedItems(props.listItems.filter(item => item.completed === true));
      setUpNextItems(props.listItems.filter(item => item.completed === false));
    }, [props.listItems]);

    return (
      <div className="watchlist__wrap">
        {upNextItems.length > 0
          ? <GetWatchList class="toWatch" list={upNextItems} {...props}/>
          : <div className="watchlist__empty">
            <span>how come your watchlist is empty?</span>
          </div>}

        {completedItems.length > 0 && <div className="seen">
          <Link className="seen__title" to={`/AlreadySeen`}>
            Already Seen
          </Link>
          <GetWatchList class="seen__list" list={completedItems} {...props}/>
        </div>}
      </div>
    );
}

export default WatchlistContainer;

const GetWatchList = (props) => {
  return (
    <div className={props.class}>
      {props.list.map(listItem => {
        const item = listItem.watchlistItem;

        return (<WatchlistItem
          key={item.id}
          completed={listItem.completed}
          item={item}
          handleClose={id => props.handleClose(id)}
          handleReset={(id, status) => props.handleReset(id, status)}
          handleComplete={(id, status) => props.handleComplete(id, status)}
        />)
      })}
    </div>
  )
}