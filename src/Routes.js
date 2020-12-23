import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Groups from './features/groups/Groups';
import Contacts from './features/contacts/Contacts';
import AddContact from './features/contacts/AddContact';
import AddGroup from './features/groups/AddGroup';
import GroupDetails from './features/groups/GroupDetails';
import ContactDetails from './features/contacts/ContactDetails';

const Routes = () => (
    <Switch>
        <Route path="/contacts/new" component={AddContact} exact />
        <Route path="/contacts/:id" component={ContactDetails} exact />
        <Route path="/contacts" component={Contacts} exact />
        <Route path="/groups/new" component={AddGroup} exact />
        <Route path="/groups/:id" component={GroupDetails} exact />
        <Route path="/" component={Groups} />
    </Switch>
);

export default Routes;
