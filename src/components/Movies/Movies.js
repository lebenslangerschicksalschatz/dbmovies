import React, {useState} from "react";
import {URL_SEARCH, API_KEY} from "../const";
import SearchArea from "../SearchArea";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import Popular from "./Popular";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");

  const searchURL = URL_SEARCH + API_KEY;

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await fetch(`${searchURL}&query=${searchTerm}`)
    .then(res => res.json());

    setTotalResults(data.total_results);
    setPages(data.total_pages);
    setMovies(data.results);

    e.target.reset();
  }

  async function nextPage(page) {
    const data = await fetch(`${searchURL}&query=${searchTerm}&page=${page}`)
    .then(res => res.json());

    setCurrentPage(page);
    setMovies(data.results);
  }

  // eslint-disable-next-line array-callback-return
  const sortedMovies = movies.sort((a,b) => {
    if(sort === "Newest") {
      return parseInt(b.release_date) - parseInt(a.release_date)
    }
    else if(sort === "Oldest") {
      return parseInt(a.release_date) - parseInt(b.release_date)
    }
    else if(sort === "RatingAsc") {
      return a.vote_average - b.vote_average
    }
    else if(sort === "RatingDesc") {
      return b.vote_average - a.vote_average
    }
  });

  return (
    <div className="movies">
      <SearchArea
        movies={movies}
        handleSubmit={handleSubmit}
        handleChange={term => setSearchTerm(term)}
        handleSort={sortParam => setSort(sortParam)}
      />
      {
        movies.length === 0
        ? <Popular />
        : <MovieList movies={sortedMovies} />
      }
      {totalResults > 20 && <Pagination
        pages={pages <= 5 ? pages : 5}
        nextPage={nextPage}
        current={currentPage}
      />}
    </div>
  );
}

export default Movies;