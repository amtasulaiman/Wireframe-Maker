import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    handleNewWireframe = (e) => {
        const wireframes =this.props.wireframes;
        const {profile} = this.props
        let newWireframe = { name: "Unknown", owner: profile.email, controls: [], time: Date.now() };
        const fireStore = getFirestore();
        let newKey = fireStore.collection('wireframes').doc();
        newKey.set(newWireframe)
        console.log("NEW WIREFRAME IS BEING ADDED")
        this.props.history.push(
            {
                pathname: "wireframe/" + newKey.id,
                key: newKey.id
            }
        )

    }
    

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        console.log(this.props.wireframes)
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                        <br />
                            Wireframe Maker
                        </div>
                        <div className="home_new_list_container">
                            <button className="home_new_list_button circle purple lighten-4" onClick={this.handleNewWireframe}>
                                Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes', orderBy:["time", "desc"] },
    ]),
)(HomeScreen);