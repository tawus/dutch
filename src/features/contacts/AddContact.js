import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addContact } from './contactsSlice';
import { push } from 'connected-react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Layout from '../../components/Layout';
import Welcome from '../../components/Welcome';

const AddContact = ({ addContact, firstContact, push }) => {
    const [contact, setContact] = useState(initContact());
    const contactChange = key => e =>
        setContact({ ...contact, [key]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        addContact(contact);
        push('/contacts');
    };

    return (
        <Layout>
            {firstContact ? <Welcome /> : null}
            <div className="add-contact form">
                <form onSubmit={handleSubmit} data-testid="contact-form">
                    <TextField
                        label={firstContact ? 'Your Name' : 'Contact Name'}
                        fullWidth
                        value={contact.name}
                        onChange={contactChange('name')}
                        placeholder="e.g. John Smith"
                        required
                        data-testid="contact-name"
                        name="name"
                    />
                    <div className="button-panel">
                        <Button
                            variant="contained"
                            color="primary"
                            data-testid="contact-save"
                            className="submit-btn btn"
                            type="submit"
                            disabled={!isValid(contact)}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

const initContact = () => ({
    name: '',
});

const isValid = contact => {
    return !!(contact && contact.name && contact.name.trim());
};

const mapStateToProps = state => ({
    firstContact: !Object.keys(state.contacts.data).length,
});

const mapDispatchToProps = { addContact, push };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddContact);

export const testables = {
    AddContact,
};
