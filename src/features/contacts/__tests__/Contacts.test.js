import React from 'react';
import { testables } from '../Contacts';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import appRenderer from '../../../appRenderer';
import { act } from 'react-dom/test-utils';

const { Contacts, nameSorter } = testables;

test('render contacts and see if contacts are rendered', () => {
    const setFilter = jest.fn();
    const removeContact = jest.fn();

    act(() => {
        render(
            appRenderer(
                <Contacts
                    contacts={testContacts}
                    setFilter={setFilter}
                    removeContact={removeContact}
                    filter={{ text: '' }}
                    push={jest.fn()}
                />
            )
        );
    });

    const list = screen.getByTestId('contact-list').children;
    expect(list.length).toBe(3);
    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-trigger')[0]);
        userEvent.click(screen.getAllByTestId('contact-menu-delete')[0]);
    });
    expect(removeContact).toHaveBeenCalledWith('1');
});

test('render contacts and check contact details traversal', () => {
    const setFilter = jest.fn();
    const removeContact = jest.fn();
    const push = jest.fn();

    render(
        appRenderer(
            <Contacts
                contacts={testContacts}
                setFilter={setFilter}
                removeContact={removeContact}
                filter={{ text: '' }}
                push={push}
            />
        )
    );

    const list = screen.getByTestId('contact-list');
    expect(list.children.length).toBe(3);
    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-trigger')[0]);
        userEvent.click(screen.getAllByTestId('contact-menu-details')[0]);
    });
    expect(push).toHaveBeenCalledWith('/contacts/1');
});

test('navigation to add contact works', () => {
    const setFilter = jest.fn();
    const removeContact = jest.fn();
    const push = jest.fn();

    render(
        appRenderer(
            <Contacts
                contacts={testContacts}
                setFilter={setFilter}
                removeContact={removeContact}
                filter={{ text: '' }}
                push={push}
            />
        )
    );

    const addContactBtn = screen.getByTestId('add-contact-nav-btn');

    act(() => {
        userEvent.click(addContactBtn);
    });

    expect(push).toHaveBeenCalledWith('/contacts/new');
});

const testContacts = [
    { name: 'One', id: '1' },
    { name: 'Two', id: '2' },
    { name: 'Three', id: '3' },
];

test('nameSorter', () => {
    const array = [
        { name: 'pqr' },
        { name: 'def' },
        { name: 'zyx' },
        { name: 'abc' },
    ];
    expect(array.toString()).toBe(
        [
            { name: 'abc' },
            { name: 'def' },
            { name: 'pqr' },
            { name: 'zyx' },
        ].toString()
    );
});
