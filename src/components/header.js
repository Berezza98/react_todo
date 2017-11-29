import React from "react";
import PropTypes from 'prop-types';

const Header = props => {
    return (
        <div className="app_name">
            <h2>{props.appName}</h2>
        </div>
    );
};

Header.propTypes = {
    appName : PropTypes.string
};

Header.defaultProps = {
    appName : "Органайзер"
}

export default Header;