import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import HomeLayout from '../../components/HomeLayout';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GroupsFilter from './GroupsFilter';
import GroupList from './GroupList';
import { createSelector } from '@reduxjs/toolkit';
import { setFilter } from './groupsFilterSlice';
import PendingAmount from './PendingAmount';

const selectGroups = state => state.groups;
const selectFilter = state => state.groupsFilter;

const groupSorter = (x, y) => {
    if (x.archived === y.archived) {
        return y.creationDate - x.creationDate;
    } else if (x.archived) {
        return 1;
    } else {
        return -1;
    }
};

const selectFilteredGroups = createSelector(
    [selectGroups, selectFilter],
    (groups, filter) => {
        groups = Object.values(groups);
        return (!filter.text
            ? groups
            : groups.filter(c => c.name.includes(filter.text))
        ).sort(groupSorter);
    }
);

const Groups = ({ push, groups, filter, setFilter }) => {
    return (
        <HomeLayout tab="groups" push={push}>
            <div className="groups">
                <PendingAmount groups={groups} />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <GroupsFilter
                            onFilterChange={text => setFilter(text)}
                            filterText={filter.text}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            data-testid="add-group-nav-btn"
                            onClick={() => push('/groups/new')}
                            variant="contained"
                            color="primary"
                        >
                            Add Group
                        </Button>
                    </Grid>
                </Grid>
                <GroupList
                    groups={groups}
                    onItemSelect={group => push(`/groups/${group.id}`)}
                />
            </div>
        </HomeLayout>
    );
};

const mapDispatchToProps = { setFilter, push };
const mapStateToProps = state => ({
    groups: selectFilteredGroups(state),
    filter: state.groupsFilter,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Groups);

export const testables = { Groups, groupSorter };
