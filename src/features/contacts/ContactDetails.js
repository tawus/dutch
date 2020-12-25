import React, { useCallback } from 'react';
import GroupList from '../groups/GroupList';
import ContactDetailsHeader from './ContactDetailsHeader';
import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Layout from '../../components/Layout';
import { Redirect } from 'react-router-dom';
import PaidIcon from '@material-ui/icons/CheckBox';
import UnpaidIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { removeContact } from './contactsSlice';
import AlertButton from '../../components/AlertButton';
import ContactBreadcrumbs from './ContactBreadcrumbs';

const contactSelector = state => state.contacts.data;
const groupsSelector = state => state.groups.data;

const contactSelection = props =>
    createSelector(
        [contactSelector, groupsSelector],
        (contacts, groups) => {
            const contact = contacts[props.match.params.id];
            if (!contact) {
                return { contact: {}, groups: [] };
            }

            const contactGroups = Object.values(groups).filter(
                g => g.members[contact.id]
            );

            return {
                contact,
                groups: contactGroups,
            };
        }
    );

const ContactDetails = ({ groups, contact, push, removeContact }) => {
    const toGroupDetails = group => push(`/groups/${group.id}`);

    const isPaid = group => {
        const member = Object.values(group.members).find(
            m => m.id === contact.id
        );
        return member && member.paid;
    };

    const removeContactAndRedirect = useCallback(() => {
        removeContact(contact.id);
        push('/contacts');
    }, [removeContact, push, contact]);

    if (!contact.id) {
        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <div className="contact-details">
                <ContactBreadcrumbs name={contact.name} />
                <ContactDetailsHeader contact={contact} groups={groups} />
                <GroupList
                    groups={groups}
                    onItemSelect={toGroupDetails}
                    secondaryAction={group =>
                        isPaid(group) ? <PaidIcon /> : <UnpaidIcon />
                    }
                />
                <AlertButton
                    buttonText="Delete Contact"
                    text="Are you sure you want to delete this contact ? "
                    title="Delete Contact"
                    buttonProps={{
                        color: 'secondary',
                        variant: 'contained',
                        fullWidth: true,
                        disabled: !!groups.length || contact.id === '1',
                    }}
                    onConfirm={removeContactAndRedirect}
                />
            </div>
        </Layout>
    );
};

const mapDispatchToProps = { push, removeContact };
const mapStateToProps = (state, props) => contactSelection(props)(state);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetails);

export const testables = { ContactDetails };
