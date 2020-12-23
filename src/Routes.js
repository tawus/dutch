import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Groups from './features/groups/Groups';
import Contacts from './features/contacts/Contacts';
import AddContact from './features/contacts/AddContact';

const Routes = () => (
    <Switch>
        <Route path="/contacts/new" component={AddContact} />
        <Route path="/contacts" component={Contacts} exact />
        <Route path="/" component={Groups} />
    </Switch>
);

export default Routes;
