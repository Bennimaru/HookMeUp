import React, { useState } from 'react'

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const invokeSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input value={searchValue} onChange={handleSearchInput} type="text" />
            <input onClick={invokeSearchFunction} type="submit" value="SEARCH" />
        </form>
    );
}

export default Search