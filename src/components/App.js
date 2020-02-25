import React, { Component } from 'react';
import '../scss/App.scss';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Movies from "./Movies/Movies";
import Watchlist from "./Watchlist/Watchlist";
import AlreadySeen from "./AlreadySeen/AlreadySeen";
import Top250 from "./Top250/Top250";
import MovieDetail from "./Movies/MovieDetail"

class App extends Component {
  render () {
    return (
      <>
        <HashRouter>
          <header className="header">
              <div className="wrapper">
                  <div className="header__logo"><NavLink exact to="/"><img src="./img/main_logo.png" alt="Main Logo"/></NavLink></div>
                  <nav className="nav">
                      <ul className="nav__list">
                          <li className="nav__item"><NavLink exact to="/">Home</NavLink></li>
                          <li className="nav__item"><NavLink to="/Watchlist">Watchlist</NavLink></li>
                          <li className="nav__item"><NavLink to="/AlreadySeen">Already Seen</NavLink></li>
                          <li className="nav__item"><NavLink to="/Top250">Top250</NavLink></li>
                      </ul>
                  </nav>
              </div>
          </header>
          <main className="main">
                <Route exact path="/" component={Movies}/>
                <Route path="/Watchlist" component={Watchlist}/>
                <Route path="/AlreadySeen" component={AlreadySeen}/>
                <Route path="/Top250" component={Top250}/>
                <Route path="/Movie/:id" component={MovieDetail}/>
          </main>
        </HashRouter>
      </>
    );
  }
}


export default App;
