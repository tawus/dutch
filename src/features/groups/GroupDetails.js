import React, { useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import MemberList from '../contacts/MemberList';
import GroupDetailsHeader from '../groups/GroupDetailsHeader';
import { togglePaid, removeMember, removeGroup } from '../groups/groupsSlice';
import Layout from '../../components/Layout';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import AlertButton from '../../components/AlertButton';
import GroupBreadcrumbs from './GroupBreadcrumbs';

const contactsSelector = state => state.contacts.data;
const groupsSelector = state => state.groups.data;

const groupSelection = props =>
    createSelector(
        [contactsSelector, groupsSelector],
        (contacts, groups) => {
            const group = groups[props.match.params.id];
            if (!group) {
                return { group: {}, members: [] };
            }

            const members = Object.keys(group.members).map(id => contacts[id]);
            return { group, members };
        }
    );

const GroupDetails = ({
    group,
    members,
    push,
    togglePaid,
    removeGroup,
    removeMember,
}) => {
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
    const selection = Object.keys(group.members || []).filter(
        id => group.members[id].paid
    );

    const memberDelete = useCallback(
        contact => {
            removeMember({ groupId: group.id, memberId: contact.id });
        },
        [group, removeMember]
    );

    const removeGroupAndRedirect = useCallback(() => {
        removeGroup(group.id);
        push('/groups');
    }, [removeGroup, push, group]);

    if (!group.id) {
        return <Redirect to="/" />;
    }

    return (
        <Layout>
            <div className="contact-details">
                <GroupBreadcrumbs name={group.name} />
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
                <AlertButton
                    buttonText="Delete Group"
                    text="Are you sure you want to delete this group?"
                    title="Delete Group"
                    buttonProps={{
                        color: 'secondary',
                        variant: 'contained',
                        fullWidth: true,
                    }}
                    onConfirm={removeGroupAndRedirect}
                />
            </div>
        </Layout>
    );
};

const mapDispatchToProps = { push, togglePaid, removeMember, removeGroup };
const mapStateToProps = (state, props) => groupSelection(props)(state);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupDetails);

export const testables = { GroupDetails };
