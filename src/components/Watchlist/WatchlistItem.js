import React, { Component } from 'react';
import { DEFAULT_POSTER, URL_IMG, IMG_SIZE_SMALL } from '../const';
import {Link} from "react-router-dom";

class WatchlistItem extends Component {
    render() {
        return (
            <div tabIndex="0" 
                className={"list-item "+(this.props.completed?"seen-item":"up-next-item")} 
                aria-label={(this.props.completed?"Watched: ":"Up Next: ")}>
                <div className="list-item__wrap">
                    <div className="list-item__pic">
                        {
                            this.props.watchlistItem.vote_average === 0
                            ? ""
                            : <div className="movie__rating movie__rating_watchlist">
                                <svg viewBox="0 0 36 36" className="circular-chart circular-chart_watchlist">                            
                                    <path className="circle-bg circle-bg_watchlist"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path className="circle circle_watchlist"
                                    strokeDasharray="78, 100"
                                    d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="21.5" className="percentage percentage_watchlist">{this.props.watchlistItem.vote_average}</text>
                                </svg>
                            </div>
                        }
                        { 
                            this.props.watchlistItem.poster_path !== null 
                            ? <img src={URL_IMG + IMG_SIZE_SMALL + this.props.watchlistItem.poster_path} alt="Movie Poster"/>
                            : <img src={DEFAULT_POSTER} alt="Movie Poster"/>
                        }
                        <Link to={`/movie/${this.props.watchlistItem.id}`}>
                            <div className="list-item__detail"><span>Details</span></div>
                        </Link>
                        <div className="list-item__text">
                            <h3 className="list-item__title">{this.props.watchlistItem.title}</h3>
                            {
                                this.props.watchlistItem.release_date !== undefined
                                ? <span className="list-item__date">{this.props.watchlistItem.release_date.substring(0,4)}</span>
                                : ""
                            }
                        </div>
                    </div>
                    <div className="list-item__btns">
                        { 
                            this.props.completed ? (
                                <button className="list-item__reset" onClick={this.props.handleReset} title="Return to Watch List">
                                    <span>undo</span>
                                </button>
                            ) :
                            (
                                <button className="list-item__check" onClick={this.props.handleComplete} title="Mark as Watched">
                                    <span>check</span>
                                </button>
                            )
                        }
                        <button className="list-item__remove" onClick={this.props.handleClose} title="Remove from Watch List">
                            <span>remove</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default WatchlistItem;
