import React from 'react';
/* import Autosuggest from 'react-autosuggest' */

const SearchArea = (props) => {
    return (
        <div className="search-box">
            <form onSubmit={props.handleSubmit}>
                <input 
                    onChange={props.handleChange}
                    type="text"
                    placeholder="What are you looking for?"
                    minLength={3}
                />           
                <select className="sort-box" defaultValue="Sort" onChange={props.handleSort}>
                    <option disabled value="Sort">Sort</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="RatingAsc">By Rating Asc</option>
                    <option value="RatingDesc">By Rating Desc</option>
                </select>
            </form>
        </div>        
    )    
}

export default SearchArea;