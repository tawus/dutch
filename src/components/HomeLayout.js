import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GroupIcon from '@material-ui/icons/Group';
import ContactsIcon from '@material-ui/icons/Contacts';
import Layout from './Layout';

const HomeLayout = ({ push, tab, children }) => {
    const navChanged = (e, newTab) => push(`/${newTab}`);
    return (
        <Layout>
            <BottomNavigation value={tab} onChange={navChanged}>
                <BottomNavigationAction
                    data-testid="group-tab"
                    label="Groups"
                    value="groups"
                    icon={<GroupIcon />}
                />
                <BottomNavigationAction
                    data-testid="contact-tab"
                    label="Contacts"
                    value="contacts"
                    icon={<ContactsIcon />}
                />
            </BottomNavigation>

            <div className="home-layout-body">{children}</div>
        </Layout>
    );
};

export default HomeLayout;

HomeLayout.propTypes = {
    push: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export const testables = { HomeLayout };
