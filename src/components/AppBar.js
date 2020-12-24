import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AppTitle from './AppTitle';
import HomeMenu from './HomeMenu';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const AppBar = ({ onSettings, onHome, userName }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar>
                    <HomeMenu />
                    <AppTitle className={classes.title} onHome={onHome} />
                    <Button
                        color="inherit"
                        onClick={onSettings}
                        data-testid="settings-btn"
                        className={classes.menuButton}
                    >
                        {userName}
                    </Button>
                </Toolbar>
            </MuiAppBar>
        </div>
    );
};

export default AppBar;

AppBar.propTypes = {
    onHome: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};
