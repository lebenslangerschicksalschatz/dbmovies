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
  constructor(props){
    super(props);
    this.state={
      menuOpen:false,
    }
  }

  handleMenuClick(e) {
    this.setState({menuOpen:!this.state.menuOpen});
    e.stopPropagation();
  }
  
  handleLinkClick(e) {
    this.setState({menuOpen: false});
    e.stopPropagation();
  }

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
                  {/* HAMBURGER MENU */}
                  <div className={this.state.menuOpen ? "open oppenned":"open"} onClick={(e) => this.handleMenuClick(e)}>
                    <span className="cls" onClick={(e) => this.handleLinkClick(e)}></span>
                    <span>
                        <ul className="sub-menu ">
                            <li><NavLink exact to="/" onClick={(e) => this.handleLinkClick(e)}>Home</NavLink></li>
                            <li><NavLink to="/Watchlist" onClick={(e) => this.handleLinkClick(e)}>Watchlist</NavLink></li>
                            <li><NavLink to="/AlreadySeen" onClick={(e) => this.handleLinkClick(e)}>Already Seen</NavLink></li>
                            <li><NavLink to="/Top250" onClick={(e) => this.handleLinkClick(e)}>Top250</NavLink></li>
                        </ul>
                    </span>
                    <span className="cls" onClick={(e) => this.handleLinkClick(e)}></span>
                  </div>
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
