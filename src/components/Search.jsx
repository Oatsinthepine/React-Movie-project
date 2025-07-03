import React from 'react';

const Search = (props) => {
    return (
        <div className="search">
            <div>
                <img
                    src="/search.png"
                    alt="Search Icon"
                    style={{ cursor: 'pointer' }}
                    onClick={props.onSearch}
                />
                <input
                    type='text'
                    placeholder="Search for a movie..."
                    value={props.searchTerm}
                    onChange={(event) => props.setSearchTerm(event.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') props.onSearch();
                    }}
                />
            </div>
        </div>
    )
}

export default Search; // Exporting the Search component