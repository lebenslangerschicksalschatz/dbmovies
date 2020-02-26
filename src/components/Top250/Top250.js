import React, { useState, useEffect } from "react";
import {URL_TOP250, API_KEY } from "../const";
import Top250List from "./Top250List";

const Top250 = () => {

    useEffect (() => {
        fetchTop250();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const [isLoading, setIsLoading] = useState({isLoading:false});  
    const [top250, setTop250] = useState();

    async function fetchTop250() {
        let url = URL_TOP250 + API_KEY
        setIsLoading(true);
        const fetchTop250 = await fetch(url);
        const data = await fetchTop250.json();
        setTop250(data.results);
        console.log(top250);
        setIsLoading(false);
    }

    if (isLoading) {
        return (<h2 className="isLoading">Loading..</h2>)

    } else {
        return (
            <div id="topRated" className="topRated">
              <div className="wrapper">
                <h2 className="topRated__title">Top 250 movies</h2>
                <Top250List movies={top250} />
              </div>             
            </div>
        ) 
    }
}

export default Top250;