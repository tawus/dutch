import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

export default function GroupBreadcrumbs({ name }) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/groups">
                Groups
            </Link>
            <Typography color="textPrimary">{name}</Typography>
        </Breadcrumbs>
    );
}

GroupBreadcrumbs.propTypes = {
    name: PropTypes.string.isRequired,
};
