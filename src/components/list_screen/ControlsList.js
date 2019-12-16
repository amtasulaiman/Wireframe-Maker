import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ControlCard from './ControlCard';
import { firestoreConnect } from 'react-redux-firebase';

class ControlsList extends React.Component {
    render() {
        const wireframe = this.props.wireframe;
        const controls = wireframe.controls;
        console.log("ControlsList: wireframe.id " + wireframe.id);
        return (
            <div className="todo-lists section">
                {controls && controls.map(function(control) {
                    control.id = control.key;
                    return (
                        <ControlCard wireframe={wireframe} control={control} />
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const wireframe = ownProps.wireframe;
    return {
        wireframe,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'wireframes' },
    ]),
)(ControlsList);