import { addContact } from '../contactsSlice';

export const insertContactData = store => {
    for (const contact of testContacts) {
        store.dispatch({ type: addContact.toString(), payload: contact });
    }
};

const testContacts = [
    {
        name: 'Tom',
        email: 'tom@example.com',
        contactNumber: '827364283746',
    },
    {
        name: 'Dick',
        email: 'dick@example.com',
        contactNumber: '127364283746',
    },
    {
        name: 'Harry',
        email: 'harry@example.com',
        contactNumber: '227364283746',
    },
];

test('avoid test error', () => {});
