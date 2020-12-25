import React from 'react';
import { render, screen } from '@testing-library/react';
import { testables } from '../Layout';
import appRenderer from '../../appRenderer';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const { Layout } = testables;

test('render Layout', () => {
    const push = jest.fn();

    render(
        appRenderer(
            <Layout push={push} me={{ name: 'Tom' }}>
                <h1>Hello</h1>
            </Layout>
        )
    );

    expect(screen.getByText('Tom')).toBeDefined();

    act(() => {
        userEvent.click(screen.getByTestId('app-title'));
    });

    expect(push).toHaveBeenCalledWith('/');
});

test('render guest Layout', () => {
    const push = jest.fn();

    render(
        appRenderer(
            <Layout push={push}>
                <h1>Hello</h1>
            </Layout>
        )
    );

    expect(screen.getByText('Guest')).toBeDefined();

    act(() => {
        userEvent.click(screen.getByTestId('app-title'));
    });

    expect(push).toHaveBeenCalledWith('/');
});
