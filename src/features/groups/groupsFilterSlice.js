import { createSlice } from '@reduxjs/toolkit';

const groupsFilterSlice = createSlice({
    name: 'groupsFilter',
    initialState: { text: '' },
    reducers: {
        setFilter: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const { setFilter } = groupsFilterSlice.actions;
export default groupsFilterSlice.reducer;
