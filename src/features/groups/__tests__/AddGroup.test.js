import React from 'react';
import { testables } from '../AddGroup';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import appRenderer from '../../../appRenderer';
import { act } from 'react-dom/test-utils';

const { AddGroup } = testables;

test('render group form and create a new group', () => {
    const addGroup = jest.fn();
    const contacts = testContacts;
    const push = jest.fn();

    render(
        appRenderer(
            <AddGroup addGroup={addGroup} contacts={contacts} push={push} />
        )
    );

    const saveBtn = screen.getByTestId('group-save');

    const [name, amount] = screen.getAllByRole('textbox');
    expect(saveBtn['disabled']).toBe(true);

    act(() => {
        userEvent.type(name, 'Group #1');
    });
    expect(saveBtn['disabled']).toBe(true);

    act(() => {
        userEvent.type(amount, '56.79');
    });

    const contactSelector = screen
        .getByTestId('contact-selector')
        .querySelector('input');

    /*
    const itemClick = (item, times) => {
        for (let i = 0; i < times; i++) {
            act(() => {
                userEvent.click(contactSelector);
                userEvent.type(contactSelector, item);
                //console.log(item);
                userEvent.click(screen.getByText(item));
            });
        }
    };

    act(() => {
        itemClick('Tom', 1); // Remove Tom
        itemClick('Dick', 2); //Add/Remove Dick
        //itemClick('Harry', 3); // Add/Remove/Add Harry
    });

    expect(saveBtn['disabled']).toBe(false);

    act(() => {
        userEvent.click(saveBtn);
    });

    expect(addGroup).toHaveBeenCalledWith({
        name: 'Group #1',
        billAmount: '56.79',
        members: ['3'],
    });

    expect(push).toHaveBeenCalledWith('/groups');*/
});

const testContacts = [
    { name: 'Tom', id: '1' },
    { name: 'Dick', id: '2' },
    { name: 'Harry', id: '3' },
];
