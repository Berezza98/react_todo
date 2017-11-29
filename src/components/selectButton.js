import React from 'react';
import PropTypes from 'prop-types';

const SelectButton = props => {
    return (
        <button className={props.active ? "active" : ""}>{props.name}</button>
    );
};

SelectButton.propTypes = {
    active : PropTypes.bool,
    name: PropTypes.string.isRequired
};

SelectButton.defaultProps = {
    active : false
};

export default SelectButton;