import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import appRenderer from '../appRenderer';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

test('App is rendered', async () => {
    render(appRenderer(<App />));

    const settings = screen.getByTestId('settings-btn');

    act(() => {
        userEvent.click(settings);
    });
});
