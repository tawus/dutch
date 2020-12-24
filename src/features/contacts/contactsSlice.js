import { createSlice } from '@reduxjs/toolkit';

let contactId = 1;

const nextContactId = () => contactId++;

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {},
    reducers: {
        addContact: (state, action) => {
            const contactId = String(nextContactId());
            state[contactId] = {
                ...action.payload,
                id: contactId,
            };
        },

        removeContact: (state, action) => {
            delete state[action.payload];
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
