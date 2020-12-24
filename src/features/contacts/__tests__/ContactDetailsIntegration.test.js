import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import appRenderer, { store } from '../../../appRenderer';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import { insertContactData } from './testdata';
import { push } from 'connected-react-router';
import { act } from 'react-dom/test-utils';

test('render contacts and check deletion for contact with groups', () => {
    insertContactData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/contacts/1'));
    });

    const list = screen.getByTestId('group-list').children;
    expect(list.length).toBe(1);

    const alertBtn = screen.getByTestId('alert-btn');

    expect(alertBtn['disabled']).toBeTruthy();
});

test('check deletion for contact with no groups', () => {
    insertContactData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/contacts/2'));
    });

    const list = screen.getByTestId('group-list').children;
    expect(list.length).toBe(0);

    const alertBtn = screen.getByTestId('alert-btn');
    expect(alertBtn['disabled']).toBeFalsy();

    act(() => {
        userEvent.click(alertBtn);
    });

    act(() => {
        userEvent.click(screen.getByTestId('ok-btn'));
    });

    expect(screen.queryByTestId('contact-list')).toBeDefined();
});
