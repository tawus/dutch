import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import MoneyIcon from '@material-ui/icons/AttachMoney';

const PendingAmount = ({ groups }) => {
    const { amount, members } = calculatePendings(groups);
    return (
        <Chip
            label={
                amount > 0
                    ? `${amount} from ${members} users`
                    : 'All Payments Made'
            }
            color={amount > 0 ? 'primary' : 'default'}
            avatar={
                <Avatar>
                    <MoneyIcon />
                </Avatar>
            }
        />
    );
};

export default PendingAmount;

PendingAmount.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const calculatePendings = groups => {
    const { members, sum } = groups
        .filter(g => !g.archived)
        .reduce(
            ({ sum, members }, g) => {
                sum +=
                    g.billAmount -
                    Object.keys(g.members).length * g.amountPerPerson;
                Object.keys(g.members).forEach(m => members.add(m));
                return { sum, members };
            },
            { sum: 0, members: new Set() }
        );

    return { amount: sum, members: members.size };
};
