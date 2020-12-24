import React from 'react';
import Routes from './Routes';
import './App.css';
import { connect } from 'react-redux';
import AddContact from './features/contacts/AddContact';

function App({ isNewInstallation }) {
    return (
        <div className="App">
            {isNewInstallation ? <AddContact /> : <Routes />}
        </div>
    );
}

const mapStateToProps = state => ({
    isNewInstallation: !Object.keys(state.contacts).length,
});

export default connect(
    mapStateToProps,
    null
)(App);
