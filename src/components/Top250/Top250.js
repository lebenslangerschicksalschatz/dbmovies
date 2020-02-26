import React, { Component } from "react";
import debounce from "lodash.debounce";
import {URL_TOP250, API_KEY} from "../const";
import Top250List from "./Top250List";

class Top250 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      isLoading: false,
      movies: [],
      currentPage: 0
    };

    window.onscroll = debounce(() => {
      const {
        loadMore,
        state: {
          isLoading,
          hasMore,
        },
      } = this;

      if (isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    }, 250);
  }

async componentDidMount() {
    let url = URL_TOP250 + API_KEY; 
    fetch(url)
    .then(data => data.json())
    .then(data => {
        this.setState({ movies: data.results, currentPage: data.page })
    })    
}

loadMore = () => {
    let nextPage = this.state.currentPage + 1;
    let url = `${URL_TOP250 + API_KEY}&page=${nextPage}`;    
    this.setState({ isLoading: true }, () => {
        fetch(url)
        .then(data => data.json())
        .then(data => {
            const nextMovies = data.results
            this.setState({
                currentPage: data.page,
                hasMore: (this.state.movies.length < 250),
                isLoading: false,
                movies: [
                ...this.state.movies,
                ...nextMovies,
                ],
            });
        });
    })
};

render() {
    const {
      hasMore,
      isLoading
    } = this.state;

    return (
      <div className="topRated">
          <div className="wrapper">
            <h2 className="topRated__title">Top 250 movies</h2>
            <Top250List movies={this.state.movies}/>
            {isLoading &&
            <div>Loading...</div>
            }
            {!hasMore &&
            <div>You did it! You reached the end!</div>
            }
          </div>
      </div>
    );
  }
}

export default Top250;