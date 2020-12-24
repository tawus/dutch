import React from 'react';
import { testables } from '../ContactDetails';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import appRenderer from '../../../appRenderer';

const { ContactDetails } = testables;

test('render contact details', () => {
    const push = jest.fn();

    render(
        appRenderer(
            <ContactDetails
                contact={testContact}
                groups={testGroups.map(t => ({
                    ...t,
                    billAmount: 5,
                    creationDate: new Date().valueOf(),
                }))}
                push={push}
            />
        )
    );

    expect(screen.getByTestId('contact-name')).toContainHTML('John Smith');
    expect(screen.getByTestId('amount')).toContainHTML('100');
    expect(screen.getByTestId('group-count')).toContainHTML('3');
    expect(screen.getByTestId('current-count')).toContainHTML('2');

    const list = screen.getByTestId('group-list').children;

    expect(list.length).toBe(3);
    expect(list[0].innerHTML).toContain('Group #1');
});

const testContact = { name: 'John Smith', id: 1 };
const testGroups = [
    {
        id: 1,
        name: 'Group #1',
        archived: false,
        amountPerPerson: 50,
        members: { 1: { paid: true, id: 1 } },
    },
    {
        id: 2,
        name: 'Group #2',
        archived: false,
        amountPerPerson: 100,
        members: { 1: { paid: false, id: 1 } },
    },
    {
        id: 3,
        name: 'Group #3',
        archived: true,
        amountPerPerson: 50,
        members: { 1: { paid: false, id: 1 } },
    },
];
