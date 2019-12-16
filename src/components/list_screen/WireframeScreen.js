import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ControlsList from './ControlsList.js';

import Control from './Control.js';
import { firestoreConnect } from 'react-redux-firebase';
import { Stage, Layer, Rect, Text, Circle, Line, Label } from 'react-konva';
import { getFirestore } from 'redux-firestore';
import Icon from 'react-materialize/lib/Icon';
import Button from 'react-materialize/lib/Button';
import {Rectangle} from 'react-shapes';


class WireframeScreen extends Component {
  componentDidMount = () => {
    if(this.props.wireframe){
      let fireStore = getFirestore();
      fireStore.collection('wireframes').doc(this.props.wireframe.id).update
      ({time: Date.now()
      })
    }
  }  
  state = {
        name: '',
        height: '',
        width:'',
        controls: [],
        isSelected: false,

    }

    handleChange = (e) => {

        const { target } = e;
        this.setState(state => ({
          ...state,
          [target.id]: target.value,
        }));
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ [target.id]: target.value })
    
    }
    handleStyling = (e) =>{
      
      const wireframe = this.props.wireframe;
     return ({
        backgroundColor:  wireframe.controls[e.id].background_color, /* Green */
        height: wireframe.controls[e.id].c_height,
        width:wireframe.controls[e.id].c_width,
        borderWidth: wireframe.controls[e.key].border_thickness,
        borderColor: wireframe.controls[e.key].border_color,
        borderRadius: wireframe.controls[e.key].border_radius,
        color: wireframe.controls[e.key].font_color,
        fontSize: wireframe.controls[e.key].font_size,
      })

    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        const diagram_style = {
            width:"1000px",
            height:"600px",
        }
        const container_style2 = {
          height:'550px',
          width:'450px',
          border: '2px solid black'
        }
        const my_borders ={
            border: "2px solid black",
            height:"600px"
            
        }
        const container_style = {
          height:'100px',
          width:'200px',
          border: '2px solid black'
        }
     
       
     
        if (!wireframe) {
          return <React.Fragment />
        }

        
        const controls = this.state.controls;

        return (
        <div className="row container white" style={diagram_style}>
            
            <div className="col s3" style={my_borders}>
              <div className="row">
            <i className="small material-icons" >zoom_in</i>
            <i className="small material-icons" >zoom_out</i>
            <Button type="submit" waves="light" className="green accent-4">Save</Button>
            <Button type="submit" waves="light" className="blue accent-4">Close</Button>
            </div>
            <div className="row">
            <br/><b>Container: </b>
            <div className="container" id="my_container" style={container_style} />
            </div>
            <div className="row">
              <b>Label: </b> 
              <label id="my_label" type="text" className="active black-text big calig">Label</label>
            </div>
            <div className="row"><br/>
            <b>Button: </b> 
              <button id="my_button" type='button' >Button</button>
            </div>
            <div className="row"><br/>
             <b>Textfield: </b>
              <input id="my_textfield" type="text" value="Enter Something" readOnly />
            </div>
                
                

          </div>
            
            
            
            <div className="col s6" style={my_borders}>
            <br/>
            <div className="container" style={container_style2}> 
            
            My container
            <div className="todo-controls section">help2
                {wireframe.controls && wireframe.controls.map(function(control){
                    control.id = control.key;
                    console.log("background color is:", control);
                    const style_control =  {
                      "background-color" : control.background_color,


                    }
                   
                    if(control.type == "button")
                        return(<button type={control.type} style={style_control}>{control.text_field}</button>)
                    else if(control.type == "label")
                        return(<label type="text" style={style_control} className="active black-text big calig">{control.text_field}</label>)
                    else if(control.type =="text_field")
                        return(<input type="text" value={control.text_field} style={style_control}/>)
                    else
                        return(<div className="container" id="my_container" style={style_control} />)
                        
                        
                        

            
                      })
                }
            </div>
            
            </div>
            
            
            </div>
            
            
            
            




            <div className="col s3" style={my_borders}>
                <div className="input-field">
                <label className="active black-text" htmlFor="name">Name</label>
                <input type="textarea" name="name" id="name" onChange={this.handleChange} defaultValue={wireframe.name} />
                </div>
                <div className="input-field">
                <label className="active black-text" htmlFor="password">Height</label>
                <input type="textarea" name="height" id="height" onChange={this.handleChange} defaultValue={wireframe.height} />
                </div>
                <div className="input-field">
                <label className="active black-text" htmlFor="password">Width</label>
                <input type="textarea" name="width" id="width" onChange={this.handleChange} defaultValue={wireframe.width} />
                </div>
                <h5><u>Properties</u></h5>
                <label className="active black-text" htmlFor='my_text'>Text:
                <input type='textarea' id='my_text' /></label><br/><br/>
                <label className="active black-text" htmlFor='my_tsize'>Text-size:
                <input type='textarea' id='my_tsize' /></label><br/><br/>
                <label className="active black-text" htmlFor='my_tcolor'>Text-color: 
                <input type='color' id='my_tcolor' /></label><br/><br/>
                <label className="active black-text" htmlFor='my_tborder'>B-thickness:
                <input type='textarea' id='my_tborder' /></label><br /><br/>               
                <label className="active black-text" htmlFor='my_rborder'>Border-radius:
                <input type='textarea' id='my_rborder' /></label><br/><br/>
                <label className="active black-text" htmlFor='my_cborder'>Border-color: 
                <input type='color' id='my_cborder' /></label><br/><br/>
                <label className="active black-text" htmlFor='my_background'>Background-color:
                <input type='color' defaultValue="#ff0000" id='my_background' /></label>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
  if(wireframe)
  wireframe.id = id;

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
)(WireframeScreen);