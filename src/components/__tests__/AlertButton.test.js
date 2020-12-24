import React from 'react';
import AlertButton from '../AlertButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

test('alert button can be cancelled and accepted', () => {
    const confirm = jest.fn();
    render(
        <AlertButton
            onConfirm={confirm}
            buttonText="Submit"
            text="Are you sure ?"
            title="Testing"
        />
    );

    const alertBtn = screen.getByTestId('alert-btn');
    act(() => {
        userEvent.click(alertBtn);
    });

    const okBtn = screen.getByTestId('ok-btn');
    const cancelBtn = screen.getByTestId('cancel-btn');

    act(() => {
        userEvent.click(cancelBtn);
    });

    expect(confirm).toHaveBeenCalledTimes(0);

    act(() => {
        userEvent.click(okBtn);
    });

    expect(confirm).toHaveBeenCalledTimes(1);
});
