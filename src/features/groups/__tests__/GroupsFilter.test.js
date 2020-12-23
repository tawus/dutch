import React from 'react';
import GroupsFilter from '../GroupsFilter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('render and check if search works', () => {
    const filter = jest.fn();
    render(<GroupsFilter filterText="" onFilterChange={filter} />);

    const input = screen.getByRole('textbox', { testId: 'group-query' });
    userEvent.type(input, 'Group #1');

    expect(filter).toHaveBeenCalledWith('Group #1');
});
