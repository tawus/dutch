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
    const itemClick = item => {
        userEvent.click(screen.getAllByRole('checkbox')[item]);
    };

    expect(saveBtn['disabled']).toBe(true);
    act(() => {
        itemClick(0);
        itemClick(1);
    });

    expect(saveBtn['disabled']).toBe(false);

    act(() => {
        userEvent.click(saveBtn);
    });

    expect(screen.getByTestId('group-list').children.length).toBe(3);
});
