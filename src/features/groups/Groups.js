import React from 'react';
import Layout from '../../components/Layout';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const Groups = ({ push }) => (
    <Layout push={push}>
        <span />
    </Layout>
);

export default connect(
    null,
    { push }
)(Groups);

export const testables = { Groups };
