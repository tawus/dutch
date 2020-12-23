import React from 'react';
import { testables } from '../AddContact';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import appRenderer from '../../../appRenderer';
import { act } from 'react-dom/test-utils';

const { AddContact } = testables;

test('render contact form and submit', () => {
    const addContact = jest.fn();
    const push = jest.fn();
    render(appRenderer(<AddContact addContact={addContact} push={push} />));

    const submitBtn = screen.getByTestId('contact-save');
    const name = screen.getByRole('textbox', { testId: 'contact-name' });
    const form = screen.getByTestId('contact-form');
    expect(submitBtn.disabled).toBe(true);
    act(() => {
        userEvent.type(name, 'Test User');
    });
    expect(submitBtn.disabled).toBe(false);

    act(() => {
        fireEvent.submit(form);
    });
    expect(addContact).toHaveBeenCalledTimes(1);
    expect(addContact).toHaveBeenCalledWith({
        name: 'Test User',
    });

    fireEvent.click(submitBtn);
    expect(addContact).toHaveBeenCalledWith({
        name: 'Test User',
    });

    expect(push).toHaveBeenCalledWith('/contacts');
});
