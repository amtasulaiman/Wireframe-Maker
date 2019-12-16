import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';

class WireframeLinks extends React.Component {
  
    render() {
        
        const wireframes = this.props.wireframes;
        console.log("Im in Wireframe links",wireframes);
        const { profile } = this.props;
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    wireframe.owner === profile.email ?
                    <Link to={'/wireframe/' + wireframe.id} key={wireframe.id}>
                        <WireframeCard wireframe={wireframe} />
                        
                    </Link> : null
                ))}
                 
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);