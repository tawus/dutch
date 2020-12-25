import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

export default function ContactBreadcrumbs({ name }) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" href="/contacts">
                Contacts
            </Link>
            <Typography color="textPrimary">{name}</Typography>
        </Breadcrumbs>
    );
}

ContactBreadcrumbs.propTypes = {
    name: PropTypes.string.isRequired,
};
