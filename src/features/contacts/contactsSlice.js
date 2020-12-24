import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { data: {}, counter: 1 },
    reducers: {
        addContact: (state, action) => {
            const contactId = String(state.counter++);
            state.data[contactId] = {
                ...action.payload,
                id: contactId,
            };
        },

        removeContact: (state, action) => {
            delete state.data[action.payload];
        },

        clearContacts: state => {
            state = undefined;
        },
    },
});

export const {
    clearContacts,
    addContact,
    removeContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
