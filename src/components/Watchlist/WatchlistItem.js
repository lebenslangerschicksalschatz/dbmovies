import React from 'react';
import { DEFAULT_POSTER, URL_IMG, IMG_SIZE_SMALL } from '../const';
import {Link} from "react-router-dom";
import {MovieRatingIcon, EyeSlashIcon, EyeIcon, DeleteIcon} from "../../styled/icons";

const WatchlistItem = (props) => {
  return (
    <div
      tabIndex="0"
      className={"list-item "+(props.completed?"seen-item":"up-next-item")}
      aria-label={(props.completed ?"Watched: ":"Up Next: ")}
    >
      <div className="list-item__wrap">
        <div className="list-item__pic">
          {props.item.vote_average !== 0 && <MovieRatingIcon rating={props.item.vote_average}/>}
          {props.item.poster_path !== null
            ? <img src={URL_IMG + IMG_SIZE_SMALL + props.item.poster_path} alt="Movie Poster"/>
            : <img src={DEFAULT_POSTER} alt="Movie Poster"/>
          }
          <Link className="list-item__detail" to={`/movie/${props.item.id}`}>
              <span>Details</span>
          </Link>
          <div className="list-item__text">
              <h3 className="list-item__title">{props.item.title}</h3>
              {props.item.release_date !== undefined &&
                <span className="list-item__date">{props.item.release_date.substring(0,4)}</span>
              }
          </div>
        </div>
        <div className="list-item__btns">
          {props.completed
            ? <button
                className="resetItem"
                onClick={() => props.handleReset(props.item.id, false)}
                title="Return to Watch List"
              >
                <EyeIcon/>
              </button>
            : <button
                className="checkItem"
                onClick={() => props.handleComplete(props.item.id, true)}
                title="Mark as Watched"
              >
                <EyeSlashIcon/>
              </button>
          }
          <button className="deleteItem" onClick={() => props.handleClose(props.item.id)} title="Click to delete">
            <DeleteIcon/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchlistItem;
