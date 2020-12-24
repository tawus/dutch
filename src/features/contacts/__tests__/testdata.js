import { addContact } from '../contactsSlice';
import { act } from 'react-dom/test-utils';
import { addGroup } from '../../groups/groupsSlice';

export const insertContactData = store => {
    for (const contact of testContacts) {
        act(() => {
            store.dispatch({ type: addContact.toString(), payload: contact });
        });
    }
    store.dispatch({ type: addGroup.toString(), payload: testGroup });
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

const testGroup = {
    name: 'Group #1',
    members: [1],
    creationDate: new Date().valueOf() + 10,
    archived: false,
    billAmount: 100,
    amountPerPerson: 50,
};

test('avoid test error', () => {});
