import { createSlice } from '@reduxjs/toolkit';

const contactsFilterSlice = createSlice({
    name: 'contactsFilter',
    initialState: { text: '' },
    reducers: {
        setFilter: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const { setFilter } = contactsFilterSlice.actions;
export default contactsFilterSlice.reducer;
