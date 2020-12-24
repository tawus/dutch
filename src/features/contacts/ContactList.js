import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

const ContactList = ({ contacts, onItemSelect }) => {
    return (
        <List className="contact-list" data-testid="contact-list">
            {contacts.map(contact => (
                <ListItem
                    button
                    key={contact.id}
                    data-testid="contact-item"
                    className="contact-item"
                    onClick={() => onItemSelect && onItemSelect(contact)}
                >
                    <ListItemIcon>
                        <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={contact.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.any).isRequired,
    onItemSelect: PropTypes.func,
};
