import React from 'react';

import Icon from 'react-materialize/lib/Icon';
import Modal from 'react-materialize/lib/Modal';
import { Button } from 'react-materialize';

import { getFirestore } from 'redux-firestore';

class WireframeCard extends React.Component {
    trashClicked = (e) => {
        e.preventDefault();
        console.log("Delete the wireframe");
        const fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.wireframe.id).delete();
        //this.props.history.push("/");
      }
    closeModal = (e) => {
        e.preventDefault();

    }
      
    render() {
        const { wireframe } = this.props;
        console.log("WireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-3 purple lighten-4 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name}</span>
                    <div>
                <i className="material-icons modal-trigger small right-align waves-red" style={{ display: 'grid', position: 'relative' }}
                    id="list_trash" href='#modall'>
                  clear
                </i> 
                <Modal id='modall' header='Delete List'>
                    <p> Are you sure you want to delete the list?</p>
                    <Button type="submit" waves="light" className="red accent-4" onClick={this.trashClicked}>
                        Yes
                <Icon right>send</Icon></Button>
                <Button className="blue accent-2" waves="light" modal="close" onClick={this.closeModal}>No</Button>
                </Modal>
            </div>
                </div>
                
            </div>
        );
    }
}
export default WireframeCard;