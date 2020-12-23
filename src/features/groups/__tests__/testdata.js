import { addContact } from '../../contacts/contactsSlice';
import { addGroup, clearGroups } from '../groupsSlice';

export const insertContactData = store => {
    for (const contact of testContacts) {
        store.dispatch({ type: addContact.toString(), payload: contact });
    }
};

export const insertGroupData = store => {
    insertContactData(store);
    store.dispatch({ type: clearGroups.toString() });
    for (const group of testGroups) {
        store.dispatch({ type: addGroup.toString(), payload: group });
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

const testGroups = [
    {
        name: 'Group #1',
        members: [1, 2],
        creationDate: new Date().valueOf(),
        archived: false,
        billAmount: 100,
        amountPerPerson: 50,
    },
    {
        name: 'Group #2',
        members: [2, 3],
        creationDate: new Date().valueOf(),
        archived: false,
        billAmount: 200,
        amountPerPerson: 100,
    },
];

test('avoid test error', () => {});
