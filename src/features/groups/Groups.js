import React from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import HomeLayout from '../../components/HomeLayout';

const Groups = ({ push }) => (
    <HomeLayout tab="groups" push={push}>
        <span />
    </HomeLayout>
);

export default connect(
    null,
    { push }
)(Groups);

export const testables = { Groups };
