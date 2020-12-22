import React from 'react';
import AppBar from '@material-ui/core/AppBar';
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

const ApplicationBar = ({ push, userName }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <HomeMenu push={push} />
                    <AppTitle className={classes.title} />
                    <Button
                        color="inherit"
                        onClick={() => push('/settings')}
                        data-testid="settings-btn"
                        className={classes.menuButton}
                    >
                        {userName}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ApplicationBar;

ApplicationBar.propTypes = {
    push: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};
