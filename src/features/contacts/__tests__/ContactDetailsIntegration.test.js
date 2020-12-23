import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import appRenderer, { store } from '../../../appRenderer';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import { insertContactData } from './testdata';
import { push } from 'connected-react-router';
import { act } from 'react-dom/test-utils';

test('render contacts and check deletion', () => {
    insertContactData(store);
    render(appRenderer(<App />));

    act(() => {
        store.dispatch(push('/contacts/1'));
    });

    const list = screen.getByTestId('group-list').children;
    expect(list.length).toBe(0);
});
