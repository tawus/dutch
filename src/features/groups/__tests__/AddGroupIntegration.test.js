import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import appRenderer, { store } from '../../../appRenderer';
import userEvent from '@testing-library/user-event';
import { insertGroupData } from './testdata';
import { push } from 'connected-react-router';
import App from '../../../App';
import { act } from 'react-dom/test-utils';

test('render contacts and check deletion', () => {
    insertGroupData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/groups/new'));
    });
    /*    const saveBtn = screen.getByTestId('group-save');
    const list = screen.getByTestId('contact-list').children;
    const name = screen.getByTestId('group-name');
    const amount = screen.getByTestId('group-bill-amount');
    expect(list.length).toBe(3);

    userEvent.click(list[2].querySelector('input'));

    expect(saveBtn['disabled']).toBe(true);
    userEvent.type(name, 'Group #1');
    expect(saveBtn['disabled']).toBe(true);
    userEvent.type(amount, '56.79');
    expect(saveBtn['disabled']).toBe(false);

    userEvent.click(saveBtn);*/
});
