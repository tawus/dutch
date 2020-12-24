import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatter, currencyFormatter } from '../../utils/Locale';
import Chip from '@material-ui/core/Chip';

const GroupItemDescription = ({ group }) => {
    const memberCount = Object.keys(group.members).length;

    //TODO: Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
    return (
        <span>
            {group.archived ? (
                <Chip label="Archived" component="span" />
            ) : (
                <Chip color="secondary" label="Active" component="span" />
            )}{' '}
            {memberCount} Member(s), Amount{' '}
            {currencyFormatter.format(group.billAmount)}, Created :{' '}
            {dateFormatter.formatDate(group.creationDate)}
        </span>
    );
};

export default GroupItemDescription;

GroupItemDescription.propTypes = {
    group: PropTypes.object.isRequired,
};
