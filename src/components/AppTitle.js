import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const AppTitle = ({ className }) => (
    <Typography variant="h6" className={className} data-testid="app-title">
        Dutch
    </Typography>
);

export default AppTitle;

AppTitle.propTypes = {
    className: PropTypes.string,
};
