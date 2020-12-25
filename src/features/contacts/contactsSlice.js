import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { data: {}, counter: 1, me: { name: 'Guest' } },
    reducers: {
        addContact: (state, action) => {
            const contactId = String(state.counter++);
            const contact = {
                ...action.payload,
                id: contactId,
            };
            state.data[contactId] = contact;

            if (contactId === '1') {
                state.me = contact;
            }
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
