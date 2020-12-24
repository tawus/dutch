import React from 'react';
import { Switch } from 'react-router-dom';
import Groups from './features/groups/Groups';
import Contacts from './features/contacts/Contacts';
import AddContact from './features/contacts/AddContact';
import AddGroup from './features/groups/AddGroup';
import GroupDetails from './features/groups/GroupDetails';
import ContactDetails from './features/contacts/ContactDetails';
import Page from './components/Page';

const Routes = () => (
    <Switch>
        <Page
            path="/contacts/new"
            component={AddContact}
            exact
            title={title('Create New Contact')}
        />
        <Page
            path="/contacts/:id"
            component={ContactDetails}
            exact
            title={title('Contact Details')}
        />
        <Page
            path="/contacts"
            component={Contacts}
            exact
            title={title('Contacts')}
        />
        <Page
            path="/groups/new"
            component={AddGroup}
            exact
            title={title('Create New Group')}
        />
        <Page
            path="/groups/:id"
            component={GroupDetails}
            exact
            title={title('Group Details')}
        />
        <Page path="/" component={Groups} title={title('Home')} />
    </Switch>
);

export default Routes;

const title = text => `DUTCH: ${text}`;
