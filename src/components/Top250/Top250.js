import React, {useState, useEffect} from "react";
import debounce from "lodash.debounce";
import {URL_TOP250, API_KEY} from "../const";
import Top250List from "./Top250List";

const Top250 = () => {
  const baseURL = URL_TOP250 + API_KEY;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  window.onscroll = debounce(() => {
    const scrolledHeight = window.innerHeight + document.documentElement.scrollTop;
    const docHeight = document.documentElement.offsetHeight;

    if (loading || !hasMore) return;

    if (scrolledHeight + 50 >= docHeight || scrolledHeight - 50 >= docHeight) {
      loadMore();
    }
  }, 50);

  async function fetchMovies() {
    setLoading(true);

    const data = await fetch(baseURL).then(res => res.json());

    setMovies(data.results);
    setCurrentPage(data.page);

    setLoading(false);
  }

  async function loadMore() {
    let nextPage = currentPage + 1;
    let url = `${baseURL}&page=${nextPage}`;

    setLoading(true);

    const data = await fetch(url).then(res => res.json());

    setMovies([...movies, ... data.results]);
    setCurrentPage(data.page);
    setHasMore(movies.length < 250);

    setLoading(false);
  };

  return (
    <div className="topRated">
        <div className="wrapper">
          <h2 className="topRated__title">Top 250 movies</h2>
          <Top250List movies={movies}/>
          {loading && <div>Loading...</div>}
          {!hasMore &&<div>You did it! You reached the end!</div>}
        </div>
    </div>
  );
}

export default Top250;