import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import appRenderer, { store } from '../../../appRenderer';
import userEvent from '@testing-library/user-event';
import { insertGroupData } from './testdata';
import { push } from 'connected-react-router';
import App from '../../../App';
import { act } from 'react-dom/test-utils';

test('render groups and check creation', () => {
    insertGroupData(store);
    render(appRenderer(<App />));
    act(() => {
        store.dispatch(push('/'));
    });

    expect(screen.getByTestId('group-list').children.length).toBe(2);

    act(() => {
        store.dispatch(push('/groups/new'));
    });

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
    act(() => {
        userEvent.click(contactSelector);
    });

    act(() => {
        userEvent.type(contactSelector, 'Dick');
        userEvent.click(screen.getByText('Dick'));
    });
    expect(saveBtn['disabled']).toBe(false);

    act(() => {
        userEvent.click(saveBtn);
    });

    expect(screen.getByTestId('group-list').children.length).toBe(3);
});
