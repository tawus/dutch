import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const HomeMenu = ({ push, className }) => (
    <IconButton
        edge="start"
        className={className}
        color="inherit"
        aria-label="menu"
    >
        <MenuIcon />
    </IconButton>
);

export default HomeMenu;

HomeMenu.propTypes = {
    push: PropTypes.func.isRequired,
    className: PropTypes.string,
};
