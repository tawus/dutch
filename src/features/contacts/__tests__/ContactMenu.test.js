import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactMenu from '../ContactMenu';

test('render and check if menu is working', async () => {
    const deleteContact = jest.fn();
    const details = jest.fn();

    render(
        <ContactMenu
            onDelete={deleteContact}
            onDetails={details}
            contact={{}}
        />
    );

    // Check visibility
    const menu = screen.getByTestId('contact-menu');
    expect(menu).not.toBeVisible();
    userEvent.click(screen.getByTestId('contact-menu-trigger'));
    expect(menu).toBeVisible();

    // Check clicks
    await userEvent.click(screen.getByTestId('contact-menu-delete'));
    expect(deleteContact).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId('contact-menu-details'));
    expect(details).toHaveBeenCalledTimes(1);
});
