import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const GroupsFilter = ({ onFilterChange, filterText }) => {
    return (
        <TextField
            label="Search Group"
            fullWidth
            data-testid="group-query"
            value={filterText}
            onChange={e => onFilterChange(e.target.value)}
        />
    );
};

export default GroupsFilter;

GroupsFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filterText: PropTypes.string,
};
