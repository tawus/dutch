import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MemberMenu from './MemberMenu';
import PaidIcon from '@material-ui/icons/CheckBox';
import UnpaidIcon from '@material-ui/icons/CheckBoxOutlineBlank';

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
        <List className="member-list" data-testid="contact-list">
            {contacts.map(contact => (
                <ListItem
                    key={contact.id}
                    data-testid="contact-item"
                    button
                    className="contact-item"
                    disableRipple
                    onClick={() => onItemPaid(contact)}
                >
                    <ListItemIcon>
                        {isSelected(contact) ? (
                            <PaidIcon data-testid="paid-icon" />
                        ) : (
                            <UnpaidIcon
                                color="primary"
                                data-testid="paid-icon"
                            />
                        )}
                    </ListItemIcon>
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
