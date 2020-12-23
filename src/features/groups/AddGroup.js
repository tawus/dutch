import React, { useState, useCallback } from 'react';
import ContactsFilter from '../contacts/ContactsFilter';
import ContactList from '../contacts/ContactList';
import { addGroup } from './groupsSlice';
import { setFilter } from '../contacts/contactsFilterSlice';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { selectFilteredContacts } from '../contacts/Contacts';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Layout from '../../components/Layout';

const AddGroup = ({ addGroup, contacts, filter, setFilter, push }) => {
    const [group, setGroup] = useState(initGroup());
    const [activeStep, setActiveStep] = useState(1);
    const groupChange = key => e =>
        setGroup({ ...group, [key]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        addGroup(group);
        push('/groups');
    };

    const onToggle = useCallback(
        (contact, selected) => {
            setGroup(group => {
                //TODO: Replace by sets.
                const members = group.members.filter(id => id !== contact.id);
                if (selected) {
                    members.push(contact.id);
                }

                return {
                    ...group,
                    members,
                };
            });
        },
        [setGroup]
    );

    return (
        <Layout>
            <form className="group-add" onSubmit={handleSubmit}>
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>Group Details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Create Group</StepLabel>
                    </Step>
                </Stepper>
                {activeStep === 1 ? (
                    <React.Fragment>
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
                                required
                                fullWidth
                                onChange={groupChange('billAmount')}
                            />
                        </div>
                    </React.Fragment>
                ) : (
                    <Paper className="group-contacts-field">
                        <ContactsFilter
                            filterText={filter.text}
                            onFilterChange={setFilter}
                        />
                        <ContactList
                            contacts={contacts}
                            showSelection={true}
                            selection={group.members}
                            onToggle={onToggle}
                        />
                    </Paper>
                )}
                <div className="button-panel">
                    {activeStep === 1 ? (
                        <Button
                            data-testid="group-next"
                            className="next"
                            color="primary"
                            variant="contained"
                            onClick={() => setActiveStep(2)}
                            type="button"
                            disabled={
                                !(group.name.trim() && group.billAmount > 0.0)
                            }
                        >
                            Next
                        </Button>
                    ) : (
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
                    )}
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
    members: [],
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
    contacts: selectFilteredContacts(state),
    filter: state.contactsFilter,
});

const mapDispatchToProps = { setFilter, addGroup, push };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddGroup);

export const testables = { AddGroup };
