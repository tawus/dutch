import React from 'react';
import PropTypes from 'prop-types';
import AppBar from './AppBar';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import './Layout.css';

const Layout = ({ push, children, me }) => (
    <div className="layout" data-testid="layout">
        <AppBar
            onSettings={() => push('/settings')}
            onHome={() => push('/')}
            userName={me ? me.name : 'Guest'}
        />
        <div className="layout-body">{children}</div>
    </div>
);

Layout.propTypes = {
    push: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    me: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
};

const mapStateToProps = state => ({
    me: state.contacts.me,
});

const mapDispatchToProps = {
    push,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

export const testables = { Layout };
