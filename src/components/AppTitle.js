import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const AppTitle = ({ className, onHome }) => (
    <Typography variant="h6" className={className}>
        <Button color="inherit" data-testid="app-title" onClick={onHome}>
            Dutch
        </Button>
    </Typography>
);

export default AppTitle;

AppTitle.propTypes = {
    onHome: PropTypes.func.isRequired,
    className: PropTypes.string,
};
