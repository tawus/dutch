import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacts from '../Contacts';
import appRenderer, { store } from '../../../appRenderer';
import { insertContactData } from './testdata';
import { act } from 'react-dom/test-utils';

test('render contacts and check details navigation', () => {
    insertContactData(store);
    render(appRenderer(<Contacts />));

    const list = screen.getByTestId('contact-list');
    expect(list.children.length).toBe(3);

    const filter = screen.getByRole('textbox', { testId: 'contact-filter' });
    act(() => {
        userEvent.type(filter, 'Tom');
    });
    expect(screen.getByTestId('contact-list').children.length).toBe(1);
    act(() => {
        fireEvent.change(filter, { target: { value: '' } });
    });
    expect(screen.getByTestId('contact-list').children.length).toBe(3);

    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-trigger')[1]);
        userEvent.click(screen.getAllByTestId('contact-menu-details')[1]);
    });
});
