import React from 'react';
import PropTypes from 'prop-types';

const Search = props => {
    return (
        <div className="search">
            <i className="material-icons">search</i>
            <input type="search" placeholder={props.placeholder}/>
        </div>
    );
};

Search.propTypes = {
    placeholder : PropTypes.string
};

export default Search;