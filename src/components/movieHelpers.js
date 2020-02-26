import localStorage from "../localStorage";
import { STORAGE_LIST } from "./const";

export function getWatchlistStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_LIST)) || [];
}

export function setWatchlistStorage(watchlist) {
    return localStorage.setItem(STORAGE_LIST, JSON.stringify(watchlist));
}