function getItem(key) {
    if(checkLocalStorage()) {
        return window.localStorage.getItem(key)
    } else {
        return null
    }
}

function setItem(key, value) {
    if(checkLocalStorage()) {
        return window.localStorage.setItem(key, value)
    }
}

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

export default {getItem, setItem, checkLocalStorage}