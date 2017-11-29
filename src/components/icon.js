import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => {
    return (
        <i onClick={props.clickHandler} className="material-icons">{props.name}</i>
    );
};

Icon.propTypes = {
    name : PropTypes.string.isRequired,
    clickHandler : PropTypes.func
};

Icon.defaultProps = {

};

export default Icon;