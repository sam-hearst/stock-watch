import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./SearchBar.css"

const SearchBar = () => {
    const history = useHistory();
    const [searchValue, setSearchValue ] = useState('')

    function onSubmit(e) {
        e.preventDefault();
        history.push(`/stocks/${searchValue}`);
        setSearchValue('');
    }

    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem", paddingLeft: "25px" };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={onSubmit}>
                <div id="search-button" type="submit">
                    <i className="fas fa-search" />
                </div>
                <input
                    style={BarStyling}
                    className="search-input"
                    type="text"
                    value={searchValue}
                    placeholder="Start your search"
                    onChange={(e) => setSearchValue(e.target.value)}
                >
                </input>

            </form>
        </div>
    );
}


export default SearchBar
