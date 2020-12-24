import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import appRenderer, { store } from '../../../appRenderer';
import App from '../../../App';
import { push } from 'connected-react-router';
import { insertGroupData } from './testdata';

test('check deletion of member of a group', () => {
    insertGroupData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/groups/2'));
    });

    const list = screen.getByTestId('contact-list').children;
    expect(list.length).toBe(2);

    expect(screen.getByTestId('amount-per-person')).toContainHTML('$100');

    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-trigger')[0]);
    });

    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-delete')[0]);
    });

    expect(screen.queryByTestId('contact-list').children.length).toBe(1);
    expect(screen.getByTestId('amount-per-person')).toContainHTML('$200');
});
