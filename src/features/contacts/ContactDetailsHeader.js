import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import GroupIcon from '@material-ui/icons/Group';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginBottom: '20px',
    },
});

const ContactDetailsHeader = ({ contact, groups }) => {
    const classes = useStyles();
    const activeGroups = groups.filter(g => !g.archived);
    const amount = activeGroups.reduce((sum, g) => sum + g.amountPerPerson, 0);
    return (
        <Card className={classes.root}>
            <CardContent className={classes.title}>
                <Typography
                    variant="h5"
                    component="h2"
                    data-testid="contact-name"
                >
                    {contact.name}
                </Typography>
                <List>
                    {menu({
                        groups,
                        activeGroupCount: activeGroups.length,
                        amount,
                    }).map(({ text, value, icon, testid }, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{text}</ListItemText>
                            <ListItemSecondaryAction data-testid={testid}>
                                {value}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

const menu = ({ groups, activeGroupCount, amount }) => [
    {
        text: 'Groups',
        value: groups.length,
        testid: 'group-count',
        icon: <GroupIcon />,
    },
    {
        text: 'Active Groups',
        value: activeGroupCount,
        testid: 'current-count',
        icon: <GroupIcon />,
    },
    {
        text: 'Pending Amount',
        value: amount,
        testid: 'amount',
        icon: <ReceiptIcon />,
    },
];

export default ContactDetailsHeader;

ContactDetailsHeader.propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            archived: PropTypes.bool.isRequired,
            amountPerPerson: PropTypes.number.isRequired,
        })
    ).isRequired,
};
