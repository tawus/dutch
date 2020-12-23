import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ContactMenu from './ContactMenu';

const ContactList = ({
    contacts,
    showSelection,
    onToggle,
    selection,
    onItemSelect,
    onDelete,
}) => {
    const isSelected = contact =>
        Boolean(selection.find(id => id === contact.id));
    return (
        <List className="contact-list" data-testid="contact-list">
            {(contacts || []).map(contact => (
                <ListItem key={contact.id} button className="contact-item">
                    {showSelection ? (
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={isSelected(contact)}
                                onChange={e =>
                                    onToggle(contact, e.target.checked)
                                }
                                disableRipple
                            />
                        </ListItemIcon>
                    ) : null}
                    <ListItemText primary={contact.name} />
                    {!showSelection ? (
                        <ListItemSecondaryAction>
                            <ContactMenu
                                onDetails={onItemSelect}
                                onDelete={onDelete}
                                contact={contact}
                            />
                        </ListItemSecondaryAction>
                    ) : null}
                </ListItem>
            ))}
        </List>
    );
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.any).isRequired,
    showSelection: PropTypes.bool.isRequired,
    onToggle: PropTypes.func,
    selection: PropTypes.arrayOf(PropTypes.string),
    onItemSelect: PropTypes.func,
    onDelete: PropTypes.func,
};
