import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ContactIcon from '@material-ui/icons/Person';
import ContactAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { resetStorage } from '../app/localStorage';
import ResetIcon from '@material-ui/icons/RotateLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { clearGroups } from '../features/groups/groupsSlice';
import { clearContacts } from '../features/contacts/contactsSlice';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const HomeMenu = ({ push, className, clearGroups, clearContacts }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const resetState = () => {
        setAnchorEl(null);
        clearGroups();
        clearContacts();
        resetStorage();
        push('/');
        window.location.reload();
    };

    return (
        <div>
            <IconButton
                edge="start"
                className={className}
                color="inherit"
                aria-label="menu"
                onClick={e => setAnchorEl(e.currentTarget)}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="main-menu"
                data-testid="main-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => push('/groups')}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </MenuItem>

                <MenuItem onClick={() => push('/contacts/new')}>
                    <ListItemIcon>
                        <ContactIcon />
                    </ListItemIcon>
                    <ListItemText primary="New Contact" />
                </MenuItem>
                <MenuItem onClick={() => push('/contacts')}>
                    <ListItemIcon>
                        <ContactAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contacts" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => push('/groups/new')}>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="New Group" />
                </MenuItem>
                <MenuItem onClick={() => push('/groups')}>
                    <ListItemIcon>
                        <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                </MenuItem>
                <Divider />
                <MenuItem
                    data-testid="main-menu-reset-storage"
                    className="main-menu-reset-storage"
                    onClick={resetState}
                >
                    <ListItemIcon>
                        <ResetIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Reset"
                        secondary="This would reset the application"
                    />
                </MenuItem>
            </Menu>
        </div>
    );
};

const mapDispatchToProps = { clearGroups, clearContacts, push };

export default connect(
    null,
    mapDispatchToProps
)(HomeMenu);

HomeMenu.propTypes = {
    className: PropTypes.string,
};

export const testables = { HomeMenu };
