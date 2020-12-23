import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';

const GroupList = ({ groups, onItemSelect }) => {
    return (
        <List
            className="group-list"
            data-testid="group-list"
            aria-label="groups"
        >
            {(groups || []).map(group => (
                <ListItem
                    key={group.id}
                    button
                    onClick={() => onItemSelect(group)}
                    data-testid="group-item"
                    className={`group-item ${
                        group.archived ? 'archived' : 'active'
                    }`}
                >
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={group.name}
                        secondary={`${
                            Object.keys(group.members).length
                        } Member(s)`}
                    ></ListItemText>
                </ListItem>
            ))}
        </List>
    );
};

export default GroupList;

GroupList.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.any).isRequired,
    onItemSelect: PropTypes.func.isRequired,
};
