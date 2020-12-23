import { createSlice } from '@reduxjs/toolkit';

let groupId = 1;

const nextGroupId = () => groupId++;

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {},
    reducers: {
        addGroup: (state, action) => {
            const { billAmount, members } = action.payload;
            if (members.length > 0) {
                const amount = Number.parseFloat(billAmount);
                const amountPerPerson = (amount / members.length).toFixed(2);
                const id = String(nextGroupId());
                const groupMembers = members.reduce(
                    (ms, m) => ({ ...ms, [m]: { paid: false } }),
                    {}
                );
                state[id] = {
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

        setPaid: (state, action) => {
            const { groupId, memberId, paid } = action.payload;
            const group = state[groupId];
            group.members[memberId].paid = paid;
            group.archived = Object.values(group.members).every(
                ({ paid }) => paid
            );
        },

        removeGroup: (state, action) => {
            delete state[action.payload];
        },
    },
});

export const { addGroup, setPaid, removeGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
