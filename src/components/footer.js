import React from 'react';
import Button from './button';

const Footer = props => {
    return(
        <footer>
            <Button clickHandler={props.openModal} buttonName="Додати"/>
        </footer>
    );
};

export default Footer;

