import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
    return (
        <i onClick={props.onClick} className="material-icons">{props.initiallyChecked ? "check_box" : "check_box_outline_blank"}</i>
    );
};

Checkbox.propTypes = {
    initiallyChecked : PropTypes.bool.isRequired
};

export default Checkbox;