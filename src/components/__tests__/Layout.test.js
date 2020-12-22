import React from 'react';
import { render, screen } from '@testing-library/react';
import { testables } from '../Layout';

const { Layout } = testables;

test('render Layout', () => {
    const push = jest.fn();

    render(
        <Layout push={push} app={{ userName: 'Tom' }}>
            <h1>Hello</h1>
        </Layout>
    );

    expect(screen.getByText('Tom')).toBeDefined();
});
