import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import { URL_SEARCH, API_KEY, URL_IMG, IMG_SIZE_XSMALL, DEFAULT_POSTER } from '../const';


const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => {
    return (    
    <div className="suggestion">
        <div className="suggestion__pic"> 
            {
                suggestion.poster_path !== null
                ? <img src={URL_IMG + IMG_SIZE_XSMALL + suggestion.poster_path} alt="Movie Poster"/>    
                : <img src={DEFAULT_POSTER} alt="Movie Poster"/>             
            }
        </div>
        <div className="suggestion__content">
            <h3 className="suggestion__title">{suggestion.title}</h3>
            <span>
                {
                (suggestion.release_date === "" || suggestion.release_date === undefined)
                ? ""
                : suggestion.release_date.substring(0,4)
                }
            </span>
        </div>
    </div>
    );
};

class WatchlistInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            noResult: false,
            isLoading: false
        };
    }

    getSuggestions = value => {
        const escapedValue = encodeURIComponent(value.trim());
        const url = `${URL_SEARCH + API_KEY}&query=${escapedValue}`;
        let suggestions = [];
        this.setState({
            isLoading: true
        });
        if(value.trim().length > 2){
            fetch(url)
                .then(data => data.json())
                .then(
                    (data) => {
                        if(data.results){
                            suggestions = data.results;
                            this.setState({
                                suggestions: suggestions,
                                noResults: suggestions.length === 0,
                                isLoading: false
                            });
                        }else{
                            this.setState({
                                suggestions: [],
                                noResults: true,
                                isLoading: false
                            });
                        }
                    },
                    (error) => {
                        console.log(error.Error);
                        this.setState({
                            suggestions: [],
                            noResults: false,
                            isLoading: false
                        });
                    }
                );
        }
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    debouncedSuggestions = debounce((value) => {
        this.getSuggestions(value);
    }, 500);

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            isLoading: true
        });
        this.debouncedSuggestions(value);
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
            noResults: false,
            isLoading: false
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.setState({
            suggestions: [],
            value: '',
            noResults: false,
            isLoading: false
        });
        this.props.addWatchlistItem( suggestion );
    }

    render() {
        const { value, suggestions, noResults, isLoading } = this.state;
        const inputProps = {
            placeholder: 'type in something...',
            value,
            onChange: this.onChange,            
            id: 'watchlist-suggest-input'
        };
        return (
            <div className="watchlist-input">
                <label className="watchlist-input__label" htmlFor="watchlist-suggest-input">Search to add Movies to your Watchlist:</label>
                <div className="watchlist-input__control">
                    {
                        isLoading 
                        ? (<div className="watchlist-input__loader">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" role="img" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"/>
                            </svg>
                        </div>)
                        : ""                        
                    }
                    <Autosuggest
                        suggestions={suggestions.slice(0, 10)}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        focusInputOnSuggestionClick={false}
                    />
                    {
                        noResults ? (<div className="no-suggestions">Sorry, no results :(</div>) : null
                    }
                </div>
            </div>
        );
    }
}

export default WatchlistInput;