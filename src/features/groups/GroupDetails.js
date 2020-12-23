import React, { useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import MemberList from '../contacts/MemberList';
import GroupDetailsHeader from '../groups/GroupDetailsHeader';
import { togglePaid, removeMember } from '../groups/groupsSlice';
import Layout from '../../components/Layout';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const contactsSelector = state => state.contacts;
const groupsSelector = state => state.groups;

const groupSelection = props =>
    createSelector(
        [contactsSelector, groupsSelector],
        (contacts, groups) => {
            const group = groups[props.match.params.id];
            const members = group
                ? Object.keys(group.members).map(id => contacts[id])
                : [];

            return { group, members };
        }
    );

const GroupDetails = ({ group, members, push, togglePaid, removeMember }) => {
    const itemPaid = useCallback(
        contact => {
            togglePaid({
                memberId: contact.id,
                groupId: group.id,
            });
        },
        [togglePaid, group]
    );

    const toContactDetails = contact => push(`/contacts/${contact.id}`);
    const selection = Object.keys(group.members).filter(
        id => group.members[id].paid
    );

    const memberDelete = useCallback(
        contact => {
            removeMember({ groupId: group.id, memberId: contact.id });
        },
        [group, removeMember]
    );

    if (!group || !group.id) {
        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <div className="contact-details">
                <GroupDetailsHeader group={group} />
                <Typography variant="h6" component="h4">
                    Members
                </Typography>
                <MemberList
                    contacts={members}
                    onItemSelect={toContactDetails}
                    onItemDelete={memberDelete}
                    onItemPaid={itemPaid}
                    selection={selection}
                />
            </div>
        </Layout>
    );
};

const mapDispatchToProps = { push, togglePaid, removeMember };
const mapStateToProps = (state, props) => groupSelection(props)(state);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupDetails);

export const testables = { GroupDetails };
