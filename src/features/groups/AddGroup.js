import React, { useState, useCallback } from 'react';
import { addGroup } from './groupsSlice';
import { setFilter } from '../contacts/contactsFilterSlice';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Layout from '../../components/Layout';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddGroup = ({ addGroup, contacts, push }) => {
    const [group, setGroup] = useState(initGroup());
    const groupChange = key => e =>
        setGroup({ ...group, [key]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        addGroup(group);
        push('/groups');
    };

    const onMemberSet = useCallback(
        contacts => {
            setGroup(group => {
                return {
                    ...group,
                    members: contacts.map(c => c.id),
                };
            });
        },
        [setGroup]
    );

    const me = contacts.find(c => c.id === '1');

    return (
        <Layout>
            <form className="group-add" onSubmit={handleSubmit}>
                <div className="line-field">
                    <TextField
                        label="Group Name"
                        name="name"
                        data-testid="group-name"
                        value={group.name}
                        required
                        fullWidth
                        onChange={groupChange('name')}
                    />
                </div>
                <div className="line-field">
                    <TextField
                        label="Bill Amount"
                        name="billAmount"
                        data-testid="group-bill-amount"
                        value={group.billAmount}
                        inputProps={{ style: { textAlign: 'right' } }}
                        required
                        fullWidth
                        onChange={groupChange('billAmount')}
                    />
                </div>
                <div className="line-field">
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={contacts}
                        defaultValue={me ? [me] : []}
                        getOptionSelected={(option, value) =>
                            option.id === value.id
                        }
                        getOptionLabel={option => option.name}
                        onChange={(_, contact) => onMemberSet(contact)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Contacts"
                                placeholder="e.g. John Smith"
                                data-testid="contact-selector"
                            />
                        )}
                    />
                </div>
                <div className="button-panel">
                    <Button
                        data-testid="group-save"
                        className="submit-btn btn"
                        type="submit"
                        disabled={!isValid(group)}
                        color="primary"
                        variant="contained"
                    >
                        Save
                    </Button>
                    <Button
                        data-testid="group-add-cancel"
                        color="secondary"
                        variant="contained"
                        type="button"
                        onClick={() => push('/groups')}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Layout>
    );
};

const initGroup = () => ({
    name: '',
    members: ['1'], //Owner.
    billAmount: 0.0,
});

const isValid = group =>
    group &&
    group.name &&
    group.name.trim() &&
    group.billAmount &&
    Number.parseFloat(group.billAmount) > 0.0 &&
    group.members.length > 0;

const mapStateToProps = state => ({
    contacts: Object.values(state.contacts.data),
});

const mapDispatchToProps = { setFilter, addGroup, push };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGroup);

export const testables = { AddGroup };
