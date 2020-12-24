import React from 'react';
import AppIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const Welcome = () => (
    <Paper className="welcome">
        <Typography variant="h2" component="h2">
            <AppIcon fontSize="large" /> Dutch
        </Typography>
        <Typography variant="body1">Please Enter your Name</Typography>
    </Paper>
);

export default Welcome;
