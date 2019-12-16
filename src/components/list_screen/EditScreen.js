import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import Button from 'react-materialize/lib/Button';


class EditScreen extends Component {
  componentDidMount = () => {
    if(this.props.wireframe){
      let fireStore = getFirestore();
      fireStore.collection('wireframes').doc(this.props.wireframe.id).update
      ({time: Date.now()
      })
    }
  }  
  state = this.props.wireframe ? {
        name: this.props.wireframe.name,
        height: this.props.wireframe.height,
        width: this.props.wireframe.width,
        controls: this.props.wireframe.controls,
        isSelected: "",

    } :{};

    addControl =(control) => {
      let controls = this.state.controls;
      controls.push(control);
      this.setState({
        controls:controls
      })

    }
    addContainer =(e)=>{
      console.log("Im in Add Container");
      const { target } = e;
      this.addControl({
                "key": this.state.controls?this.state.controls.length : 0,
                "type":target.id,
                "x_pos":0,
                "y_pos":0,
                "c_height":100,
                "c_width":200,
                "background_color":"transparent",
                "text_field":"",
                "font_size":12,
                "border_color":"black",
                "border_radius":2,
                "border_style": "solid",
                "border_thickness":2,
                "border":'2px solid black',
                "font_color":"black"
      })
    }

    addButton =(e) =>{
      console.log("Im in add button");
      const { target } = e;
      this.addControl({
                "key":this.state.controls?this.state.controls.length : 0,
                "type":target.id,
                "x_pos":0,
                "y_pos":0,
                "c_height":25,
                "c_width":60,
                "background_color":"#d1d1d1",
                "text_field":" Button ",
                "font_size":12,
                "border_color":"black",
                "border_radius":0,
                "border_thickness":2,
                "font_color":"black"

      })
    }

    addLabel =(e)=>{
      console.log("ADD LABELLLL");
      const { target } = e;
      this.addControl({
                "key":this.state.controls?this.state.controls.length : 0,
                "type":target.id,
                "x_pos":0,
                "y_pos":0,
                "c_height":30,
                "c_width":50,
                "background_color":"transparent",
                "text_field":"Label",
                "font_size":12,
                "border_color":"black",
                "border_radius":0,
                "border_thickness":2,
                "font_color":"black"

      })
    }
addText =(e) =>{
  console.log("IM IN ADD TEXT");
  const { target } = e;
      this.addControl({
                "key":this.state.controls?this.state.controls.length : 0,
                "type":target.id,
                "c_height": 30,
                "c_width": 100,
                "x_pos": 30,
                "y_pos": 20,
                "text_field": "Type",
                "font_color": "black",
                "font_size": 13,
                "border_thickness": 8,
                "border_radius": 2,
                "border_color": "black",
                "background_color":"transparent"


      })
}
changeSelected =(control, e)=>{
  console.log("selected control is:", control);
  this.setState({
    isSelected:control
  })

}

updateSelected = (e) =>{
  if(this.state.isSelected){
  // const { target } = e;
  // var control = this.state.isSelected;
  // let id = target.id;
  // control.id = target.value;
  // this.setState(state => ({
  //   ...state,
  //   [target.id]: target.value,
  // }));
  // let fireStore = getFirestore();
  //       fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ [target.id]: target.value })
}
}

    handleChange = (e) => {
      
        const { target } = e;
        console.log("Target is:", target);
        this.setState(state => ({
          ...state,
          [target.id]: target.value,
        }));
        let fireStore = getFirestore();
        fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ [target.id]: target.value })
    
    }

    onClose = ()=>{
      let wireframe = this.props.wireframe;
      this.setState({
        controls:wireframe.controls
      })
      this.props.history.push("/");
    } 
    onSave = () => {
      let fireStore = getFirestore();
      fireStore.collection('wireframes').doc(this.props.wireframe.id).update({ controls: this.state.controls, })
      this.props.history.push("/");
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
            <Button type="submit" waves="light" className="green accent-4" onClick={this.onSave}>Save</Button>
            <Button type="submit" waves="light" className="blue accent-4" onClick={this.onClose}>Close</Button>
            </div>
            <div className="row">
            <br/><b>Container: </b>
            <div className="container" id="container" style={container_style} onClick={this.addContainer}/>
            </div>
            <div className="row">
              <b>Label: </b> 
              <label id="label" type="text" className="active black-text big calig" onClick={this.addLabel}>Label</label>
            </div>
            <div className="row"><br/>
            <b>Button: </b> 
              <button id="button" type='button' onClick={this.addButton} >Button</button>
            </div>
            <div className="row"><br/>
             <b>Textfield: </b>
              <input id="text" type="text" value="Type" onClick={this.addText} readOnly />
            </div>  
          </div>

            <div className="col s6" style={my_borders}>
            <br/>
            <div className="container" style={container_style2}> 
            
            <div className="todo-controls section">
                {this.state.controls && this.state.controls.map(control =>{
                    control.id = control.key;
                    console.log("background color is:", control);
                    const style_control =  {
                      backgroundColor : control.background_color,
                      height: control.c_height,
                      width:control.c_width,
                      borderWidth: control.border_thickness,
                      borderColor: control.border_color,
                      color: control.font_color,
                      borderRadius: control.border_radius,
                      fontSize: control.font_size,
                      borderStyle: control.border_style,
                     
                    }
                   
                    if(control.type == "button")
                        return(<button type={control.type} style={style_control} onClick={this.changeSelected.bind(this,control)}>{control.text_field}</button>)
                    else if(control.type == "label")
                        return(<label type="text" style={style_control} onClick={this.changeSelected.bind(this,control)} className="active black-text big calig">{control.text_field}</label>)
                    else if(control.type =="text")
                        return(<input type="text" value={control.text_field} onClick={this.changeSelected.bind(this,control)} style={style_control}/>)
                    else
                        return(<div className="container" id="container" onClick={this.changeSelected.bind(this,control)} style={style_control} />)
               
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
                <label className="active black-text" htmlFor='text_field'>Text:
                <input type='textarea' id='text_field' onChange={this.updateSelected}/></label><br/><br/>
                <label className="active black-text" htmlFor='font_size'>Text-size:
                <input type='textarea' id='font_size' onChange={this.updateSelected} /></label><br/><br/>
                <label className="active black-text" htmlFor='font_color'>Text-color: 
                <input type='color' id='font_color' onChange={this.updateSelected}/></label><br/><br/>
                <label className="active black-text" htmlFor='border_thickness'>B-thickness:
                <input type='textarea' id='border_thickness' onChange={this.updateSelected}/></label><br /><br/>               
                <label className="active black-text" htmlFor='border_radius'>Border-radius:
                <input type='textarea' id='border_radius' onChange={this.updateSelected} /></label><br/><br/>
                <label className="active black-text" htmlFor='border_color'>Border-color: 
                <input type='color' id='border_color' onChange={this.updateSelected}/></label><br/><br/>
                <label className="active black-text" htmlFor='background_color'>Background-color:
                <input type='color' defaultValue="#ff0000" id='background_color' onChange={this.updateSelected}/></label>
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
)(EditScreen);