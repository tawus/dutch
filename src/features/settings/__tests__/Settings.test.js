import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from '../Settings';
import appRenderer from '../../../appRenderer';

test('render AppBar', () => {
    render(appRenderer(<Settings />));
    expect(screen.queryByTestId('settings-heading')).toBeDefined();
});
