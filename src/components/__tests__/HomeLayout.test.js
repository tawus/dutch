import React from 'react';
import { testables } from '../HomeLayout';
import { render, screen } from '@testing-library/react';
import appRenderer from '../../appRenderer';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const { HomeLayout } = testables;

test('render HomeLayout and check if tabs change', () => {
    const push = jest.fn();

    render(
        appRenderer(
            <HomeLayout tab="groups" push={push}>
                <h1>Groups</h1>
            </HomeLayout>
        )
    );

    act(() => {
        userEvent.click(screen.getByTestId('group-tab'));
    });
    expect(push).toHaveBeenCalledWith('/groups');

    act(() => {
        userEvent.click(screen.getByTestId('contact-tab'));
    });
    expect(push).toHaveBeenCalledWith('/contacts');
});
