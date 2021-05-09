import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

const SearchBar = ({
    keyword,
    setKeyword
}) => {
    return (
        <div className="input-group">
            <input
                className="form-control" type="text" name="text-1542372332072" id="text-1542372332072" required="required"
                value={keyword}
                placeholder={"Search for an image"}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <label for="text-1542372332072">Search for an image</label>
            <div className="req-mark"><FontAwesomeIcon icon={faSearch} /></div>
        </div>

    );
}

export default SearchBar