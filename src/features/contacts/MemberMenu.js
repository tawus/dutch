import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PayIcon from '@material-ui/icons/Payment';

const MemberMenu = ({ contact, onDelete, onDetails, isPaid, onTogglePaid }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const withClose = callback => () => {
        setAnchorEl(null);
        callback(contact);
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                data-testid="contact-menu-trigger"
                className="contact-menu-trigger"
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                data-testid="contact-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={withClose()}
            >
                <MenuItem
                    data-testid="contact-menu-paid"
                    className="contact-menu-paid"
                    onClick={withClose(onTogglePaid)}
                >
                    <ListItemIcon>
                        <PayIcon />
                    </ListItemIcon>
                    {isPaid ? 'Mark as unpaid' : 'Mark as paid'}
                </MenuItem>
                <MenuItem
                    data-testid="contact-menu-details"
                    className="contact-menu-details"
                    onClick={withClose(onDetails)}
                >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    Contact Details
                </MenuItem>
                <MenuItem
                    data-testid="contact-menu-delete"
                    className="contact-menu-delete"
                    onClick={withClose(onDelete)}
                >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    Delete Contact From Group
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default MemberMenu;

MemberMenu.propTypes = {
    contact: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onDetails: PropTypes.func.isRequired,
    isPaid: PropTypes.bool.isRequired,
    onTogglePaid: PropTypes.func.isRequired,
};
