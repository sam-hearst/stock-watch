import React, { useState } from 'react'

const SearchBar = () => {
    const [searchValue, setSearchValue ] = useState()

    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    return (
        <input
            style={BarStyling}
            value={searchValue}
            placeholder={"Search"}
            onChange={(e) => setSearchValue(e.target.value)}
        />
    );
}


export default SearchBar
