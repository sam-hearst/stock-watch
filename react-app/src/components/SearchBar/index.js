import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
    const history = useHistory();
    const [searchValue, setSearchValue ] = useState('')

    function onSubmit(e) {
        e.preventDefault();
        history.push(`/stocks/${searchValue}`);
        setSearchValue('');
    }

    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    return (
        <div className="search-container">
            <form onSubmit={onSubmit}>
                <input
                    style={BarStyling}
                    className="search-input"
                    type="text"
                    value={searchValue}
                    placeholder="Start your search"
                    onChange={(e) => setSearchValue(e.target.value)}
                >
                </input>
                <button id="search-button" type="submit">
                    <i className="fas fa-search" />
                </button>
            </form>
        </div>
    );
}


export default SearchBar
