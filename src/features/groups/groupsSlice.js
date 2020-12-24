import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: { counter: 1, data: {} },
    reducers: {
        addGroup: (state, action) => {
            const { billAmount, members } = action.payload;
            if (members.length > 0) {
                const amount = Number.parseFloat(billAmount);
                const amountPerPerson = Number.parseFloat(
                    (amount / members.length).toFixed(2)
                );
                const id = String(state.counter++);
                const groupMembers = members.reduce(
                    (ms, id) => ({ ...ms, [id]: { paid: id === '1', id } }),
                    {}
                );
                state.data[id] = {
                    ...action.payload,
                    billAmount: amount,
                    id,
                    creationDate: new Date().valueOf(),
                    archived: false,
                    amountPerPerson,
                    members: groupMembers,
                };
            }
        },

        togglePaid: (state, action) => {
            const { groupId, memberId } = action.payload;
            const group = state.data[groupId];
            group.members[memberId].paid = !group.members[memberId].paid;
            updateArchiveStatus(group);
        },

        removeMember: (state, action) => {
            const { groupId, memberId } = action.payload;
            const group = state.data[groupId];
            delete group.members[memberId];
            group.amountPerPerson = Number.parseFloat(
                (group.billAmount / Object.keys(group.members).length).toFixed(
                    2
                )
            );
            updateArchiveStatus(group);
        },

        removeGroup: (state, action) => {
            delete state.data[action.payload];
        },

        clearGroups: state => {
            state = undefined;
        },
    },
});

const updateArchiveStatus = group => {
    group.archived = Object.values(group.members).every(({ paid }) => paid);
};

export const {
    removeMember,
    addGroup,
    togglePaid,
    removeGroup,
    clearGroups,
} = groupsSlice.actions;

export default groupsSlice.reducer;
