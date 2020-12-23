import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PeopleIcon from '@material-ui/icons/People';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ArchiveIcon from '@material-ui/icons/Archive';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import DateIcon from '@material-ui/icons/Event';

const useStyles = makeStyles({
    root: {
        marginBottom: '20px',
    },
});

const GroupDetailsHeader = ({ group }) => {
    const classes = useStyles();
    const unpaid =
        Object.values(group.members).filter(m => !m.paid).length *
        group.amountPerPerson;
    return (
        <Card
            className={`${classes.root} ${
                group.archived ? 'archived' : 'active'
            }`}
        >
            <CardContent className={classes.title}>
                <Typography
                    variant="h5"
                    component="h2"
                    data-testid="group-name"
                >
                    {group.name}
                </Typography>
                <Chip
                    data-testid="group-status"
                    icon={group.archived ? <ArchiveIcon /> : <GroupIcon />}
                    label={group.archived ? 'Archived' : 'Active'}
                ></Chip>
                <List>
                    {menu(group, unpaid).map(
                        ({ text, value, icon, testid }, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText>{text}</ListItemText>
                                <ListItemSecondaryAction data-testid={testid}>
                                    {value}
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default GroupDetailsHeader;

GroupDetailsHeader.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        billAmount: PropTypes.number.isRequired,
        creationDate: PropTypes.number.isRequired,
        archived: PropTypes.bool.isRequired,
        members: PropTypes.object.isRequired,
    }).isRequired,
};

const menu = (group, unpaid) => [
    {
        text: 'Members',
        icon: <PeopleIcon />,
        testid: 'member-count',
        value: Object.keys(group.members).length,
    },
    {
        text: 'Bill Amount',
        icon: <ReceiptIcon />,
        testid: 'amount',
        value: group.billAmount,
    },
    { text: 'Unpaid', icon: <ReceiptIcon />, testid: 'unpaid', value: unpaid },
    {
        text: 'Amount Per Person',
        icon: <PersonIcon />,
        testid: 'amount-per-person',
        value: group.amountPerPerson,
    },
    {
        text: 'Creation Date',
        icon: <DateIcon />,
        testid: 'creation-date',
        value: new Date(group.creationDate).toLocaleDateString(),
    },
];
