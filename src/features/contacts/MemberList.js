import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MemberMenu from './MemberMenu';

const MemberList = ({
    contacts,
    selection,
    onItemSelect,
    onItemPaid,
    onItemDelete,
}) => {
    const isSelected = contact =>
        Boolean(selection.find(id => id === contact.id));
    return (
        <List className="contact-list" data-testid="contact-list">
            {(contacts || []).map(contact => (
                <ListItem
                    key={contact.id}
                    data-testid="contact-item"
                    button
                    className="contact-item"
                >
                    <ListItemText primary={contact.name} />
                    <ListItemSecondaryAction>
                        <MemberMenu
                            onDetails={onItemSelect}
                            onDelete={onItemDelete}
                            onTogglePaid={onItemPaid}
                            contact={contact}
                            isPaid={isSelected(contact)}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default MemberList;

MemberList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.any).isRequired,
    selection: PropTypes.arrayOf(PropTypes.string),
    onItemSelect: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemPaid: PropTypes.func.isRequired,
};
