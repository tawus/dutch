import React from 'react';
import ContactsFilter from '../ContactsFilter';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('render and check if filter works', async () => {
    const filter = jest.fn();
    render(<ContactsFilter filterText="" onFilterChange={filter} />);

    const input = screen.getByRole('textbox', { testId: 'contact-filter' });
    await userEvent.type(input, 'John', { delay: 1 });

    expect(filter).toHaveBeenCalledWith('John');
});
