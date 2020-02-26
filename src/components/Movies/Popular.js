import React, { useState, useEffect } from "react";
import {URL_POPULAR, API_KEY } from "../const"
import PopularList from "./PopularList"

const Popular = () => {
    useEffect (() => {
        fetchPopular();        
    }, []);

    const [popular, setPopular] = useState({});
    const [isLoading, setIsLoading] = useState({isLoading:false});

    const fetchPopular = async () => {
        let url = `${URL_POPULAR + API_KEY}&language=en-US&page=1`
        setIsLoading(true);
        const fetchPopular = await fetch(`${url}`);
        const data = await fetchPopular.json();
        setPopular(data.results);
        setIsLoading(false);
    }

    if (isLoading) {
        return (<h2 className="isLoading">Loading..</h2>)

    } else {
        return (
            <>
                <PopularList movies={popular}/>                
            </>
        ) 
    }
}

export default Popular