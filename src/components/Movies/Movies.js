import React from "react";
import { URL_SEARCH, API_KEY } from "../const"
import SearchArea from "../SearchArea"
import MovieList from "./MovieList"
import Pagination from "./Pagination"
import Popular from "./Popular"
 
class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      searchTerm: "",
      totalPages: 0,
      totalResults: 0,
      currentPage: 1,
      sort: ""
    }
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value})    
  }
  

  handleSubmit = (event) => { 
    let url = URL_SEARCH + API_KEY   
    event.preventDefault();
    //
    const form = event.target;
    fetch(`${url}&query=${this.state.searchTerm}`)
    .then(data => data.json())
    .then(data => {
      this.setState({movies: [...data.results], totalResults: data.total_results, totalPages: data.totalPages})      
      form.reset();
      console.log(data);
    })
  }  

  nextPage = (pageNumber) => {   
    let url = URL_SEARCH + API_KEY  
    fetch(`${url}&query=${this.state.searchTerm}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {      
      this.setState({movies: [...data.results], currentPage: pageNumber})
    })
  }  

  handleSort = (event) => {    
    this.setState({sort: event.target.value})
  }

  render() {
    console.log(this.state.movies);
    const numberPages = () => {      
      if (this.state.totalPages <= 5) {
        return this.state.totalPages;
      } else {
        return 5
      }      
    }

    const sortedMovies = this.state.movies.sort((a,b) => {
      if(this.state.sort === "Newest") {
        return parseInt(b.release_date) - parseInt(a.release_date)
      }
      else if(this.state.sort === "Oldest") {
        return parseInt(a.release_date) - parseInt(b.release_date)
      }
      else if(this.state.sort === "RatingAsc") {
        return a.vote_average - b.vote_average
      }
      else if(this.state.sort === "RatingDesc") {
        return b.vote_average - a.vote_average
      }
    });

    return (
      <div className="movies">
        <SearchArea 
          searchTerm={this.state.searchTerm}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleSort={this.handleSort}
        />
        {
          this.state.movies.length === 0
          ? <Popular />
          : <MovieList movies={sortedMovies} />
        }
        {
          this.state.totalResults > 20 
          ? <Pagination pages={numberPages()} nextPage={this.nextPage} currentPage={this.state.currentPage} />
          : null
        }
      </div>
    );
  }
}
 
export default Movies;