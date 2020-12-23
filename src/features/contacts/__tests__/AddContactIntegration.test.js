import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import appRenderer, { store } from '../../../appRenderer';
import { act } from 'react-dom/test-utils';
import App from '../../../App';
import { push } from 'connected-react-router';

test('render contact form and submit', () => {
    render(appRenderer(<App />));
    act(() => {
        store.dispatch(push('/contacts/new'));
    });

    const submitBtn = screen.getByTestId('contact-save');
    const name = screen.getByRole('textbox', { testId: 'contact-name' });
    const form = screen.getByTestId('contact-form');
    expect(submitBtn['disabled']).toBe(true);
    act(() => {
        userEvent.type(name, 'Test User');
    });
    expect(submitBtn['disabled']).toBe(false);

    act(() => {
        fireEvent.submit(form);
    });

    act(() => {
        userEvent.click(screen.getAllByTestId('contact-menu-trigger')[0]);
        userEvent.click(screen.getAllByTestId('contact-menu-delete')[0]);
    });

    expect(screen.getByTestId('contact-list').children.length).toBe(0);
});
