import React from 'react';
import { render, screen } from '@testing-library/react';
import AppBar from '../AppBar';
import userEvent from '@testing-library/user-event';
import appRenderer from '../../appRenderer';
import { act } from 'react-dom/test-utils';

test('render AppBar', () => {
    const onSettings = jest.fn();
    const onHome = jest.fn();

    render(
        appRenderer(
            <AppBar
                onSettings={onSettings}
                userName="John Smith"
                onHome={onHome}
            />
        )
    );

    const settingsBtn = screen.getByTestId('settings-btn');
    act(() => {
        userEvent.click(settingsBtn);
    });

    expect(onSettings).toHaveBeenCalledTimes(1);

    const title = screen.getByTestId('app-title');
    expect(title).toContainHTML('Dutch');

    act(() => {
        userEvent.click(title);
    });

    expect(onHome).toHaveBeenCalledTimes(1);
});
