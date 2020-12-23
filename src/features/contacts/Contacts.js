import React from 'react';
import ContactList from './ContactList';
import ContactsFilter from './ContactsFilter';
import { setFilter } from './contactsFilterSlice';
import { removeContact } from './contactsSlice';
import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import HomeLayout from '../../components/HomeLayout';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const selectContacts = state => state.contacts;
const selectFilter = state => state.contactsFilter;

const nameSorter = (x, y) => {
    const xname = x.name.toUpperCase();
    const yname = y.name.toUpperCase();
    return xname < yname ? -1 : xname > yname ? 1 : 0;
};

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        contacts = Object.values(contacts);
        return (!filter.text
            ? contacts
            : contacts.filter(c =>
                  c.name.toLowerCase().includes(filter.text.toLowerCase())
              )
        ).sort(nameSorter);
    }
);

const Contacts = ({ setFilter, removeContact, contacts, filter, push }) => {
    return (
        <HomeLayout tab="contacts" push={push}>
            <div className="contacts">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <ContactsFilter
                            onFilterChange={text => setFilter(text)}
                            filterText={filter.text}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            data-testid="add-contact-nav-btn"
                            onClick={() => push('/contacts/new')}
                            variant="contained"
                            color="primary"
                        >
                            Add Contact
                        </Button>
                    </Grid>
                </Grid>
                <ContactList
                    contacts={contacts}
                    showSelection={false}
                    onDelete={contact => removeContact(contact.id)}
                    onItemSelect={contact => push(`/contacts/${contact.id}`)}
                />
            </div>
        </HomeLayout>
    );
};

const mapDispatchToProps = { setFilter, removeContact, push };
const mapStateToProps = state => ({
    contacts: selectFilteredContacts(state),
    filter: state.contactsFilter,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);

export const testables = {
    Contacts,
    nameSorter,
};
