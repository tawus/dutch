import React from 'react';
import { testables } from '../Groups';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import appRenderer from '../../../appRenderer';

const { Groups, archivedAndNameSorter } = testables;

test('render groups and select item', () => {
    const setFilter = jest.fn();
    const push = jest.fn();
    render(
        appRenderer(
            <Groups
                groups={testGroups}
                setFilter={setFilter}
                filter={{ text: '' }}
                push={push}
            />
        )
    );

    const list = screen.getByTestId('group-list').children;
    expect(list.length).toBe(3);

    act(() => {
        userEvent.click(screen.getAllByTestId('group-item')[1]);
    });
    expect(push).toHaveBeenCalledWith('/groups/2');
});

const testGroups = [
    {
        name: 'One',
        id: 1,
        members: { 1: { paid: false }, 2: { paid: false } },
        billAmount: 9.5,
        archived: false,
        creationDate: new Date().valueOf(),
    },
    {
        name: 'Two',
        id: 2,
        members: { 1: { paid: false }, 2: { paid: true } },
        billAmount: 11.9,
        archived: false,
        creationDate: new Date().valueOf(),
    },
    {
        name: 'Three',
        id: 3,
        members: {},
        billAmount: 23.5,
        archived: false,
        creationDate: new Date().valueOf(),
    },
];

test('archivedAndNameSorter', () => {
    const xs = [
        { name: 'abc', archived: true },
        { name: 'zyx', archived: false },
        { name: 'pqr', archived: false },
        { name: 'aaa', archived: true },
    ];

    xs.sort(archivedAndNameSorter);
    expect(xs.toString()).toBe(
        [
            { name: 'pqr', archived: false },
            { name: 'zyx', archived: false },
            { name: 'aaa', archived: true },
            { name: 'abc', archived: true },
        ].toString()
    );
});
