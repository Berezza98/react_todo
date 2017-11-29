import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
    return (
        <button onClick={props.clickHandler} className={`add_button ${props.className ? props.className : ''}`}>{props.buttonName}</button>
    );
};

Button.propTypes = {
    buttonName : PropTypes.string.isRequired,
    className : PropTypes.string,
    clickHandler : PropTypes.func.isRequired
};

export default Button;