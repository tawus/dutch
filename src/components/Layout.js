import React from 'react';
import PropTypes from 'prop-types';
import AppBar from './AppBar';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const Layout = ({ push, children, app }) => (
    <div className="layout" data-testid="layout">
        <AppBar push={push} userName={app.userName} />
        {children}
    </div>
);

Layout.propTypes = {
    push: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    app: PropTypes.shape({
        userName: PropTypes.string.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({ app: state.app });

const mapDispatchToProps = {
    push,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

export const testables = { Layout };
