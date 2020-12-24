import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import appRenderer, { store } from '../../../appRenderer';
import App from '../../../App';
import { push } from 'connected-react-router';
import { insertGroupData } from './testdata';

test('check paid/unpaid works', () => {
    insertGroupData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/groups/1'));
    });

    const list = screen.getByTestId('contact-list').children;
    expect(list.length).toBe(2);

    expect(screen.getByTestId('amount')).toContainHTML('$100');
    for (const paid of Array.from(screen.queryAllByTestId('paid-icon'))) {
        act(() => {
            userEvent.click(paid);
        });
    }

    expect(screen.getByTestId('unpaid')).toContainHTML('$0.00');
    for (const unpaid of Array.from(screen.queryAllByTestId('unpaid-icon'))) {
        act(() => {
            userEvent.click(unpaid);
        });
    }

    expect(screen.getByTestId('unpaid')).toContainHTML('$0');
});
