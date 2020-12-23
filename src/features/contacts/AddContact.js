import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addContact } from './contactsSlice';
import { push } from 'connected-react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Layout from '../../components/Layout';

const AddContact = ({ addContact, push }) => {
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
            <div className="add-contact form">
                <form onSubmit={handleSubmit} data-testid="contact-form">
                    <TextField
                        fullWidth
                        value={contact.name}
                        onChange={contactChange('name')}
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

export default connect(
    null,
    { addContact, push }
)(AddContact);

export const testables = {
    AddContact,
};
