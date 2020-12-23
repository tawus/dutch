import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ContactsFilter = ({ onFilterChange, filterText }) => {
    return (
        <TextField
            label="Search Contact"
            data-testid="contact-filter"
            value={filterText}
            fullWidth={true}
            onChange={e => onFilterChange(e.target.value)}
        />
    );
};

export default ContactsFilter;

ContactsFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filterText: PropTypes.string,
};
