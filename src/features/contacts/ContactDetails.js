import React from 'react';
import GroupList from '../groups/GroupList';
import ContactDetailsHeader from './ContactDetailsHeader';
import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Layout from '../../components/Layout';
import { Redirect } from 'react-router-dom';

const contactSelector = state => state.contacts;
const groupsSelector = state => state.groups;

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

const ContactDetails = ({ groups, contact, push }) => {
    const toGroupDetails = group => push(`/groups/${group.id}`);
    if (!contact.id) {
        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <div className="contact-details">
                <ContactDetailsHeader contact={contact} groups={groups} />
                <GroupList groups={groups} onItemSelect={toGroupDetails} />
            </div>
        </Layout>
    );
};

const mapDispatchToProps = { push };
const mapStateToProps = (state, props) => contactSelection(props)(state);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactDetails);

export const testables = { ContactDetails };
