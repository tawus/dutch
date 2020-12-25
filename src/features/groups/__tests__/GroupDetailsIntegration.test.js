import React from 'react';
import { render, screen } from '@testing-library/react';
import appRenderer, { store } from '../../../appRenderer';
import userEvent from '@testing-library/user-event';
import { insertGroupData } from './testdata';
import { push } from 'connected-react-router';
import App from '../../../App';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

test('check header and deletion', () => {
    insertGroupData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/'));
    });

    expect(screen.getByTestId('group-list').children.length).toBe(2);

    act(() => {
        store.dispatch(push('/groups/1'));
    });

    expect(screen.getByTestId('amount')).toContainHTML('$100');
    expect(screen.getByTestId('unpaid')).toContainHTML('$100');
    expect(screen.getByTestId('member-count')).toContainHTML('2');
    expect(screen.getByTestId('amount-per-person')).toContainHTML('$50');

    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-delete')[0]);
    });

    expect(screen.getByTestId('member-count')).toContainHTML('1');
    expect(screen.getByTestId('group-status')).toHaveTextContent('Active');

    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-paid')[0]);
    });

    expect(screen.getByTestId('group-status')).toHaveTextContent('Archived');
});

test('invalid group id redirects to home page', () => {
    insertGroupData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/groups/x'));
    });

    expect(screen.queryByTestId('group-list')).toBeDefined();
});
