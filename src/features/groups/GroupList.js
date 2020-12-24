import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import GroupIcon from '@material-ui/icons/Group';
import DoneIcon from '@material-ui/icons/Done';
import GroupItemDescription from './GroupItemDescription';
import Badge from '@material-ui/core/Badge';

const GroupList = ({ groups, onItemSelect, secondaryAction }) => {
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
                        <Badge
                            color="secondary"
                            invisible={
                                group.archived || paidMembers(group) === 0
                            }
                            badgeContent={paidMembers(group)}
                        >
                            {group.archived ? (
                                <DoneIcon />
                            ) : (
                                <GroupIcon color="primary" />
                            )}
                        </Badge>
                    </ListItemIcon>
                    <ListItemText
                        primary={group.name}
                        secondary={<GroupItemDescription group={group} />}
                    />

                    <ListItemSecondaryAction>
                        {secondaryAction ? secondaryAction(group) : <span />}
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default GroupList;

GroupList.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.any).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    secondaryAction: PropTypes.func,
};

const paidMembers = group =>
    Object.values(group.members).filter(m => m.paid).length;
