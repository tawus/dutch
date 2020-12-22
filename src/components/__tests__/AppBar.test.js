import React from 'react';
import { render, screen } from '@testing-library/react';
import AppBar from '../AppBar';
import userEvent from '@testing-library/user-event';

test('render AppBar', () => {
    const push = jest.fn();
    render(<AppBar push={push} userName="John Smith" />);

    const settingsBtn = screen.getByTestId('settings-btn');
    userEvent.click(settingsBtn);

    expect(push).toHaveBeenCalledWith('/settings');

    expect(screen.getByTestId('app-title').innerHTML).toBe('Dutch');
});
