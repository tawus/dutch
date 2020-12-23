import React from 'react';
import { testables } from '../AddGroup';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import appRenderer from '../../../appRenderer';
import { act } from 'react-dom/test-utils';

const { AddGroup } = testables;

test('render group form and create a new group', () => {
    const setFilter = jest.fn();
    const addGroup = jest.fn();
    const filter = { text: '' };
    const contacts = testContacts;
    const push = jest.fn();

    render(
        appRenderer(
            <AddGroup
                setFilter={setFilter}
                contacts={contacts}
                addGroup={addGroup}
                filter={filter}
                push={push}
            />
        )
    );

    const nextBtn = screen.getByTestId('group-next');

    const [name, amount] = screen.getAllByRole('textbox');
    expect(nextBtn['disabled']).toBe(true);

    act(() => {
        userEvent.type(name, 'Group #1');
    });
    expect(nextBtn['disabled']).toBe(true);

    act(() => {
        userEvent.type(amount, '56.79');
    });
    expect(nextBtn['disabled']).toBe(false);

    act(() => {
        userEvent.click(nextBtn);
    });

    const list = screen.getByTestId('contact-list').children;
    expect(list.length).toBe(3);

    const saveBtn = screen.getByTestId('group-save');
    const itemClick = (item, times) => {
        for (let i = 0; i < times; i++) {
            userEvent.click(screen.getAllByRole('checkbox')[item]);
        }
    };

    expect(saveBtn['disabled']).toBe(true);
    act(() => {
        itemClick(0, 1);
        itemClick(1, 2);
        itemClick(2, 3);
    });

    expect(saveBtn['disabled']).toBe(false);

    act(() => {
        userEvent.click(saveBtn);
    });

    expect(addGroup).toHaveBeenCalledWith({
        name: 'Group #1',
        billAmount: '56.79',
        members: ['1', '2', '3'],
    });

    expect(push).toHaveBeenCalledWith('/groups');
});

const testContacts = [
    { name: 'Tom', id: '1' },
    { name: 'Dick', id: '2' },
    { name: 'Harry', id: '3' },
];
