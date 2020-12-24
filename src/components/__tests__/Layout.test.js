import React from 'react';
import { render, screen } from '@testing-library/react';
import { testables } from '../Layout';
import appRenderer from '../../appRenderer';

const { Layout } = testables;

test('render Layout', () => {
    const push = jest.fn();

    render(
        appRenderer(
            <Layout push={push} app={{ userName: 'Tom' }}>
                <h1>Hello</h1>
            </Layout>
        )
    );

    expect(screen.getByText('Tom')).toBeDefined();
});
