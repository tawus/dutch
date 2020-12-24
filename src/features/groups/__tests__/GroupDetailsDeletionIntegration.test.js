import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import appRenderer, { store } from '../../../appRenderer';
import App from '../../../App';
import { push } from 'connected-react-router';
import { insertGroupData } from './testdata';

test('check deletion of group', () => {
    insertGroupData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/groups/1'));
    });

    const list = screen.getByTestId('contact-list').children;
    expect(list.length).toBe(2);

    const alertBtn = screen.getByTestId('alert-btn');
    expect(alertBtn['disabled']).toBeFalsy();

    act(() => {
        userEvent.click(alertBtn);
    });

    act(() => {
        userEvent.click(screen.getByTestId('ok-btn'));
    });

    expect(screen.queryByTestId('group-list').children.length).toBe(1);
});
